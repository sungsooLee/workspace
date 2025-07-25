import { Button, GridBox } from '@learnway/ui';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { CourseListItem } from '@types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseButtonState } from '../-common/type';

interface CourseGridProps {
  config: any;
  selectedRows: CourseListItem[];
  buttonState: CourseButtonState;
  getValues: () => any;
  onRowsSelect: (rows: CourseListItem[]) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  config,
  selectedRows,
  buttonState,
  getValues,
  onRowsSelect,
}) => {
  const { t } = useTranslation();

  const handleCopyClick = () => {
    console.log('Copy click - selectedRows:', selectedRows);
    // TODO: 복사 로직 구현
  };

  const handleShareClick = () => {
    console.log('Share click - selectedRows:', selectedRows);
    // TODO: 공유 로직 구현
  };

  const customButtonNode = useMemo(
    () => (
      <Button
        variant="text"
        size="sm"
        label={t('LABEL.grid.header.toShare')}
        disabled={!buttonState.share}
        onClick={handleShareClick}
      />
    ),
    [buttonState.share],
  );

  return (
    <GridBox
      config={config}
      multiple
      showNumberingColumn
      copyButton={useMemo(
        () => ({
          disabled: !buttonState.copy,
          onClick: handleCopyClick,
        }),
        [buttonState.copy],
      )}
      onRowsSelect={onRowsSelect}
      customButtonNode={customButtonNode}
      excelButtons={
        <>
          <GridExcelUploadButton validateUrl={'/api/v1/course/validation/excel/upload'} />
          <GridExcelDownloadButton
            url={'/api/v1/course/validation/excel/export'}
            params={getValues()}
          />
        </>
      }
    />
  );
};
