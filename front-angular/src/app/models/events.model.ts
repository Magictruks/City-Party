export interface EventModel {
    '@id'?: string;
    id?: number;
    label?: string;
    content?: string;
    address?: string;
    date_begin_end_at?:Date;
    date_begin_at?: Date;
    date_end_at?: Date;
    created_at?: Date;
    promoter?: any;
    category?: string[];
    category_id?: number[];
    price?: number;
    latitude?: number;
    longitude?: number;
    action?: string;
    firstname?: string;
    lastname?: string;
    user_id?: number;
  }
  