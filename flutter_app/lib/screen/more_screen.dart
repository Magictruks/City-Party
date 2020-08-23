import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/components/BottomNavBar.dart';
import 'package:flutterapp/screen/login_screen.dart';
import 'package:flutterapp/screen/welcome_screen.dart';
import 'package:flutterapp/utilities/item_nav.dart';

class MoreScreen extends StatefulWidget {
  static const id = 'more_screen';
  @override
  _MoreScreenState createState() => _MoreScreenState();
}

class _MoreScreenState extends State<MoreScreen> {
  int selectedItem = 3;
  final _storage = FlutterSecureStorage();

  final List<String> entries = <String>['Mon profil', 'Déconnexion'];
  final List<IconData> icons = <IconData>[Icons.account_circle, Icons.cancel];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.separated(
          itemBuilder: (BuildContext context, int index) {
            return Material(
              child: MaterialButton(
                onPressed: () => {
                  if (index == entries.length - 1)
                    {
                      _storage.delete(key: 'token'),
                      Navigator.pushNamedAndRemoveUntil(
                          context, WelcomeScreen.id, ModalRoute.withName('/'))
                    }
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        Icon(
                          icons[index],
                          color: Colors.grey,
                        ),
                        SizedBox(
                          width: 8.0,
                        ),
                        Text('${entries[index]}'),
                      ],
                    ),
                    Icon(
                      Icons.arrow_forward_ios,
                      color: Colors.grey,
                    ),
                  ],
                ),
              ),
            );
          },
          separatorBuilder: (BuildContext context, int index) =>
              const Divider(),
          itemCount: entries.length),
      bottomNavigationBar: BottomNavBar(
        onTap: (index) => {
          if (itemNav[index] != MoreScreen.id)
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
}
