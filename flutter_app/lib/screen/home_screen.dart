import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/components/BottomNavBar.dart';
import 'package:flutterapp/components/EventCategory.dart';
import 'package:flutterapp/components/TopNavBar.dart';
import 'package:flutterapp/services/categoryService.dart';
import 'package:flutterapp/services/jwtService.dart';
import 'package:flutterapp/utilities/item_nav.dart';
import 'package:intl/intl.dart';

class HomeScreen extends StatefulWidget {
  static const id = 'home_screen';
  HomeScreen({Key key, this.title}) : super(key: key);

  final String title;
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<HomeScreen> {
  int selectedItem = 0;

  List data;
  int dataLength;
  bool loading = true;
  final _storage = FlutterSecureStorage();

  void readToken() async {
//    print(await _storage.read(key: 'token'));
    var token = await _storage.read(key: 'token');
    var tokenDecode = JwtService().decodeToken(token);
  }

  @override
  Widget build(BuildContext context) {
    print(DateFormat.Hm().format(new DateTime.now()));

    return FutureBuilder<dynamic>(
      future: CategoryService().getCategories(),
      builder: (context, AsyncSnapshot<dynamic> snapshot) {
        if (snapshot.hasData) {
          print(snapshot.data);
          return Scaffold(
            appBar: TopNavBar(title: widget.title),
            body: ListView.builder(
              itemCount: snapshot.data['hydra:totalItems'],
              itemBuilder: (context, index) {
                return EventCategory(
                  listEvent: snapshot.data['hydra:member'][index]['events'],
                  title: snapshot.data['hydra:member'][index]['label'],
                );
              },
            ),
            bottomNavigationBar: BottomNavBar(
              onTap: (index) => {
                if (itemNav[index] != HomeScreen.id)
                  {
                    Future(() {
                      Navigator.pushReplacementNamed(context, itemNav[index]);
                    })
                  }
              },
              selectedItem: this.selectedItem,
            ),
          );
        } else {
          return Scaffold(
            appBar: TopNavBar(title: widget.title),
            body: Center(child: CircularProgressIndicator()),
            bottomNavigationBar: BottomNavBar(
              onTap: (index) => {
                if (itemNav[index] != HomeScreen.id)
                  {
                    Future(() {
                      Navigator.pushReplacementNamed(context, itemNav[index]);
                    })
                  }
              },
              selectedItem: this.selectedItem,
            ),
          );
        }
      },
    );
  }
}
