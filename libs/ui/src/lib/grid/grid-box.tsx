import React, { FC, forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  ExcelConfig,
  Grid,
  GridBoxProps,
  GridImperative,
  Pagination,
  useModal,
} from '@learnway/ui';
import { IcoDownload, IcoMinus, IcoPlus, IcoUploadCloud } from '@learnway/icons';
import styles from './grid-box.module.css';
import { cn, fileDownload } from '@learnway/shared';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { PMSApiPrefix } from '@learnway/config';
import { UseFormReturn } from 'react-hook-form';

/**
 * 다양한 설정 옵션을 통해 재사용 가능한 표 컴포넌트(Grid)를 구성합니다.
 * - 컬럼 정의, 데이터 페칭, 페이지네이션 등을 포함
 * - 필요에 따라 상단 버튼이나 안내문구, 엑셀/CSV 기능을 표시 가능
 *
 * @template T - 테이블 row 데이터 타입
 * @param props - GridBoxProps<T>
 * @returns React component
 */
const GridBoxComponent = <T extends object>(
  {
    // @ts-ignore
    config = {},
    showTotalCount = true,
    showSelectedCount,
    showColumnSettings,
    showExcelDownload,
    showUpload,
    showSelectAll,
    showDeleteAll,
    showAdd,
    showAddRow,
    showRemoveRow,
    titleCustomNode,
    customButtonNode,
    guideText,
    onAddClick,
    clientSideFiltering,
    clientSideSorting,
    ...props
  }: GridBoxProps<T>,
  ref: React.Ref<GridImperative>,
) => {
  const { t } = useTranslation();
  const {
    data = props.data,
    page,
    totalRows,
    gridFetch,
    columns,
    title,
    onDataChange,
    excel,
    getParams,
    totalElements,
  } = config;
  const columnHelper = createColumnHelper<any>();
  const gridRef = useRef<GridImperative>(null);

  useImperativeHandle(ref, () => gridRef.current as GridImperative);

  /**
   * 컬럼 정보를 기반으로 TanStack Table 형식으로 변환
   * TODO: props로 받은 columns로 완전히 대체 예정
   */
  const girdColumns = useMemo(() => {
    return columns
      ?.filter((column: any) => column.type !== 'numbering')
      ?.map((column: any) => {
        return columnHelper.accessor(column.name, {
          cell: (info) => {
            if (column.render) {
              // render 함수 내부에서 필요한 값(page, row 등)은 info 객체나 클로저로 접근
              return column.render(info);
            }
            return info.getValue();
          },
          header: column.label,
          size: column.size,
          // 다른 컬럼 옵션들 (sortingFn, filterFn 등) 필요시 추가
        });
      });
  }, [columns, page, totalRows, columnHelper]);

  /**
   * numbering 컬럼 여부 확인 (props나 config로 전달 가능)
   * TODO: props로 받은 columns로 완전히 대체 후 삭제 예정
   */
  const showNumberingColumn =
    columns?.find((d: any) => d.type === 'numbering') || props.showNumberingColumn;

  /**
   * 추가 버튼 클릭
   */
  const handleAddClick = useCallback(
    () => {
      // 그리드 선택 초기화
      gridRef.current?.resetRowSelection();
      // callback
      onAddClick?.();
    },
    [gridRef, onAddClick], // 의존성 배열: gridFetch와 page 객체 참조
  );

  /**
   * 행추가 버튼 클릭
   */
  const handleAddRowClick = useCallback(() => {
    console.log('행추가');
  }, []);

  /**
   * 행삭제 버튼 클릭
   */
  const handleRemoveRowClick = useCallback(() => {
    console.log('행삭제');
  }, []);

  /**
   * 페이지 이동 핸들러
   */
  const handleChangePage = useCallback(
    (pageIndex: number) => {
      gridFetch?.({
        size: page?.pageSize, // page 객체의 pageSize 사용
        page: pageIndex,
      });
    },
    [gridFetch, page], // 의존성 배열: gridFetch와 page 객체 참조
  );

  /**
   * 페이지 사이즈 변경 핸들러
   */
  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      gridFetch?.({
        size: pageSize,
        page: 1, // 페이지 사이즈 변경 시 첫 페이지로 이동
      });
    },
    [gridFetch],
  );

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      console.log('handlePageChange', pageNumber);
      props.pagination?.onPageChange?.(pageNumber);
    },
    [props.pagination],
  );

  /**
   * pagination 설정
   * - props로 직접 전달되면 우선 사용
   * - 없으면 config에서 받아 설정
   */
  const paginationProps = useMemo(() => {
    // props.pagination이 전달되면 우선 사용
    if (props.pagination) {
      return props.pagination;
    }
    return page
      ? {
          ...page, // page 객체의 현재 상태 스프레드
          onPageChange: handleChangePage, // 메모이제이션된 핸들러 함수 전달
          onPageSizeChange: handleChangePageSize, // 메모이제이션된 핸들러 함수 전달
        }
      : undefined; // page가 falsy일 경우 undefined 반환
  }, [page, handleChangePage, handleChangePageSize, props.pagination]);

  console.log('grid-box ::', { paginationProps });

  return (
    <div className={cn(styles.table_box)}>
      <div className={styles.table_info}>
        <div className={styles.title_info}>
          {/* 제목 */}
          {<div className={styles.title}>{props.title || title || t('LABEL.grid.title.list')}</div>}

          {/* 전체 개수  */}
          {showTotalCount && (
            <div className={styles.sub_info}>
              {t('LABEL.grid.header.all')}{' '}
              <strong className={styles.num}>{totalElements || data?.length || 0}</strong>
            </div>
          )}
          {/* 좌측 타이틀 영역 커스텀 (전체 카운트와 가이드 텍스트 중간 영역) */}
          {titleCustomNode && <div>{titleCustomNode}</div>}

          {/* 가이드 텍스트 */}
          <p className={styles.guide_text}>{guideText}</p>
        </div>

        <div className={styles.button_info}>
          {/* 외부에서 받은 커스텀 버튼 노드 */}
          {customButtonNode}
          {/* 전체 선택 */}
          {showSelectAll && (
            <Button
              variant="text"
              size="xs"
              className={styles.btn_all_select}
              label={t('LABEL.grid.header.selectAll')}
              icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
            />
          )}
          {/* 전체 삭제 */}
          {showDeleteAll && (
            <Button
              variant="text"
              size="xs"
              className={styles.btn_all_delete}
              label={t('LABEL.grid.header.removeAll')}
              icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
            />
          )}
          {/* 업로드 */}
          <ExcelButtons config={excel} getParams={getParams} />
          {/* 컬럼 설정 */}
          {/*{showColumnSettings && (*/}
          {/*  <Button*/}
          {/*    variant="outline"*/}
          {/*    size="sm"*/}
          {/*    label={t('LABEL.grid.header.columnSetting}*/}
          {/*    icon={<IcoSetting width={16} height={16} stroke="#131C30" />}*/}
          {/*    className="btn_setting"*/}
          {/*  />*/}
          {/*)}*/}
          {/* 추가 */}
          {showAdd && (
            <Button
              variant="outline"
              size="sm"
              label={t('LABEL.grid.header.add')}
              onClick={handleAddClick}
            />
          )}
          {/* 행추가 */}
          {showAddRow && (
            <Button
              variant="outline"
              size="sm"
              label={t('행추가')}
              icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
              onClick={handleAddRowClick}
            />
          )}
          {/* 행삭제 */}
          {showRemoveRow && (
            <Button
              variant="outline"
              size="sm"
              label={t('행삭제')}
              icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
              onClick={handleRemoveRowClick}
            />
          )}
        </div>
      </div>
      {/* 데이터 테이블 렌더링 */}
      <Grid
        {...props}
        ref={gridRef}
        onChange={onDataChange}
        data={props.data ?? data ?? []}
        columns={props.columns ?? girdColumns ?? []}
        showNumberingColumn={showNumberingColumn}
        clientSideSorting={clientSideSorting}
        clientSideFiltering={clientSideFiltering}
      />
      {/* 페이지네이션 */}
      {paginationProps && (
        <Pagination
          totalPages={paginationProps.totalRows}
          pageNumber={paginationProps.pageNumber}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
export const GridBox = forwardRef(GridBoxComponent);
/**
 * Excel 관련 버튼을 Excel Config 기준으로 렌더링 합니다.
 * @param config
 * @param getParams
 * @constructor
 */
const ExcelButtons: FC<{ config?: ExcelConfig; getParams?: UseFormReturn['getValues'] }> = ({
  config,
  getParams,
}) => {
  if (!config) return <></>;
  const { open: openModal } = useModal();
  const { upload, download, form } = config;

  const handleExcelDownload = async () => {
    const params = getParams ? getParams() : {};
    await fileDownload(`${PMSApiPrefix()}/multilingual/exportExcel`, params);
  };

  const handleExcelUpload = async () => {
    //excelUpload || excelUpload();
  };

  return (
    <>
      {/* 업로드 */}
      {upload && (
        <Button
          variant="text"
          size="xs"
          className={styles.btn_upload}
          label={t('LABEL.grid.header.excelUpload')}
          icon={
            <IcoUploadCloud width={16} height={16} stroke={'#4C515E'} onClick={handleExcelUpload} />
          }
        />
      )}
      {/* 엑셀다운로드 */}
      {download && (
        <Button
          variant="text"
          size="xs"
          className={styles.btn_excel}
          label={t('LABEL.grid.header.excelDownload')}
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
          onClick={handleExcelDownload}
        />
      )}
    </>
  );
};
