export interface EventModel {
    '@id'?: string;
    id?: string;
    label?: string;
    content?: string;
    address?: string;
    date_begun_end_at?:Date;
    dateBeginAt?: Date;
    dateEndAt?: Date;
    createdAt?: Date;
    promoter?: string;
    category?: string[];
    action?: string;
  }
  