import 'package:flutter/material.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/components/FormRoundedButton.dart';
import 'package:flutterapp/screen/home_screen.dart';
import 'package:flutterapp/screen/login_screen.dart';
import 'package:flutterapp/screen/registration_screen.dart';
import 'package:flutterapp/services/jwtService.dart';
import 'package:flutterapp/utilities/color_palette.dart';

class WelcomeScreen extends StatefulWidget {
  static const id = "welcome_screen";
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen>
    with SingleTickerProviderStateMixin {
  AnimationController controller;
  Animation animation;

//  final _storage = FlutterSecureStorage();
//
//  void readToken() async {
////    print(await _storage.read(key: 'token'));
//    var token = await _storage.read(key: 'token');
//    if (token != null) {
//      var tokenDecode = JwtService().decodeToken(token);
//      print(tokenDecode);
//    } else {
//      print('pas de token');
//    }
//  }
//
//  Future<bool> isAuth() async {
//    var token = await _storage.read(key: 'token');
//    // ignore: unnecessary_statements
//    return token != null ? true : false;
//  }

//  @override
//  void initState() {
//    // TODO: implement initState
//    super.initState();
//    readToken();
//    var auth = isAuth();
//    print('auth');
//    print(auth);
//    auth.then((value) {
//      if (value) {
//        Navigator.pushNamedAndRemoveUntil(
//            context, HomeScreen.id, (route) => false);
//      } else {
//        controller =
//            AnimationController(duration: Duration(seconds: 1), vsync: this);
//        controller.forward();
//        controller.addListener(() {
//          setState(() {});
//        });
//      }
//    });
//  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    controller =
        AnimationController(duration: Duration(seconds: 1), vsync: this);
    controller.forward();
    controller.addListener(() {
      setState(() {});
    });
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    if (controller != null) controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                Flexible(
                  child: Hero(
                    tag: 'logo',
                    child: Container(
                      child: Image.asset('images/logo.png'),
                      height: 60.0,
                    ),
                  ),
                ),
                TypewriterAnimatedTextKit(
                  speed: Duration(milliseconds: 300),
                  totalRepeatCount: 1,
                  repeatForever: false,
                  text: ['City Party'],
                  textStyle: TextStyle(
                    fontSize: 45.0,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 48.0,
            ),
            FormRoundedButton(
              text: 'Login',
              onPress: () => Navigator.pushNamed(context, LoginScreen.id),
              color: primary,
            ),
            FormRoundedButton(
              text: 'Register',
              onPress: () =>
                  Navigator.pushNamed(context, RegistrationScreen.id),
              color: primary,
            )
          ],
        ),
      ),
    );
  }
}
