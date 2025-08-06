import { S3UploaderConfig } from '@learnway/hooks';
import { SingleAttachmentFormField } from '@shared/ui/form';
import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface AttachmentFormFieldProps {
  uploadConfig: S3UploaderConfig;
  showGuidText?: boolean;
}

interface EditSinglAttachmentCellProps<T> {
  info: CellContext<T, string>;
  singleAttahment: AttachmentFormFieldProps;
  /** 사용하는 곳에서 직접 자료 설정 할떄 사용 */
}

const EditSingleAttachmentCell = <T,>({
  info,
  singleAttahment,
}: EditSinglAttachmentCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<string>(getValue());

  const handleCheckedChange = (newValue: string) => {
    table.options.meta?.updateData(row.index, cell.column.id, newValue);
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return (
    <SingleAttachmentFormField {...singleAttahment} value={value} onChange={handleCheckedChange} />
  );
};

export { EditSingleAttachmentCell };
