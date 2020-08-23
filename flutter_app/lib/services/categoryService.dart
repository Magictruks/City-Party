import 'package:flutterapp/services/networking.dart';
import 'package:flutterapp/utilities/env.dart';

class CategoryService {
  Future<dynamic> getCategories() async {
    NetworkHelper networkHelper = NetworkHelper('$kApiUrl/api/categories');
    var categoriesData = await networkHelper.getData();
    return categoriesData;
  }
}
