import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutterapp/utilities/color_palette.dart';

class BottomNavBar extends StatelessWidget {
  BottomNavBar({@required this.onTap, this.selectedItem});

  final int selectedItem;
  final Function onTap;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      items: <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          title: Text('Home'),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.search),
          title: Text('Search'),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.favorite_border),
          title: Text('Favourite'),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.more_horiz),
          title: Text('More'),
        ),
      ],
      currentIndex: selectedItem,
      selectedItemColor: primaryDark,
      onTap: onTap,
    );
  }
}
