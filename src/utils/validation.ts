import { toast } from 'react-toastify';
import { ZodTypeAny } from 'zod';

type ValidationOptions = {
  throwOnError?: boolean;
};

function validateDataWithZod<T>(
  model: ZodTypeAny,
  response: unknown,
  toastAnswer: string
): T;
function validateDataWithZod<T>(
  model: ZodTypeAny,
  response: unknown,
  toastAnswer: string,
  options: { throwOnError: false }
): T | null;

function validateDataWithZod<T>(
  model: ZodTypeAny,
  response: unknown,
  toastAnswer: string,
  options?: ValidationOptions
): T | null;

function validateDataWithZod<T>(
  model: ZodTypeAny,
  response: unknown,
  toastAnswer: string,
  options: ValidationOptions = { throwOnError: true }
): T | null {
  const shouldThrow = options?.throwOnError !== false;
  const parseResult = model.safeParse(response);
  if (!parseResult.success) {
    toast.error(toastAnswer);
    if (shouldThrow) {
      throw new Error(toastAnswer);
    }
    return null;
  }

  return parseResult.data as T;
}

export default validateDataWithZod;
