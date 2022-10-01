import {Export} from './export';
import {AppUser} from './app-user';

export interface Employee {
  id?: number;
  code?: string;
  name?: string;
  birthDay?: string;
  gender?: string;
  idCard?: string;
  image?: string;
  isDeleted?: boolean;
  export?: Export;
  userDto?: AppUser;
}
