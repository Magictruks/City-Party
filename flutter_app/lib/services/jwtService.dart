import 'dart:convert';

import 'package:flutterapp/services/networking.dart';
import 'package:flutterapp/utilities/env.dart';

class JwtService {
  Future refreshToken(refresh_token) async {
    var refreshToken = {"refresh_token": refresh_token};
    print(refreshToken);
    NetworkHelper networkHelper = NetworkHelper('$kApiUrl/refresh_token');
    var token = await networkHelper.postData(refreshToken);
    print(token);
    return token;
  }

  Map<String, dynamic> decodeToken(token) {
    print(token);
    final parts = token.split('.');
    if (parts.length != 3) {
      throw Exception('invalid token');
    }

    final payload = _decodeBase64(parts[1]);
    final payloadMap = json.decode(payload);
    if (payloadMap is! Map<String, dynamic>) {
      throw Exception('invalid payload');
    }
    print(payloadMap);
    return payloadMap;
  }

  String _decodeBase64(String str) {
    String output = str.replaceAll('-', '+').replaceAll('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw Exception('Illegal base64url string!"');
    }

    return utf8.decode(base64Url.decode(output));
  }
}
