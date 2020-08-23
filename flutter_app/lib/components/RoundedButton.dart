import 'package:flutter/material.dart';

class RoundedButton extends StatelessWidget {
  RoundedButton(
      {@required this.text, this.onPress, this.color, this.textColor});

  final Color textColor;
  final String text;
  final Function onPress;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: Material(
        elevation: 5.0,
        borderRadius: BorderRadius.circular(50.0),
        child: MaterialButton(
          onPressed: onPress,
          child: Row(
            children: <Widget>[
              Icon(
                Icons.search,
                color: Colors.grey,
              ),
              SizedBox(
                width: 8.0,
              ),
              Text(this.text),
            ],
          ),
        ),
      ),
    );
  }
}
