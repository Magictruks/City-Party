import 'package:datetime_picker_formfield/datetime_picker_formfield.dart';
import 'package:flutter/material.dart';
import 'package:flutterapp/components/BottomNavBar.dart';
import 'package:flutterapp/utilities/item_nav.dart';
import 'package:intl/intl.dart';
import 'package:smart_select/smart_select.dart';

class FiltreScreen extends StatefulWidget {
  @override
  static const id = 'flitre_screen';
  _FiltreScreenState createState() => _FiltreScreenState();
}

class _FiltreScreenState extends State<FiltreScreen> {
  final format = DateFormat("yyyy-MM-dd HH:mm");
  final _formKey = GlobalKey<FormState>();
  String city;
  String event;
  int selectedItem = 1;
  String search;
  DateTime valueDate;
  bool switchValue = false;
  bool valuePast = false;
  List<int> valueCategories = [];
  List<SmartSelectOption<bool>> optionsPast = [
    SmartSelectOption<bool>(value: true, title: 'Oui'),
    SmartSelectOption<bool>(value: false, title: 'Non'),
  ];
  List<SmartSelectOption<int>> optionsCategories = [
    SmartSelectOption<int>(value: 1, title: 'Bar'),
    SmartSelectOption<int>(value: 2, title: 'Boite de nuit'),
    SmartSelectOption<int>(value: 3, title: 'Concert'),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Search'),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.only(
              top: 8.0, bottom: 8.0, left: 8.0, right: 8.0),
          child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                TextFormField(
                  onChanged: (value) => {city = value, print(city)},
                  decoration: InputDecoration(
                    hintText: 'Nom de la ville',
                  ),
                ),
                TextFormField(
                  onChanged: (value) => {event = value, print(event)},
                  decoration: InputDecoration(
                    hintText: 'Nom de l\'évenement',
                  ),
                ),
                SmartSelect<int>.multiple(
                  value: valueCategories,
                  title: 'Catégorie',
                  options: optionsCategories,
                  onChange: (value) => setState(() => valueCategories = value),
                ),
                DateTimeField(
                  decoration: InputDecoration(hintText: 'Date et heure'),
                  format: format,
                  onShowPicker: (context, currentValue) async {
                    final date = await showDatePicker(
                        context: context,
                        firstDate: DateTime(1900),
                        initialDate: currentValue ?? DateTime.now(),
                        lastDate: DateTime(2100));
                    if (date != null) {
                      final time = await showTimePicker(
                        context: context,
                        initialTime: TimeOfDay.fromDateTime(
                            currentValue ?? DateTime.now()),
                      );
                      valueDate = DateTimeField.combine(date, time);
                      return DateTimeField.combine(date, time);
                    } else {
                      return currentValue;
                    }
                  },
                ),
                SmartSelect<bool>.single(
                  modalType: SmartSelectModalType.bottomSheet,
                  value: valuePast,
                  title: 'Déjà passé',
                  options: optionsPast,
                  onChange: (value) => setState(() => valuePast = value),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text('Déjà passé'),
                    Switch.adaptive(
                        value: switchValue,
                        onChanged: (value) {
                          setState(() {
                            switchValue = value;
                          });
                        }),
                  ],
                ),
                RaisedButton(
                  onPressed: () {
                    // Validate returns true if the form is valid, otherwise false.
                    if (_formKey.currentState.validate()) {
                      // If the form is valid, display a snackbar. In the real world,
                      // you'd often call a server or save the information in a database.
                      if (city.isNotEmpty) {
                        print(city);
                      }
                      if (valueCategories.isNotEmpty) {
                        print(valueCategories);
                      }
                    }
                  },
                  child: Text('Submit'),
                ),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: BottomNavBar(
        onTap: (index) => {
          if (itemNav[index] != FiltreScreen.id)
//        itemNav[index])
            {Navigator.pop(context)}
        },
        selectedItem: this.selectedItem,
      ),
    );
  }
}
