import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/services/jwtService.dart';
import 'package:http/http.dart' as http;

class NetworkHelper {
  NetworkHelper(this.url);

  final String url;
  final _storage = FlutterSecureStorage();

  Future getData() async {
    var token = await _storage.read(key: 'token');
    http.Response response =
        await http.get(url, headers: {'Authorization': 'Bearer $token'});
    print(response.statusCode);
    if (response.statusCode == 200) {
      String data = response.body;
      return jsonDecode(data);
    } else if (response.statusCode == 401) {
      var refresh_token = await _storage.read(key: 'refresh_token');
      var token = await JwtService().refreshToken(refresh_token);
      await _storage.delete(key: 'token');
      await _storage.write(key: 'token', value: token['token']);
      return this.getData();
    } else {
      print(response.statusCode);
    }
  }

  Future postData(data) async {
    var token = await _storage.read(key: 'token');

    var header = token != null
        ? {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer $token'
          }
        : {'Content-Type': 'application/json; charset=UTF-8'};
    http.Response response =
        await http.post(url, headers: header, body: jsonEncode(data));
    if (response.statusCode == 200) {
      String data = response.body;
      return jsonDecode(data);
    } else if (response.statusCode == 201) {
      String data = response.body;
      return jsonDecode(data);
    } else {
      print(response.statusCode);
    }
  }
}
