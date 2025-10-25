import { useEffect, useState } from "react";

export type NonFunctionKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export interface FieldValidation {
  errorMessage: string;
  rule: () => boolean;
}

export type ValidationSchema<T> = Partial<
  Record<NonFunctionKeys<T>, FieldValidation>
>;

export function useFormValidator<T>(validationSchema: ValidationSchema<T>) {
  const [errors, setErrors] = useState<
    Partial<Record<NonFunctionKeys<T>, string>>
  >({});

  useEffect(() => {
    const newErrors: Partial<Record<NonFunctionKeys<T>, string>> = {};

    for (const key in validationSchema) {
      if (Object.prototype.hasOwnProperty.call(validationSchema, key)) {
        const validation = validationSchema[key as NonFunctionKeys<T>];
        if (validation && validation.rule()) {
          newErrors[key as NonFunctionKeys<T>] = validation.errorMessage;
        }
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrors(newErrors);
  }, [validationSchema]);

  const getError = (field: NonFunctionKeys<T>): string => {
    return errors[field] || "";
  };

  const hasError = (field: NonFunctionKeys<T>): boolean => {
    return !!errors[field];
  };

  return { errors, getError, hasError };
}
