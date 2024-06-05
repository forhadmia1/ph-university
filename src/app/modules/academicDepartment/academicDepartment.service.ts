import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentInDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find({});
  return result;
};

const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findOne({ _id: id });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentInDB,
  updateAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
};
