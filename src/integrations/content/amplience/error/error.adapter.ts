import { ErrorResponse } from './error.response';

export interface ErrorAdapter {
  message: string;
  statusCode: number;
}

export const errorAdapter = (response: ErrorResponse): ErrorAdapter => {
  if (!response) {
    return {
      message: 'Empty response',
      statusCode: 404,
    };
  }

  return {
    message: response.message,
    statusCode: response.statusCode,
  };
};

export const isErrorAdapter = (response: unknown): response is ErrorAdapter => {
  if (typeof response !== 'object' || response === null) return false;

  return (
    'message' in response &&
    'statusCode' in response &&
    typeof response.message === 'string' &&
    typeof response.statusCode === 'number' &&
    response.statusCode > 300
  );
};
