import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutterapp/helper/date_helper.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:intl/intl.dart';
import 'package:flutterapp/components/EventCard.dart';
import 'package:flutterapp/components/FormRoundedButton.dart';
import 'package:flutterapp/utilities/color_palette.dart';
import 'package:sticky_headers/sticky_headers.dart';

class EventScreen extends StatefulWidget {
  static const id = 'event_screen';
  EventScreen({this.event});

  final event;

  @override
  _EventScreenState createState() => _EventScreenState();
}

class _EventScreenState extends State<EventScreen> {
  String dateBeginFormat;
  String dateEndFormat;
  String dateDayFormat;

  initDate() {
    DateHelper dateHelper = DateHelper();
    this.dateDayFormat = dateHelper.dayFormat(widget.event['date_begin_at']);
    this.dateBeginFormat =
        dateHelper.beginFormat(widget.event['date_begin_at']);
    this.dateEndFormat = dateHelper.endFormat(widget.event['date_end_at']);
  }

  // Google Maps Variable
  Completer<GoogleMapController> _controller = Completer();
  static const LatLng _center = const LatLng(49.12906, 6.1571072);
  final Set<Marker> _makers = {
    Marker(
      markerId: MarkerId(_center.toString()),
      position: _center,
//      infoWindow: InfoWindow(title: 'test', snippet : 'test'),
      icon: BitmapDescriptor.defaultMarker,
    )
  };
  LatLng _lastMapPosition = _center;

  _onCameraMove(CameraPosition position) {
    _lastMapPosition = position.target;
  }

  static final CameraPosition _kGooglePlex = CameraPosition(
    target: _center,
    zoom: 14.4746,
  );

  @override
  Widget build(BuildContext context) {
    print(widget.event);
    initDate();
    return Scaffold(
      backgroundColor: Color(0xFFeaeaea),
      body: CustomScrollView(
        slivers: <Widget>[
          SliverAppBar(
            expandedHeight: 200,
            floating: true,
            pinned: true,
            snap: false,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(widget.event['label']),
              background: Image(
                image: AssetImage(
                  'images/bar.jpg',
                ),
                fit: BoxFit.cover,
              ),
              collapseMode: CollapseMode.parallax,
            ),
            actions: <Widget>[
              IconButton(
                icon: Icon(Icons.favorite_border),
                color: Colors.white,
                disabledColor: Colors.white,
              )
            ],
          ),
          SliverList(
            delegate: SliverChildListDelegate([
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: borderBox),
                  color: Colors.white,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        'Nom de la Catégorie',
                        style: TextStyle(
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Padding(
                          padding:
                              const EdgeInsets.only(left: 8.0, bottom: 8.0),
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
                                style: TextStyle(
                                    fontSize: 12.0,
                                    color: Colors.grey.shade700),
                              ),
                            ],
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            'Gratuit',
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 15.0),
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(color: borderBox),
                    color: Colors.white,
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          'Description',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        Text(widget.event['content']),
                      ],
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 15.0),
                child: Container(
                  height: 150.0,
                  decoration: BoxDecoration(
                    border: Border.all(color: borderBox),
                    color: Colors.white,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Container(
                        width: MediaQuery.of(context).size.width * 0.3,
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                "Rendez-vous à l'évenement ici",
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                              SizedBox(height: 10.0),
                              Text(widget.event['address']),
                            ],
                          ),
                        ),
                      ),
                      Expanded(
                        child: GoogleMap(
                          mapType: MapType.normal,
                          initialCameraPosition: _kGooglePlex,
                          onMapCreated: (GoogleMapController controller) {
                            _controller.complete(controller);
                          },
                          onCameraMove: _onCameraMove,
                          markers: _makers,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  border: Border(
                      bottom: BorderSide(color: borderBox),
                      left: BorderSide(color: borderBox),
                      right: BorderSide(color: borderBox)),
                  color: Colors.white,
                ),
                child: Row(
                  children: <Widget>[
                    Container(
                      width: MediaQuery.of(context).size.width * 0.5,
                      decoration: BoxDecoration(
                          border: Border(right: BorderSide(color: borderBox))),
                      child: Center(
                          child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Icon(Icons.store),
                            SizedBox(width: 5.0),
                            Text('Détails'),
                          ],
                        ),
                      )),
                    ),
                    Container(
                      child: Expanded(
                        child: Center(
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Icon(Icons.gps_fixed),
                                SizedBox(width: 5.0),
                                Text('Ininéraire'),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 15.0)
            ]),
          ),
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: FormRoundedButton(
            text: 'Participer',
            color: primary,
            onPress: () => print('test'),
          ),
        ),
      ),
    );
  }
}
