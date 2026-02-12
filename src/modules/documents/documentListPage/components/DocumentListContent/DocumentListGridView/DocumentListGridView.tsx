import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { formatBytes } from '@helpers/formatBytes.helper';
import { formatDate } from '@helpers/formatDate.helper';
import { Badge } from '@shared/uiKit/badge';
import { Card } from '@shared/uiKit/card';

import { statusVariantMap } from '../../../configs/documentListColumns.config';
import DocumentListPagination from '../DocumentListPagination/DocumentListPagination';

import type { IDocumentListGridViewProps } from './DocumentListGridView.interface';

import styles from '../../../documentListPage.module.scss';

const DocumentListGridView: FC<IDocumentListGridViewProps> = (props): ReactElement => {
  const { data, emptyLabel, page, pageSize, onPrevPage, onNextPage } = props;
  const { t } = useTranslation('documents');

  const items = data.items;
  const totalPages = Math.ceil(data.total / pageSize);

  return (
    <>
      <div className={styles.grid}>
        {items.map((doc) => (
          <Card
            key={doc.id}
            title={doc.name}
          >
            <dl className={styles.cardMeta}>
              <dt>
                {t('type')}
              </dt>
              <dd>
                {doc.type}
              </dd>
              <dt>
                {t('size')}
              </dt>
              <dd>
                {formatBytes(doc.size)}
              </dd>
              <dt>
                {t('owner')}
              </dt>
              <dd>
                {doc.owner}
              </dd>
              <dt>
                {t('last_modified')}
              </dt>
              <dd>
                {formatDate(doc.lastModified)}
              </dd>
              <dt>
                {t('status')}
              </dt>
              <dd>
                <Badge variant={statusVariantMap[doc.status]}>
                  {t(`status_${doc.status}`)}
                </Badge>
              </dd>
            </dl>
          </Card>
        ))}
      </div>

      {
        items.length === 0 && (
          <p className={styles.empty}>
            {emptyLabel}
          </p>
        )
      }

      <DocumentListPagination
        page={page}
        totalPages={totalPages}
        total={data.total}
        onPrev={onPrevPage}
        onNext={onNextPage}
      />
    </>
  );
};

export default DocumentListGridView;
