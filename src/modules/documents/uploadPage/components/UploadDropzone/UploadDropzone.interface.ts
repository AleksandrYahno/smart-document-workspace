export interface IUploadDropzoneProps {
  file: File | null;
  error?: string;
  onFile: (file: File | null) => void;
  t: (key: string, options?: { ns?: string }) => string;
}
