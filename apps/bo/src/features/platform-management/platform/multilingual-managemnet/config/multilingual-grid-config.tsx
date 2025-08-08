import { CellContext } from '@tanstack/react-table';
import { EditInputCell, EditTextareaCell } from '@learnway/ui/grid';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { t } from 'i18next';
import { translationQueryOptions } from '@entities/translation';

export const createGridConfig = (onCellClick: (data: any) => void, currentTargetLocale: string) => ({
  query: translationQueryOptions.all,
  gridState: { size: 10 },
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
      size: 50,
    },
    {
      name: 'keyType',
      label: t('분류'),
      render: (info: CellContext<any, string>) => {
        return info.row.getValue('keyTypeName');
      },
    },
    {
      name: 'keyTypeName',
      label: t('분류'),
      meta: {
        hidden: true,
      },
    },
    {
      name: 'multilingualKey',
      label: t('코드'),
    },
    {
      name: 'baseLanguage',
      label: t('기준명(한국어)'),
    },
    {
      name: 'targetLanguage',
      label: t('번역명(번역언어)'),
      accessorKey: 'text',
      render: (info: CellContext<any, string>) => {
        const isReadOnly = currentTargetLocale === 'KO';
        if (isReadOnly) {
          return <span>{info.getValue()}</span>;
        }
        return info.row.getValue('keyType') === 'MESSAGE' ||
          info.row.getValue('keyType') === 'LABEL' ? (
          <EditTextareaCell info={info} textarea={{ maxLength: 150 }} />
        ) : (
          <EditInputCell info={info} input={{ type: 'text', maxLength: 150 }} />
        );
      },
    },
    {
      name: 'totalTranslatedCount',
      label: t('번역완료'),
      render: (info: CellContext<any, string>) => {
        return (
          <div
            onClick={() => {
              const data = info.row.original;
              onCellClick(data);
            }}
            className="cursor-pointer underline"
          >
            {info.row.original.totalTranslatedCount} / {info.row.original.totalLocaleCount}
          </div>
        );
      },
      size: 80,
      enableSorting: false,
    },
    {
      name: 'modifiedDate',
      label: t('수정일'),
      render: (info: any) => (
        <span className={'whitespace-nowrap'}>
          {getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_MIN)}
        </span>
      ),
      meta: {
        cellAlign: 'center',
      },
    },
  ],
  data: [],
});