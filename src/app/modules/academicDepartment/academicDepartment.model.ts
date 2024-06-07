import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicFaculty',
  },
});

AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(400, 'This department already exist');
  }
  next();
});

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExist = await AcademicDepartment.findOne(query);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department does not exist');
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'academicDepartment',
  AcademicDepartmentSchema,
);
