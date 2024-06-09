import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSource: TErrorSource = Object.values(err.errors).map((val) => {
    return {
      path: val.path,
      message: val.message,
    };
  });

  return {
    statusCode,
    message: 'validation error',
    errorSource,
  };
};

export default handleValidationError;
