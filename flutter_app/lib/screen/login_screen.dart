import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/components/FormRoundedButton.dart';
import 'package:flutterapp/components/RoundedButton.dart';
import 'package:flutterapp/main.dart';
import 'package:flutterapp/screen/home_screen.dart';
import 'package:flutterapp/services/authService.dart';
import 'package:flutterapp/services/eventService.dart';
import 'package:flutterapp/utilities/color_palette.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';

class LoginScreen extends StatefulWidget {
  static const id = "login_screen";
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool showSpinner = false;
  String email;
  String password;
  String errorMessage = '';

  final formKey = GlobalKey<FormState>();
  final _storage = FlutterSecureStorage();

  void readToken() async {
    print(await _storage.read(key: 'token'));
  }

  @override
  Widget build(BuildContext context) {
    readToken();
    return Scaffold(
      backgroundColor: Colors.white,
      body: ModalProgressHUD(
        inAsyncCall: showSpinner,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Flexible(
                child: Hero(
                  tag: 'logo',
                  child: Container(
                    height: 200.0,
                    child: Image.asset('images/logo.png'),
                  ),
                ),
              ),
              SizedBox(
                height: 48.0,
              ),
              TextField(
                keyboardType: TextInputType.emailAddress,
                textAlign: TextAlign.center,
                onChanged: (value) {
                  email = value;
                },
                decoration:
//                    kTextFieldDecoration.copyWith(hintText: 'Enter your email'),
                    InputDecoration(hintText: 'Entrer votre email'),
              ),
              SizedBox(
                height: 8.0,
              ),
              TextField(
                obscureText: true,
                textAlign: TextAlign.center,
                onChanged: (value) {
                  password = value;
                },
                decoration:
                    InputDecoration(hintText: 'Entrer votre mot de passe'),
              ),
              SizedBox(
                height: 24.0,
              ),
              FormRoundedButton(
                color: primary,
                text: 'Login',
                onPress: () async {
                  setState(() {
                    showSpinner = true;
                  });
                  try {
                    final user =
                        await AuthService().authentication(email, password);
                    print(user);
                    print('user');
                    if (user != null) {
                      print('in user');
                      await storage.write(key: 'token', value: user['token']);
                      await storage.write(
                          key: 'refresh_token', value: user['refresh_token']);
                      String value = await storage.read(key: 'token');
                      setState(() {
                        Navigator.pushNamedAndRemoveUntil(
                            context, HomeScreen.id, ModalRoute.withName('/'));
                      });
                    } else {
                      this.errorMessage =
                          "L'email ou le mot de passe est incorrect";
                    }
                    setState(() {
                      showSpinner = false;
                    });
                  } catch (e) {
                    print(e);
                    setState(() {
                      showSpinner = false;
                    });
                  }
                },
              ),
              SizedBox(
                height: 8.0,
              ),
              Center(
                child: Text(
                  '$errorMessage',
                  style: TextStyle(color: Colors.redAccent),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
