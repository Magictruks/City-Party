import 'package:flutterapp/services/networking.dart';
import 'package:flutterapp/utilities/env.dart';

class AuthService {
  Future<dynamic> authentication(email, password) async {
    NetworkHelper networkHelper =
        NetworkHelper('$kApiUrl/authentication_token');
    var authData =
        await networkHelper.postData({'email': email, 'password': password});
    return authData;
  }

  Future<dynamic> registration(
      email, password, firstname, lastname, address, phoneNumber) async {
    NetworkHelper networkHelper = NetworkHelper('$kApiUrl/api/users');
    var authData = await networkHelper.postData({
      'email': email,
      'password': password,
      'firstname': firstname,
      'lastname': lastname,
      'address': address,
      'phoneNumber': phoneNumber
    });
    return authData;
  }
}
