import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TSemisterRegistration } from './semisterRegistration.interface';
import { SemisterRegistration } from './semisterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemisterRegistrationIntoDB = async (
  payload: TSemisterRegistration,
) => {
  //if already a upcomming or ongoing semister registerd
  const isUpcommingOrOngoingSemisterExists = await SemisterRegistration.findOne(
    {
      $or: [{ status: 'Upcomming' }, { status: 'Ongoing' }],
    },
  );

  if (isUpcommingOrOngoingSemisterExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      `${payload.status} semister is already registered`,
    );
  }

  const academicSemister = payload?.academicSemister;

  const isAcademicSemisterExists =
    await AcademicSemister.findById(academicSemister);

  if (!isAcademicSemisterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semister is not found',
    );
  }

  const isSemisterRegistrationExists = await SemisterRegistration.findOne({
    academicSemister,
  });

  if (isSemisterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semister registration already exists',
    );
  }

  const result = await SemisterRegistration.create(payload);
  return result;
};

const getAllSemisterRegistration = async (query: Record<string, unknown>) => {
  const semisterRegistrationQuery = new QueryBuilder(
    SemisterRegistration.find().populate('academicSemister'),
    query,
  )
    .filter()
    .pagination()
    .sort()
    .select();

  const result = await semisterRegistrationQuery.model;
  return result;
};

const getSingleSemisterRegistration = async (id: string) => {
  const result =
    await SemisterRegistration.findById(id).populate('academicSemister');
  return result;
};

const updateSemisterRegistration = async (
  id: string,
  payload: TSemisterRegistration,
) => {
  const requestSemisterStatus = payload?.status;
  const isSemisterRegistrationExists = await SemisterRegistration.findById(id);

  if (!isSemisterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semister in not found');
  }

  const currentSemisterStatus = isSemisterRegistrationExists.status;

  if (currentSemisterStatus === 'Ended') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ` this semister is already ${currentSemisterStatus}`,
    );
  }

  if (
    currentSemisterStatus === 'Upcomming' &&
    requestSemisterStatus === 'Ended'
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Can not change ${currentSemisterStatus} to ${requestSemisterStatus} directry`,
    );
  }

  if (
    currentSemisterStatus === 'Ongoing' &&
    requestSemisterStatus === 'Upcomming'
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Can not change ${currentSemisterStatus} to ${requestSemisterStatus} directry`,
    );
  }

  const result = await SemisterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const semisterRegistrationServices = {
  createSemisterRegistrationIntoDB,
  getAllSemisterRegistration,
  getSingleSemisterRegistration,
  updateSemisterRegistration,
};
