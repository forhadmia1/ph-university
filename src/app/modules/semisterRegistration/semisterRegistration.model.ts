import { Schema, model } from 'mongoose';
import { TSemisterRegistration } from './semisterRegistration.interface';

const semisterRegistrationSchema = new Schema<TSemisterRegistration>(
  {
    academicSemister: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'academicSemister',
    },
    status: {
      type: String,
      enum: {
        values: ['Upcomming', 'Ongoing', 'Ended'],
        message: `{VALUE} is not valid status`,
      },
      default: 'Upcomming',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemisterRegistration = model<TSemisterRegistration>(
  'semisterRegistration',
  semisterRegistrationSchema,
);
