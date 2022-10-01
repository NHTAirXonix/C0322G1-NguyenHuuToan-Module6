import {Pigsty} from './pigsty';
import {Employee} from './employee';

export interface Export {
  id?: number;
  codeExport?: string;
  company?: string;
  saleDate?: string;
  amount?: number;
  kilogram?: number;
  totalMoney?: number;
  price?: number;
  typePigs?: number;
  isDeleted?: boolean;
  pigstyDto?: Pigsty;
  employDto?: Employee;
  codeEmployee?: string;
  nameEmployee?: string;
}
