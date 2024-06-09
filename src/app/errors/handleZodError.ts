import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';

const handleZodError = (err: ZodError) => {
  const statusCode = 400;

  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: 'validation error',
    errorSource,
  };
};

export default handleZodError;
