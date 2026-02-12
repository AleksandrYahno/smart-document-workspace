import type { IUploadFormValues } from '../../uploadForm.interface';
import type { FormikErrors } from 'formik';

export interface IUploadStepFileProps {
  values: IUploadFormValues;
  errors: FormikErrors<IUploadFormValues>;
  setFieldValue: (field: string, value: unknown) => void;
  setFieldError: (field: string, message: string | undefined) => void;
  onNext: () => void;
  t: (key: string, options?: { ns?: string }) => string;
}
