import {Book} from "./book";
import {AppUser} from "./app-user";

export interface Cart {
  id?: number;
  amount?: number;
  deleteStatus?: number;
  book?: Book;
  appUser?: AppUser;
}
