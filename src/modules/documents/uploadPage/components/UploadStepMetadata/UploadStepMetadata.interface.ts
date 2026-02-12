import type { IUploadFormValues } from '../../uploadForm.interface';
import type { FormikErrors } from 'formik';

export interface IUploadStepMetadataProps {
  values: IUploadFormValues;
  errors: FormikErrors<IUploadFormValues>;
  setFieldValue: (field: string, value: unknown) => void;
  onBack: () => void;
  onNext: () => void;
  t: (key: string, options?: { ns?: string }) => string;
}
