import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchAbleFields } from './course.constants';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchAbleFields)
    .filter()
    .pagination()
    .sort()
    .select();

  const result = await courseQuery.model;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: TCourse) => {
  const { preRequisiteCourses, ...rest } = payload;

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const updateBasicInfo = await Course.findByIdAndUpdate(id, rest, {
      session,
      new: true,
      runValidators: true,
    });

    if (!updateBasicInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length) {
      const deletedCourses = preRequisiteCourses
        .filter((course) => course?.isDeleted)
        .map((el) => el.course);

      const updateDeleteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisiteCourses: { course: { $in: deletedCourses } } },
        },
        {
          session,
          new: true,
          runValidators: true,
        },
      );

      if (!updateDeleteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      const addCourses = preRequisiteCourses.filter(
        (course) => !course?.isDeleted,
      );

      const updateAddCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: addCourses } },
        },
        {
          session,
          new: true,
          runValidators: true,
        },
      );
      if (!updateAddCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    session.commitTransaction();
    return result;
  } catch (error: any) {
    session.abortTransaction();
    throw new Error(error);
  } finally {
    session.endSession();
  }
};

const assignFacultiesIntoDB = async (id: string, payload: TCourseFaculty) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesIntoDB = async (id: string, payload: TCourseFaculty) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesIntoDB,
  removeFacultiesIntoDB,
};
