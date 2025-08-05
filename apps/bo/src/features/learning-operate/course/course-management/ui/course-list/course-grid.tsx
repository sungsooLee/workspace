import { CourseListItem } from '@entities/course';
import { Button } from '@learnway/ui/button';
import { GridBox } from '@learnway/ui/grid';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseButtonState } from '../../types/type';

interface CourseGridProps {
  config: any;
  selectedRows: CourseListItem[];
  buttonState: CourseButtonState;
  getValues: () => any;
  onRowsSelect?: (rows: CourseListItem[]) => void;
  onCopyClick?: () => void;
  onShareClick?: () => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  config,
  selectedRows,
  buttonState,
  getValues,
  onRowsSelect,
  onCopyClick,
  onShareClick,
}) => {
  const { t } = useTranslation();

  const customButtonNode = useMemo(
    () => (
      <Button
        variant="text"
        size="sm"
        label={t('LABEL.grid.header.toShare')}
        disabled={!buttonState.share}
        onClick={() => onShareClick?.()}
      />
    ),
    [buttonState.share],
  );

  return (
    <GridBox
      config={config}
      // data={[{}]}
      multiple
      showNumberingColumn
      copyButton={{
        disabled: !buttonState.copy,
        onClick: () => onCopyClick?.(),
      }}
      onRowsSelect={onRowsSelect}
      customButtonNode={customButtonNode}
      excelButtons={
        <>
          <GridExcelUploadButton validateUrl={'/api/v1/course/validation/excel/upload'} disabled />
          <GridExcelDownloadButton
            url={'/api/v1/course/validation/excel/export'}
            params={getValues()}
            disabled
          />
          {/* <GridExcelDownloadButton
              method="post"
              url={`${CMSApiPrefix()}/contents/excel`}
              params={{ ...params, lastVisitedBoRoleId: authUser?.lastVisitedBoRoleId }}
              paramLabels={valuesWithLabel}
              dataCount={data?.totalElements}
              disabled={
                !data?.totalElements || authUser?.activeRole?.roleType === 'CHANNEL_GUEST_COURSE'
              }
            /> */}
        </>
      }
    />
  );
};
