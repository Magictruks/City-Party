import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutterapp/models/Event.dart';
import 'package:flutterapp/services/networking.dart';
import 'package:flutterapp/utilities/env.dart';
import 'package:http/http.dart' as http;

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
