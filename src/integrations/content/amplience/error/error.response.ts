export interface ErrorResponse {
  message: string;
  status: number;
  statusCode: number;
}

export function isErrorResponse(data: unknown): data is ErrorResponse {
  if (!data || typeof data === 'object') return false;

  return (
    (typeof (data as ErrorResponse).status === 'number' &&
      (data as ErrorResponse).status !== 200) ||
    (typeof (data as ErrorResponse).statusCode === 'number' &&
      (data as ErrorResponse).statusCode !== 200)
  );
}
