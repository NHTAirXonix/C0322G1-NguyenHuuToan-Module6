import {CardMedical} from './card-medical';

export interface People {
  id?: number;
  code?: string;
  name?: string;
  dayStart?: string;
  dayEnd?: string;
  reason?: string;
  resovers?: string;
  doctor?: string;
  cardMedical?: CardMedical;
}
