import AppError from '../../errors/appError';
import { academicSemisterNameCodeMapper } from './academicSemister.constants';
import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createAcademicSemisterInDB = async (payload: TAcademicSemister) => {
  if (academicSemisterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(500, `Invalid code for ${payload.name}`);
  }

  const result = await AcademicSemister.create(payload);

  return result;
};

const getAllAcademicSemister = async () => {
  const result = await AcademicSemister.find({});

  return result;
};

const getSingleAcademicSemister = async (id: string) => {
  const result = await AcademicSemister.find({ _id: id });

  return result;
};

const updateAcademicSemister = async (id: string, payload: any) => {
  if (
    payload.name &&
    payload.code &&
    academicSemisterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(500, 'Invalid semister code');
  }
  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemisterInDB,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateAcademicSemister,
};
