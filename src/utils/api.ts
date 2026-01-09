import type { ZodTypeAny } from 'zod';
import validateDataWithZod from './validation';
import { logError } from './logger';

export const transformCustomResponse = <T>(
  res: T,
  model: ZodTypeAny,
  message: string,
  emptyResponse: T,
  options: { throwOnError?: boolean } = {}
): T => {
  try {
    const parsed = validateDataWithZod<T>(model, res, message);
    return parsed ?? emptyResponse;
  } catch (error) {
    logError(message, error);
    if (options.throwOnError) {
      throw error;
    }
    return emptyResponse;
  }
};
