import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutterapp/utilities/color_palette.dart';

const kTextCategoryStyle = TextStyle(
  color: textPrimary,
  fontWeight: FontWeight.w900,
  fontSize: 22.0,
  fontFamily: 'SourceSansPro',
);

const kTextFieldDecoration = InputDecoration(
  hintText: '',
  hintStyle: TextStyle(
    color: Colors.grey,
  ),
  labelStyle: TextStyle(
    color: Colors.black,
  ),
  contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
  border: OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(32.0)),
  ),
  enabledBorder: OutlineInputBorder(
    borderSide: BorderSide(color: Colors.grey, width: 1.0),
    borderRadius: BorderRadius.all(Radius.circular(32.0)),
  ),
  focusedBorder: OutlineInputBorder(
    borderSide: BorderSide(color: Colors.grey, width: 1.0),
    borderRadius: BorderRadius.all(Radius.circular(32.0)),
  ),
);

const kMessageTextFieldDecoration = InputDecoration(
  contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
  hintText: 'Type your message here...',
  border: InputBorder.none,
  labelStyle: TextStyle(
    color: Colors.black,
  ),
);
