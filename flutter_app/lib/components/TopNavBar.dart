import 'package:flutter/material.dart';
import 'package:flutterapp/utilities/color_palette.dart';

class TopNavBar extends StatelessWidget with PreferredSizeWidget {
  TopNavBar({@required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(right: 5.0),
                child: Icon(
                  Icons.location_on,
                  size: 16.0,
                ),
              ),
              Text(
                this.title,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16.0,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'environ 10km',
                style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.w300),
              ),
            ],
          )
        ],
      ),
      backgroundColor: primary,
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
