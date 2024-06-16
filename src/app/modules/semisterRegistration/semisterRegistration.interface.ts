import { Types } from 'mongoose';

export type TSemisterRegistration = {
  academicSemister: Types.ObjectId;
  status: 'Upcomming' | 'Ongoing' | 'Ended';
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
