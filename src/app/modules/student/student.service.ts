import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { UserModel } from '../user/user.model';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // //{email:{$regex: query.searchterm, $options:'i'}}

  // let searchTerm: string = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: ['name.firstName', 'email'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // //filtering

  // const excludesFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludesFields.forEach((el) => delete queryObj[el]);

  // const filteringQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemister')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // //sorting
  // let sort: string = '-createdAt';

  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }

  // const sortQuery = filteringQuery.sort(sort);

  // //limiting

  // let page: number = 1;
  // let limit: number = 10;
  // let skip: number = 0;

  // if (query?.limit) {
  //   limit = Number(query?.limit);
  // }
  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = Number((page - 1) * limit);
  // }

  // const pageQuery = sortQuery.skip(skip);

  // const limitQuery = pageQuery.limit(limit);

  // //field limiting
  // let fields: string = '-__v';

  // if (query?.fields) {
  //   fields = (query?.fields as string).split(',').join(' ');
  // }

  // const selectQuery = await limitQuery.select(fields);

  // return selectQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemister')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(['name.firstName', 'email'])
    .filter(['searchTerm', 'sort', 'limit', 'page', 'fields'])
    .sort()
    .pagination()
    .select();

  const result = await studentQuery.model;

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  console.log(id);
  const result = await Student.findById(id)
    .populate('admissionSemister')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
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
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
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

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...rest } = payload;

  const modifiedData: Record<string, unknown> = { ...rest };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
