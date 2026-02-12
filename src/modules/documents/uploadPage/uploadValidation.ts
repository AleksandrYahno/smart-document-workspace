import type { TFunction } from 'i18next';
import type { FormikErrors } from 'formik';
import type { AnyObjectSchema } from 'yup';

import type { IUploadFormValues } from './uploadForm.interface';
import { UploadStep } from './uploadStep.enum';
import { step1Schema, step2Schema } from './uploadValidation.schema';

const STEP_SCHEMAS: Partial<Record<UploadStep.File | UploadStep.Metadata, AnyObjectSchema>> = {
  [UploadStep.File]: step1Schema,
  [UploadStep.Metadata]: step2Schema,
};

function mapYupErrorsToFormik(
  err: { inner?: Array<{ path?: string; message?: string }> },
  t: TFunction,
): FormikErrors<IUploadFormValues> {
  const errors: FormikErrors<IUploadFormValues> = {};
  const inner = err.inner ?? [];

  inner.forEach((item) => {
    if (item.path != null && item.message != null) {
      (errors as Record<string, string>)[item.path] = t(item.message);
    }
  });

  return errors;
}

/**
 * Validates form values for the given upload step.
 * Only File and Metadata steps have validation; Review step has none.
 */
export async function validateUploadStep(
  step: UploadStep,
  values: IUploadFormValues,
  t: TFunction,
): Promise<FormikErrors<IUploadFormValues>> {
  const schema = STEP_SCHEMAS[step as UploadStep.File | UploadStep.Metadata];

  if (schema == null) {
    return {};
  }

  try {
    await schema.validate(values, { abortEarly: false });

    return {};
  } catch (err) {
    return mapYupErrorsToFormik(err as { inner?: Array<{ path?: string; message?: string }> }, t);
  }
}
