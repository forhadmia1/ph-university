import config from '../../config';
import { TAcademicSemister } from '../academicSemister/academicSemister.interface';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.defaultPass as string);

  //set student role
  user.role = 'student';

  const admissionSemister = await AcademicSemister.findById(
    payload.admissionSemister,
  );

  user.id = await generateStudentId(admissionSemister as TAcademicSemister);

  //create a user
  const newUser = await UserModel.create(user);
  //create a student

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
