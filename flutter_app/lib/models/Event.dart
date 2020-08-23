class Event {
  Event(
      {this.id,
      this.label,
      this.content,
      this.dateBeginAt,
      this.dateEndAt,
      this.createdAt,
      this.address,
      this.category});

  final int id;
  final String label;
  final String content;
  final DateTime dateBeginAt;
  final DateTime dateEndAt;
  final DateTime createdAt;
  final String address;
  final List<String> category;

  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
      id: json['id'] as int,
      label: json['label'] as String,
      content: json['content'] as String,
      dateBeginAt: json['dateBeginAt'] as DateTime,
      dateEndAt: json['dateEndAt'] as DateTime,
      createdAt: json['createdAt'] as DateTime,
      address: json['address'] as String,
      category: json['category'] as List<String>,
    );
  }
}
