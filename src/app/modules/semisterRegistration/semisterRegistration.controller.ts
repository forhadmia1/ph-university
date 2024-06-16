import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semisterRegistrationServices } from './semisterRegistration.service';

const createSemisterRegistration = catchAsync(async (req, res) => {
  const result =
    await semisterRegistrationServices.createSemisterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister register create successfully',
    data: result,
  });
});

const getAllSemisterRegistration = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await semisterRegistrationServices.getAllSemisterRegistration(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister register retrive successfully',
    data: result,
  });
});

const getSingleSemisterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semisterRegistrationServices.getSingleSemisterRegistration(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Semister register retrive successfully',
    data: result,
  });
});

const updateSemisterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await semisterRegistrationServices.updateSemisterRegistration(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister register update successfully',
    data: result,
  });
});

export const semisterRegistrationControllers = {
  createSemisterRegistration,
  getAllSemisterRegistration,
  getSingleSemisterRegistration,
  updateSemisterRegistration,
};
