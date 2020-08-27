import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/components/FormRoundedButton.dart';
import 'package:flutterapp/screen/home_screen.dart';
import 'package:flutterapp/services/authService.dart';
import 'package:flutterapp/utilities/color_palette.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';

class RegistrationScreen extends StatefulWidget {
  static const id = "registration_screen";
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<RegistrationScreen> {
  final formKey = GlobalKey<FormState>();

  final _storage = FlutterSecureStorage();

  @override
  void initState() {
    super.initState();
    clearToken();
  }

  void readToken() async {
    print(await _storage.read(key: 'token'));
  }

  void clearToken() async {
    await _storage.delete(key: 'token');
  }

  bool showSpinner = false;
  String email;
  String password;

  String firstname;
  String lastname;
  String address;
  String phone;
  int currentStep = 0;

  List<Step> steps = [
    Step(
      title: Text('step 1'),
      subtitle: Text('subtitle 1'),
      content: TextFormField(),
      state: StepState.indexed,
      isActive: true,
    ),
    Step(
      title: Text('step 1'),
      subtitle: Text('subtitle 1'),
      content: TextFormField(),
      state: StepState.indexed,
      isActive: false,
    )
  ];

  String validateEmail(String value) {
    String pattern =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    RegExp regExp = new RegExp(pattern);
    if (value.length == 0) {
      return "Email is Required";
    } else if (!regExp.hasMatch(value)) {
      return "Invalid Email";
    } else {
      return null;
    }
  }

  String validateName(String value) {
    String patttern = r'(^[a-zA-Z ]*$)';
    RegExp regExp = new RegExp(patttern);
    if (value.length == 0) {
      return "Name is Required";
    }
//    else if (!regExp.hasMatch(value)) {
//      return "Name must be a-z and A-Z";
//    }
    return null;
  }

  String validatePassword(String value) {
    if (value.length == 0) {
      return "Password is Required";
    } else if (value.length < 6) {
      return "Password doit contenir plus de 6 caratères";
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: ModalProgressHUD(
        inAsyncCall: showSpinner,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.0),
          child: Stepper(
            steps: steps,
            currentStep: currentStep,
            type: StepperType.horizontal,
            onStepContinue: () {
              setState(() {
                currentStep++;
              });
            },
            onStepCancel: () {
              if (currentStep > 1)
                setState(() {
                  currentStep--;
                });
            },
          ),
//
        ),
      ),
    );
  }
}

//Form(
//            key: formKey,
//            child: Column(
//              mainAxisAlignment: MainAxisAlignment.center,
//              crossAxisAlignment: CrossAxisAlignment.stretch,
//              children: <Widget>[
//                Flexible(
//                  child: Hero(
//                    tag: 'logo',
//                    child: Container(
//                      height: 200.0,
//                      child: Image.asset('images/logo.png'),
//                    ),
//                  ),
//                ),
//                SizedBox(
//                  height: 48.0,
//                ),
//                TextFormField(
//                  keyboardType: TextInputType.emailAddress,
//                  textAlign: TextAlign.center,
//                  validator: validateEmail,
//                  onChanged: (value) {
//                    email = value;
//                  },
//                  decoration:
////                    kTextFieldDecoration.copyWith(hintText: 'Enter your email'),
//                      InputDecoration(hintText: 'Email'),
//                ),
//                Row(
//                  children: <Widget>[
//                    Expanded(
//                      child: TextFormField(
//                        keyboardType: TextInputType.text,
//                        textAlign: TextAlign.center,
//                        validator: validateName,
//                        onChanged: (value) {
//                          firstname = value;
//                        },
//                        decoration:
////                    kTextFieldDecoration.copyWith(hintText: 'Enter your email'),
//                            InputDecoration(hintText: 'Prénom'),
//                      ),
//                    ),
//                    SizedBox(
//                      height: 8.0,
//                      width: 20.0,
//                    ),
//                    Expanded(
//                      child: TextFormField(
//                        keyboardType: TextInputType.text,
//                        textAlign: TextAlign.center,
//                        validator: validateName,
//                        onChanged: (value) {
//                          lastname = value;
//                        },
//                        decoration:
////                    kTextFieldDecoration.copyWith(hintText: 'Enter your email'),
//                            InputDecoration(hintText: 'Nom'),
//                      ),
//                    ),
//                  ],
//                ),
//                SizedBox(
//                  height: 8.0,
//                ),
//                Row(
//                  children: <Widget>[
//                    Expanded(
//                      child: TextFormField(
//                        keyboardType: TextInputType.text,
//                        textAlign: TextAlign.center,
//                        validator: validateName,
//                        onChanged: (value) {
//                          address = value;
//                        },
//                        decoration:
////                    kTextFieldDecoration.copyWith(hintText: 'Enter your email'),
//                            InputDecoration(hintText: 'Adresse'),
//                      ),
//                    ),
//                    SizedBox(
//                      height: 8.0,
//                      width: 20.0,
//                    ),
//                    Expanded(
//                      child: TextFormField(
//                        keyboardType: TextInputType.text,
//                        textAlign: TextAlign.center,
//                        validator: (value) =>
//                            value.isEmpty ? 'Phone is Required' : null,
//                        onChanged: (value) {
//                          phone = value;
//                        },
//                        decoration:
////                    kTextFieldDecoration.copyWith(hintText: 'Enter your email'),
//                            InputDecoration(hintText: 'Téléphone'),
//                      ),
//                    ),
//                  ],
//                ),
//                SizedBox(
//                  height: 8.0,
//                ),
//                TextFormField(
//                  obscureText: true,
//                  textAlign: TextAlign.center,
//                  validator: validatePassword,
//                  onChanged: (value) {
//                    password = value;
//                  },
//                  decoration: InputDecoration(hintText: 'Mot de passe'),
//                ),
//                SizedBox(
//                  height: 24.0,
//                ),
//                FormRoundedButton(
//                  color: primary,
//                  text: 'Enregistrer',
//                  onPress: () async {
//                    setState(() {
//                      showSpinner = true;
//                    });
//                    try {
//                      print('submit');
//                      final form = formKey.currentState;
//                      if (form.validate()) {
//                        print('cest valide');
//                        form.save();
//                        final user = await AuthService().registration(email,
//                            password, firstname, lastname, address, phone);
//                        print(user);
//                        if (user != null) {
//                          final login = await AuthService()
//                              .authentication(email, password);
//                          setState(() {
//                            showSpinner = false;
//                          });
//                          if (login != null) {
//                            print('in user');
//                            await _storage.write(
//                                key: 'token', value: login['token']);
//                            await _storage.write(
//                                key: 'refresh_token',
//                                value: login['refresh_token']);
//                            String value = await _storage.read(key: 'token');
//                            setState(() {
//                              Navigator.pushNamedAndRemoveUntil(context,
//                                  HomeScreen.id, ModalRoute.withName('/'));
//                            });
//                          }
//                        }
//                      }
//                    } catch (e) {
//                      print(e);
//                      setState(() {
//                        showSpinner = false;
//                      });
//                    }
//                  },
//                )
//              ],
//            ),
//          ),
