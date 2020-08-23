import 'package:intl/intl.dart';

class DateHelper {
  convertDayEnglishToFrench(day) {
    switch (day) {
      case 'Mon':
        return 'Lundi';
      case 'Tue':
        return 'Mardi';
      case 'Wed':
        return 'Mercredi';
      case 'Thu':
        return 'Jeudi';
      case 'Fri':
        return 'Vendredi';
      case 'Sat':
        return 'Samedi';
      case 'Sun':
        return 'Dimanche';
    }
  }

  dayFormat(dateBegin) {
    if (DateFormat.MEd().format(DateTime.parse(dateBegin)) ==
        DateFormat.MEd().format(new DateTime.now())) {
      return "Aujourd'hui";
    } else {
      var temp = DateFormat.MEd().format(DateTime.parse(dateBegin)).split(',');
      return convertDayEnglishToFrench(temp[0]) + ' ' + temp[1].split('/')[1];
    }
  }

  beginFormat(dateBegin) {
    return DateFormat.Hm().format(DateTime.parse(dateBegin));
  }

  endFormat(dateEnd) {
    return DateFormat.Hm().format(DateTime.parse(dateEnd));
  }
}
