import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/screen/home_screen.dart';
import 'package:flutterapp/screen/welcome_screen.dart';
import 'package:flutterapp/services/jwtService.dart';

class AnimatedFlutterLogo extends StatefulWidget {
  static const id = "start_screen";
  @override
  State<StatefulWidget> createState() => new _AnimatedFlutterLogoState();
}

class _AnimatedFlutterLogoState extends State<AnimatedFlutterLogo> {
  Timer _timer;
  FlutterLogoStyle _logoStyle = FlutterLogoStyle.markOnly;
  bool loggedIn = false;

  _AnimatedFlutterLogoState() {
    _timer = new Timer(const Duration(milliseconds: 400), () {
      setState(() {
        _logoStyle = FlutterLogoStyle.horizontal;
      });
      print('ici ici');
      Future.delayed(const Duration(milliseconds: 3000), () {
//        Navigator.pop(context);
        print(this.loggedIn);
        if (this.loggedIn) {
          Navigator.pushNamedAndRemoveUntil(
              context, HomeScreen.id, (route) => false);
        } else {
          Navigator.pushNamedAndRemoveUntil(
              context, WelcomeScreen.id, (route) => false);
        }
      });
    });
  }

  final _storage = FlutterSecureStorage();

  void readToken() async {
    var token = await _storage.read(key: 'token');
    if (token != null) {
      var tokenDecode = JwtService().decodeToken(token);
      print(tokenDecode);
    } else {
      print('pas de token');
    }
  }

  Future<bool> isAuth() async {
    var token = await _storage.read(key: 'token');
    // ignore: unnecessary_statements
    return token != null ? true : false;
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    readToken();
    var auth = isAuth();
    print('auth');
    print(auth);
    auth.then((value) {
      if (value) {
//        Navigator.pushNamedAndRemoveUntil(
//            context, HomeScreen.id, (route) => false);
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  @override
  void dispose() {
    super.dispose();
    _timer.cancel();
  }

  @override
  Widget build(BuildContext context) {
    return new FlutterLogo(
      size: 200.0,
      textColor: Colors.white,
      style: _logoStyle,
    );
  }
}
