import { expect, it, jest } from '@jest/globals';
import validateDataWithZod from './validation';
import { logError } from './logger';

export const testParsedResponse = <T>(
  message: string,
  validResponse: T,
  transformResponse: (res: T) => T
) => {
  it(message, () => {
    (validateDataWithZod as jest.Mock).mockReturnValue(validResponse);

    const result = transformResponse(validResponse);

    expect(result).toEqual(validResponse);
    expect(logError).not.toHaveBeenCalled();
  });
};

export const testFallback = <T>(
  message: string,
  validResponse: T,
  emptyResponse: T,
  transformResponse: (res: T) => T
) => {
  it(message, () => {
    (validateDataWithZod as jest.Mock).mockReturnValue(null);

    const result = transformResponse(validResponse);

    expect(result).toEqual(emptyResponse);
    expect(logError).not.toHaveBeenCalled();
  });
};

export const testError = <T>(
  message: string,
  validResponse: T,
  emptyResponse: T,
  transformResponse: (res: T) => T,
  errorMessage: string
) => {
  it(message, () => {
    (validateDataWithZod as jest.Mock).mockImplementation(() => {
      throw new Error('boom');
    });

    const result = transformResponse(validResponse);

    expect(result).toEqual(emptyResponse);
    expect(logError).toHaveBeenCalledWith(errorMessage, expect.any(Error));
  });
};
