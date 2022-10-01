import {Placement} from './placement';

export interface Advertisement {
  id?: number;
  title?: string;
  image?: string;
  submittedDate?: string;
  timeExistence?: string;
  placement?: Placement;
}
