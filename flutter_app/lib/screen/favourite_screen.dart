import 'package:flutter/material.dart';
import 'package:flutterapp/components/BottomNavBar.dart';
import 'package:flutterapp/components/EventCard.dart';
import 'package:flutterapp/components/EventCategory.dart';
import 'package:flutterapp/components/TopNavBar.dart';
import 'package:flutterapp/screen/home_screen.dart';
import 'package:flutterapp/services/eventService.dart';
import 'package:flutterapp/utilities/color_palette.dart';
import 'package:flutterapp/utilities/item_nav.dart';

class FavouriteScreen extends StatefulWidget {
  static const id = 'favourite_screen';
  FavouriteScreen({Key key, this.title}) : super(key: key);

  final String title;
  @override
  _FavouriteScreenState createState() => _FavouriteScreenState();
}

class _FavouriteScreenState extends State<FavouriteScreen> {
  int selectedItem = 2;

  List data;
  int dataLength;
  bool loading = true;
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<dynamic>(
      future: EventService().getFavorite(),
      builder: (context, AsyncSnapshot<dynamic> snapshot) {
        if (snapshot.hasData) {
          print(snapshot.data);
          print(snapshot.data.length);
          return Scaffold(
            appBar: TopNavBar(title: widget.title),
            body: snapshot.data.length > 0
                ? ListView.builder(
                    itemCount: snapshot.data.length,
                    itemBuilder: (context, index) {
                      return EventCard(
                        event: snapshot.data[index],
                        cardTitle: snapshot.data[index]['label'],
                        cardLogoString: 'images/bar_logo.jpg',
                        dateBegin: snapshot.data[index]['date_begin_at'],
                        dateEnd: snapshot.data[index]['date_end_at'],
                      );
                    },
                  )
                : Center(
                    child: Text(
                    "Vous n'avez pas d'évenement favori",
                    style: TextStyle(
                        fontWeight: FontWeight.bold, color: textSecondary),
                  )),
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
                if (itemNav[index] != FavouriteScreen.id)
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
