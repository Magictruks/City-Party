import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/models/Event.dart';
import 'package:flutterapp/services/networking.dart';
import 'package:flutterapp/utilities/env.dart';
import 'package:http/http.dart' as http;

final _storage = FlutterSecureStorage();

class EventService {
  Future<dynamic> getEvents() async {
    NetworkHelper networkHelper = NetworkHelper('$kApiUrl/api/events');
    var eventData = await networkHelper.getData();
    return eventData;
  }

  Future<dynamic> getEventsByCategory(idCategory) async {
    NetworkHelper networkHelper =
        NetworkHelper('$kApiUrl/api/categories/$idCategory/event');
    var eventData = await networkHelper.getData();
    return eventData;
  }

  Future<dynamic> getEventAndCategoryProximity(latitude, longitude) async {
    NetworkHelper networkHelperEvent =
        NetworkHelper('$kApiUrl/api/event/$latitude/$longitude');
    NetworkHelper networkHelperCategory =
        NetworkHelper('$kApiUrl/api/category/$latitude/$longitude');
    var eventData = await networkHelperEvent.getData();
    var categoryData = await networkHelperCategory.getData();
    return {'category': categoryData, 'event': eventData};
  }

  Future<dynamic> getFavoriteAndParticipate(event_id) async {
    NetworkHelper networkHelper =
        NetworkHelper('$kApiUrl/api/event/favourite-and-participate/$event_id');
    var favoriteAndParticipateData = await networkHelper.getData();
    return favoriteAndParticipateData;
  }

  Future<dynamic> getFavorite() async {
    NetworkHelper networkHelper = NetworkHelper('$kApiUrl/api/event/favorite');
    var favoriteData = await networkHelper.getData();
    return favoriteData;
  }

  Future<dynamic> setFavorite(event_id) async {
    NetworkHelper networkHelper =
        NetworkHelper('$kApiUrl/api/event/favorite/$event_id');
    return networkHelper.postData({});
  }

  Future<dynamic> setParticipate(event_id) async {
    NetworkHelper networkHelper =
        NetworkHelper('$kApiUrl/api/event/participate/$event_id');
    return networkHelper.postData({});
  }

//  Future<List<Event>> fetchEvents(http.Client client) async {
//    final response = await client.get('$kApiUrl/api/events');
//    return compute(parseEvents, response.body);
//  }
//
//  List<Event> parseEvents(String responseBody) {
//    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();
//
//    return parsed.map<Event>((json) => Event.fromJson(json)).toList();
//  }
}
