import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { useGetDocumentByIdQuery } from '@api/documentsApi';
import { formatBytes } from '@helpers/formatBytes.helper';
import { formatDate } from '@helpers/formatDate.helper';
import { Badge } from '@shared/uiKit/badge';

import { DOCUMENT_PREVIEW_LABEL_KEYS } from './documentDetailPage.config';
import { statusVariantMap } from '../documentListPage/configs/documentListColumns.config';

import styles from './documentDetailPage.module.scss';

const DocumentDetailPage: FC = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('documents');

  const { data: document, isLoading, isError } = useGetDocumentByIdQuery(id ?? '', {
    skip: !id,
  });

  if (!id) {
    return (
      <div className={styles.page}>
        <Link
          to="/documents"
          className={styles.backLink}
        >
          ← {t('detail_back_to_list')}
        </Link>
        <p className={styles.notFound}>
          {t('detail_not_found')}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Link
          to="/documents"
          className={styles.backLink}
        >
          ← {t('detail_back_to_list')}
        </Link>
        <p className={styles.loading}>
          {t('loading', { ns: 'common' })}
        </p>
      </div>
    );
  }

  if (isError || !document) {
    return (
      <div className={styles.page}>
        <Link
          to="/documents"
          className={styles.backLink}
        >
          ← {t('detail_back_to_list')}
        </Link>
        <p className={styles.error}>
          {isError ? t('error_occurred', { ns: 'common' }) : t('detail_not_found')}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link
        to="/documents"
        className={styles.backLink}
      >
        ← {t('detail_back_to_list')}
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>
          {document.name}
        </h1>
        <p className={styles.metaRow}>
          {document.type}
          {' · '}
          {formatBytes(document.size)}
          {' · '}
          {t('detail_modified', { date: formatDate(document.lastModified) })}
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t('detail_preview')}
        </h2>
        <div className={styles.previewPlaceholder}>
          {t(DOCUMENT_PREVIEW_LABEL_KEYS[document.type])}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t('detail_metadata')}
        </h2>
        <ul className={styles.metadataList}>
          <li className={styles.metadataItem}>
            <span className={styles.metadataTerm}>
              {t('name')}
            </span>
            <span className={styles.metadataDesc}>
              {document.name}
            </span>
          </li>
          <li className={styles.metadataItem}>
            <span className={styles.metadataTerm}>
              {t('type')}
            </span>
            <span className={styles.metadataDesc}>
              {document.type}
            </span>
          </li>
          <li className={styles.metadataItem}>
            <span className={styles.metadataTerm}>
              {t('size')}
            </span>
            <span className={styles.metadataDesc}>
              {formatBytes(document.size)}
            </span>
          </li>
          <li className={styles.metadataItem}>
            <span className={styles.metadataTerm}>
              {t('owner')}
            </span>
            <span className={styles.metadataDesc}>
              {document.owner}
            </span>
          </li>
          <li className={styles.metadataItem}>
            <span className={styles.metadataTerm}>
              {t('last_modified')}
            </span>
            <span className={styles.metadataDesc}>
              {formatDate(document.lastModified)}
            </span>
          </li>
          <li className={styles.metadataItem}>
            <span className={styles.metadataTerm}>
              {t('status')}
            </span>
            <span className={styles.metadataDesc}>
              <Badge variant={statusVariantMap[document.status]}>
                {t(`status_${document.status}`)}
              </Badge>
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DocumentDetailPage;
