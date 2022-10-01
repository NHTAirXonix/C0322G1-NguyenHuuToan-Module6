import {Employee} from './employee';

export interface Pigsty {
  id?: number;
  buildDate?: string;
  code?: string;
  creationDate?: string;
  isDeleted?: boolean;
  maxNumber?: number;
  typePigs?: number;
  employee?: Employee;
  employeeName?: string;
  employeeCode?: string;
}
