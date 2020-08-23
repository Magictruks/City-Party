import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutterapp/helper/date_helper.dart';
import 'package:flutterapp/screen/event_screen.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:intl/intl.dart';

class EventCard extends StatelessWidget {
  EventCard(
      {@required this.cardTitle,
      this.cardLogoString,
      this.event,
      this.dateBegin,
      this.dateEnd});

  final event;
  final String cardTitle;
  final String cardLogoString;
  final dateBegin;
  final dateEnd;
  String dateBeginFormat;
  String dateEndFormat;
  String dateDayFormat;

  initDate() {
    DateHelper dateHelper = DateHelper();
    this.dateDayFormat = dateHelper.dayFormat(dateBegin);
    this.dateBeginFormat = dateHelper.beginFormat(dateBegin);
    this.dateEndFormat = dateHelper.endFormat(dateEnd);
  }

  @override
  Widget build(BuildContext context) {
    initDate();
    return GestureDetector(
      onTap: () =>
          Navigator.pushNamed(context, EventScreen.id, arguments: event),
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(0),
        ),
        shadowColor: Colors.black,
        elevation: 5.0,
        child: Container(
          width: 250.0,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Container(
                alignment: Alignment.bottomLeft,
                width: 250.0,
                height: 100.0,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('images/bar.jpg'),
                    fit: BoxFit.cover,
                  ),
                ),
                child: Row(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.only(left: 8.0),
                      child: SizedOverflowBox(
                        size: Size(40.0, 20.0),
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20.0),
                            border: Border.all(
                              color: Colors.grey,
                            ),
                          ),
                          child: CircleAvatar(
                            backgroundImage: AssetImage(cardLogoString),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(5.0),
                      child: Text(
                        this.cardTitle,
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w900,
                          fontSize: 16.0,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 15.0, left: 5.0),
                child: Row(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.only(right: 5.0),
                      child: Icon(
                        Icons.query_builder,
                        size: 16.0,
                      ),
                    ),
                    Text(
                      '${this.dateDayFormat} - ${this.dateBeginFormat} - ${this.dateEndFormat}',
                      style: TextStyle(fontSize: 12.0),
                    ),
                  ],
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.only(top: 5.0, left: 5.0, bottom: 5.0),
                child: Row(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.only(right: 5.0),
                      child: Icon(
                        Icons.location_on,
                        size: 16.0,
                      ),
                    ),
                    Text(
                      'Place Saint Louis - 1.8 km',
                      style: TextStyle(fontSize: 12.0),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
