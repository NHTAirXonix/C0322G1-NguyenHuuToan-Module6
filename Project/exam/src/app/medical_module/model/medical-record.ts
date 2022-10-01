import {Patient} from './patient';

export interface MedicalRecord {
  medicalId?: number;
  medicalCode?: string;
  dayStart?: string;
  dayEnd?: string;
  reason?: string;
  resolve?: string;
  doctor?: string;
  deleteStatus?: boolean;
  money?: number;
  patient?: Patient;
}
