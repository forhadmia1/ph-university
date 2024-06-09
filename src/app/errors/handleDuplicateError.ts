import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 500;

  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  return {
    statusCode,
    errorSource,
    message: 'Duplicate error',
  };
};

export default handleDuplicateError;
