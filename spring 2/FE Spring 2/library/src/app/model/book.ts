import {Category} from "./category";

export interface Book {
  id?: number;
  bookCode?: string;
  bookWriter?: string;
  bookTranslater?: string;
  bookCompany?: string;
  bookPageNumber?: number;
  bookSize?: string;
  bookDayOut?: string;
  bookPrice?: number;
  bookUrlImage?: string;
  content?: string;
  category?: Category;
}
