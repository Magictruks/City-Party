import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutterapp/components/BottomNavBar.dart';
import 'package:flutterapp/components/EventCard.dart';
import 'package:flutterapp/components/RoundedButton.dart';
import 'package:flutterapp/components/TopNavBar.dart';
import 'package:flutterapp/screen/filtre_screen.dart';
import 'package:flutterapp/services/eventService.dart';
import 'package:flutterapp/utilities/item_nav.dart';

class SearchScreen extends StatefulWidget {
  static const id = "search_screen";
  SearchScreen({Key key, this.title}) : super(key: key);

  final String title;
  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  int selectedItem = 1;
  String search = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopNavBar(title: widget.title),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            RoundedButton(
              text: 'Ville ou Evenement ?',
              onPress: () => Navigator.pushNamed(context, FiltreScreen.id),
              color: Colors.white,
            ),
            Row(
              children: <Widget>[
                Text('Trier par : '),
                Text(
                  'A proximité',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                )
              ],
            ),
            Expanded(
              child: ListView(
                children: <Widget>[
                  EventCard(
                    cardTitle: 'Bar à Jagger',
                    cardLogoString: 'images/bar_logo.jpg',
                    dateBegin: "2020-07-29T15:17:46+00:00",
                    dateEnd: "2020-07-29T15:17:46+00:00",
                  ),
                  EventCard(
                    cardTitle: 'Bar à Jagger',
                    cardLogoString: 'images/bar_logo.jpg',
                    dateBegin: "2020-07-29T15:17:46+00:00",
                    dateEnd: "2020-07-29T15:17:46+00:00",
                  ),
                  EventCard(
                    cardTitle: 'Bar à Jagger',
                    cardLogoString: 'images/bar_logo.jpg',
                    dateBegin: "2020-07-29T15:17:46+00:00",
                    dateEnd: "2020-07-29T15:17:46+00:00",
                  ),
                  EventCard(
                    cardTitle: 'Bar à Jagger',
                    cardLogoString: 'images/bar_logo.jpg',
                    dateBegin: "2020-07-29T15:17:46+00:00",
                    dateEnd: "2020-07-29T15:17:46+00:00",
                  ),
                  EventCard(
                    cardTitle: 'Bar à Jagger',
                    cardLogoString: 'images/bar_logo.jpg',
                    dateBegin: "2020-07-29T15:17:46+00:00",
                    dateEnd: "2020-07-29T15:17:46+00:00",
                  ),
                  EventCard(
                    cardTitle: 'Bar à Jagger',
                    cardLogoString: 'images/bar_logo.jpg',
                    dateBegin: "2020-07-29T15:17:46+00:00",
                    dateEnd: "2020-07-29T15:17:46+00:00",
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavBar(
        onTap: (index) => {
          this.selectedItem = index,
          if (itemNav[index] != SearchScreen.id)
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
