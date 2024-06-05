import { TAcademicSemister } from '../academicSemister/academicSemister.interface';
import { UserModel } from './user.model';

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await UserModel.findOne({
    role: 'student',
  })
    .select('id _id')
    .sort({
      createdAt: -1,
    });

  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemister) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();

  const year = lastStudentId?.substring(0, 4);
  const semister = lastStudentId?.substring(4, 6);

  if (lastStudentId && year === payload.year && semister === payload.code) {
    currentId = lastStudentId?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
