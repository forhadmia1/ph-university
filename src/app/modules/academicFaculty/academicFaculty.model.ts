import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const AcademicFacultyModel = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  'academicFaculty',
  AcademicFacultyModel,
);
