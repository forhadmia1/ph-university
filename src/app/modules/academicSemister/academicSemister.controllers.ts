import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemisterServices } from './academicSemister.service';

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createAcademicSemisterInDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semister created successfully',
    data: result,
  });
});

const getAllAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllAcademicSemister();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semister fetched successfully',
    data: result,
  });
});

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemisterServices.getSingleAcademicSemister(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semister fetched successfully',
    data: result,
  });
});

const updateAcademicSemister = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemisterServices.updateAcademicSemister(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semister updated successfully',
    data: result,
  });
});

export const academicSemisterControllers = {
  createAcademicSemister,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateAcademicSemister,
};
