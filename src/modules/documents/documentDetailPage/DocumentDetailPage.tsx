import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { useGetDocumentByIdQuery } from '@api/documentsApi';
import { formatBytes } from '@helpers/formatBytes.helper';
import { formatDate } from '@helpers/formatDate.helper';
import { Badge } from '@shared/uiKit/badge';

import { DOCUMENT_PREVIEW_LABEL_KEYS } from './documentDetailPage.config';
import { getMockActivityLog } from './documentDetailActivityLog.mock';
import { getMockVersionHistory } from './documentDetailVersionHistory.mock';

import { statusVariantMap } from '../documentListPage/configs/documentListColumns.config';
import DocumentDetailComments from './components/DocumentDetailComments/DocumentDetailComments';

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
          {t('detail_version_history')}
        </h2>
        <div className={styles.timeline}>
          {getMockVersionHistory(document.id).map((entry, index, arr) => (
            <div
              key={entry.version}
              className={styles.timelineItem}
            >
              <div className={styles.timelineDot} />
              {index < arr.length - 1 && (
                <div className={styles.timelineLine} />
              )}
              <div className={styles.timelineContent}>
                <span className={styles.timelineVersion}>
                  {t('detail_version_number', { number: entry.version })}
                </span>
                {entry.labelKey && (
                  <span className={styles.timelineLabel}>
                    {t(entry.labelKey)}
                  </span>
                )}
                <p className={styles.timelineMeta}>
                  {formatDate(entry.date)}
                  {' · '}
                  {t('detail_version_by', { author: entry.author })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t('detail_activity_log')}
        </h2>
        <ul className={styles.activityList}>
          {getMockActivityLog(document.id).map((entry) => (
            <li
              key={entry.id}
              className={styles.activityItem}
            >
              <span className={styles.activityType}>
                {t(`detail_activity_${entry.type}`)}
              </span>
              <span className={styles.activityMeta}>
                {formatDate(entry.date)}
                {' · '}
                {entry.author}
              </span>
              {entry.detail && (
                <p className={styles.activityDetail}>
                  {entry.detail}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t('detail_comments_title')}
        </h2>
        <DocumentDetailComments />
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
