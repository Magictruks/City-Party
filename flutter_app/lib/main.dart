import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/screen/event_screen.dart';
import 'package:flutterapp/screen/favourite_screen.dart';
import 'package:flutterapp/screen/filtre_screen.dart';
import 'package:flutterapp/screen/home_screen.dart';
import 'package:flutterapp/screen/login_screen.dart';
import 'package:flutterapp/screen/more_screen.dart';
import 'package:flutterapp/screen/registration_screen.dart';
import 'package:flutterapp/screen/search_screen.dart';
import 'package:flutterapp/screen/start_screen.dart';
import 'package:flutterapp/screen/welcome_screen.dart';
import 'package:flutterapp/services/jwtService.dart';
import 'package:page_transition/page_transition.dart';
import 'package:intl/date_symbol_data_local.dart';

final _storage = new FlutterSecureStorage();
var title;

void readToken() async {
//    print(await _storage.read(key: 'token'));
  var token = await _storage.read(key: 'token');
  var tokenDecode = JwtService().decodeToken(token);
  title = tokenDecode['address'];
//  title = tokenDecode.address;
}

void main() {
  initializeDateFormatting('fr_FR', null).then((_) => runApp(MyApp()));
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.

  @override
  Widget build(BuildContext context) {
    readToken();

    return MaterialApp(
      title: 'City Party',
      theme: ThemeData(
        primarySwatch: Colors.green,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        fontFamily: 'SourceSansPro',
      ),
      initialRoute: AnimatedFlutterLogo.id,
      routes: {
        WelcomeScreen.id: (context) => WelcomeScreen(),
        LoginScreen.id: (context) => LoginScreen(),
        RegistrationScreen.id: (context) => RegistrationScreen(),
        FiltreScreen.id: (context) => FiltreScreen(),
        AnimatedFlutterLogo.id: (context) => AnimatedFlutterLogo()
      },
      onGenerateRoute: (settings) {
        final arguments = settings.arguments;
        switch (settings.name) {
          case HomeScreen.id:
            return PageTransition(
              child: HomeScreen(title: title),
              type: null,
            );
          case SearchScreen.id:
            return PageTransition(
              child: SearchScreen(title: title),
              type: null,
            );
          case FavouriteScreen.id:
            return PageTransition(
              child: FavouriteScreen(title: title),
              type: null,
            );
          case EventScreen.id:
            return PageTransition(
              child: EventScreen(event: arguments),
              type: null,
            );
          case MoreScreen.id:
            return PageTransition(
              child: MoreScreen(),
              type: null,
            );
          default:
            return null;
        }
      },
    );
  }
}
