import 'package:flutter/material.dart';
import 'package:flutterapp/components/EventCard.dart';
import 'package:flutterapp/utilities/text_style.dart';

class EventCategory extends StatefulWidget {
  EventCategory({this.title, this.listEvent});

  final String title;
  final List listEvent;

  @override
  _EventCategory createState() => _EventCategory();
}

class _EventCategory extends State<EventCategory> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.only(left: 3.0, bottom: 3.0),
            child: Text(
              this.widget.title,
              style: kTextCategoryStyle,
            ),
          ),
          SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: <Widget>[
                  for (var event in widget.listEvent)
                    EventCard(
                      event: event,
                      cardTitle: event['label'],
                      cardLogoString: 'images/bar_logo.jpg',
                      dateBegin: event['date_begin_at'],
                      dateEnd: event['date_end_at'],
                    )
                ],
              )),
        ],
      ),
    );
  }
}
