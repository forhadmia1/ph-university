import { Schema, model } from 'mongoose';
import { TAcademicSemister } from './academicSemister.interface';
import {
  academicSemisterCode,
  academicSemisterName,
  months,
} from './academicSemister.constants';

const academicSemisterModel = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      enum: {
        values: academicSemisterName,
        message: '{VALUE}  is not a valid name',
      },
      required: [true, 'name is required'],
    },
    code: {
      type: String,
      enum: {
        values: academicSemisterCode,
        message: '{VALUE} is not a valid code',
      },
      required: true,
    },
    startMonth: {
      type: String,
      enum: {
        values: months,
        message: '{VALUE} is not a valid month',
      },
      required: true,
    },
    endMonth: {
      type: String,
      enum: {
        values: months,
        message: '{VALUE} is not a valid month',
      },
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//check semister is already exist with same year
academicSemisterModel.pre('save', async function (next) {
  const isSemisterExist = await AcademicSemister.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemisterExist) {
    throw new Error('Semister is already exists!');
  }
  next();
});

export const AcademicSemister = model<TAcademicSemister>(
  'academicSemister',
  academicSemisterModel,
);
