import React, { FC } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Button, Grid, GridProps } from '@learnway/ui';
import { t } from 'i18next';
import { IcoDownload, IcoMinus, IcoSetting } from '@learnway/icons';
import styles from './grid-box.module.css';
import { cn } from '@learnway/shared';

export interface GridBoxProps {
  /**
   * config
   */
  config: any;
  /**
   * Grid Props
   */
  gridProps?: GridProps<any>;

  /**
   * 타이틀
   */
  title?: string;

  /**
   * 항목 설정 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 항목 설정 버튼이 숨겨집니다.
   */
  hideColumnSettings?: boolean;

  /**
   * 전체 행 개수 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 전체 행 개수가 표시됩니다.
   */
  showTotalCount?: boolean;

  /**
   * 선택된 행 개수 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 선택된 행 개수가 표시됩니다.
   */
  showSelectedCount?: boolean;

  /**
   * 엑셀 다운로드 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 엑셀 다운로드 버튼이 표시됩니다.
   */
  showExcelDownload?: boolean;

  /**
   * 업로드 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 업로드 버튼이 표시됩니다.
   */
  showUpload?: boolean;

  /**
   * 전체 선택 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 전체 선택 버튼이 표시됩니다.
   */
  showSelectAll?: boolean;

  /**
   * 전체 삭제 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 전체 삭제 버튼이 표시됩니다.
   */
  showDeleteAll?: boolean;

  /**
   * 좌측 타이틀 영역 커스텀
   */
  titleCustomNode?: React.ReactNode;

  /**
   * 우측 버튼 영역 커스텀
   */
  renderButtons?: React.ReactNode;

  /**
   * guideText
   */
  guideText?: string;
}

/**
 * 임시
 * @param config
 * @constructor
 */
const GridBoxComponent: FC<any> = ({
  config,
  gridProps,
  title,
  hideColumnSettings,
  showTotalCount = true,
  showExcelDownload = false,
  showUpload = false,
  showSelectAll = false,
  showDeleteAll = false,
  showSelectedCount,
  titleCustomNode,
  renderButtons,
  guideText,
}: GridBoxProps) => {
  const { data, page, totalRows, gridFetch, columns } = config;
  const columnHelper = createColumnHelper<any>();
  const girdColumns = columns.map((column: any) => {
    switch (column.type) {
      case 'numbering':
        return columnHelper.display({
          id: column.name,
          header: column.label,
          cell: ({ row }) =>
            page ? page.pageIndex * page.pageSize + row.index + 1 : row.index + 1,
        });
      case 'reverse-numbering':
        return columnHelper.display({
          id: column.name,
          header: column.label,
          cell: ({ row }) =>
            page
              ? page.totalRows - (page.pageIndex * page.pageSize + row.index)
              : totalRows - row.index,
        });
      default:
        return columnHelper.accessor(column.name, {
          cell: (info) => {
            if (column.render) {
              return column.render(info);
            }
            return info.getValue();
          },
          header: column.label,
        });
    }
  });

  const handleChangePage = (pageIndex: number) => {
    gridFetch({
      size: page.pageSize,
      page: pageIndex,
    });
  };

  const handleChangePageSize = (pageSize: number) => {
    console.log('page size');
  };

  const handleColumnSettings = () => {
    console.log('columnSettings');
  };

  return (
    <div className={cn(styles.table_box)}>
      <div className={styles.table_info}>
        <div className={styles.title_info}>
          {/* 제목 */}
          {title && <div className={styles.title}>{title}</div>}

          {/* 전체 개수  */}
          {showTotalCount && (
            <div className={styles.sub_info}>
              {t('전체')} <strong className={styles.num}>{data?.length}</strong>
            </div>
          )}
          {/* react node */}
          {titleCustomNode && <div>{titleCustomNode}</div>}

          {/* 가이드 텍스트 */}
          <p className={styles.guide_text}>{guideText}</p>
        </div>

        <div className={styles.button_info}>
          {/* 전체 선택 */}
          {showSelectAll && (
            <Button
              variant="text"
              size="xs"
              className={styles.btn_all_select}
              label={t('전체 선택')}
              icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
            />
          )}
          {/* 전체 삭제 */}
          {showDeleteAll && (
            <Button
              variant="text"
              size="xs"
              className={styles.btn_all_delete}
              label={t('전체 삭제')}
              icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
            />
          )}
          {/* 업로드 */}
          {showUpload && (
            <Button
              variant="text"
              size="xs"
              className={styles.btn_upload}
              label={t('CSV업로드')}
              icon={<IcoDownload width={16} height={16} stroke={'#3e4550'} />}
            />
          )}
          {/* 엑셀다운로드 */}
          {showExcelDownload && (
            <Button
              variant="text"
              size="xs"
              className={styles.btn_excel}
              label={t('엑셀다운로드')}
              icon={<IcoDownload width={16} height={16} stroke={'#3e4550'} />}
            />
          )}
          {/* 컬럼 설정 */}
          {!hideColumnSettings && (
            <Button
              variant="outline"
              size="sm"
              label={t('항목설정')}
              icon={<IcoSetting width={16} height={16} stroke="#131C30" />}
              className="btn_setting"
              onClick={handleColumnSettings}
            />
          )}
          {renderButtons}
        </div>
      </div>
      {/*  */}
      <Grid
        title={'Editable Grid'}
        data={data}
        columns={girdColumns}
        hideColumnSettings
        hideRowSelectionCheckBox
        pagination={
          page
            ? {
                ...page,
                onPageChange: handleChangePage,
                onPageSizeChange: handleChangePageSize,
              }
            : undefined
        }
        /*pagination={

          }*/
      />
    </div>
  );
};
export const GridBox = GridBoxComponent;
