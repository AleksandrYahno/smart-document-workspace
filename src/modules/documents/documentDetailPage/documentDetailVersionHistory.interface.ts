export interface IDocumentVersionEntry {
  version: number;
  date: string;
  author: string;
  /** i18n key for label (e.g. detail_version_label_initial). */
  labelKey?: string;
}
