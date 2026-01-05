import { toast } from 'react-toastify';
import { ZodTypeAny } from 'zod';

type ValidationOptions = {
  throwOnError?: boolean;
};

const validateDataWithZod = <T>(
  model: ZodTypeAny,
  response: unknown,
  toastAnswer: string,
  options: ValidationOptions = { throwOnError: true }
): T | null => {
  const parseResult = model.safeParse(response);
  if (!parseResult.success) {
    toast.error(toastAnswer);
    if (options.throwOnError) {
      throw new Error(toastAnswer);
    }
    return null;
  }

  return parseResult.data as T;
};

export default validateDataWithZod;
