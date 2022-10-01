import {Employee} from './employee';
import {UserRole} from './user-role';

export interface AppUser {
  id?: number;
  username?: string;
  password?: string;
  address?: string;
  email?: string;
  creationDate?: string;
  isDeleted?: boolean;
  employee?: Employee;
  userRoles?: UserRole;
}
