import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemister } from '../academicSemister/academicSemister.interface';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.defaultPass as string);

  //set student role
  user.role = 'student';

  const admissionSemister = await AcademicSemister.findById(
    payload.admissionSemister,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Generate student ID
    user.id = await generateStudentId(admissionSemister as TAcademicSemister);

    // Create a user transaction
    const newUser = await UserModel.create([user], { session });

    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Set the user ID in payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create a student
    const newStudent = await Student.create([payload], { session });

    if (!newStudent?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // Commit the transaction
    await session.commitTransaction();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error',
    );
  } finally {
    await session.endSession();
  }
};

const deleteUserFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedStudnet = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deletedStudnet) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    await session.commitTransaction();
    return deletedStudnet;
  } catch (error) {
    console.error('Transaction error:', error); // Add this line for logging the error
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete');
  } finally {
    await session.endSession();
  }
};

export const userServices = {
  createStudentIntoDB,
  deleteUserFromDB,
};
