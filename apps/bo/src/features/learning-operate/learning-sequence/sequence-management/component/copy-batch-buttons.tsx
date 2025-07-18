import { Button } from '@learnway/ui';
import { t } from 'i18next';
import { memo } from 'react';

const CopyBatchButtons = memo(
  ({
    disabled,
    onCopyRow,
    onBatch,
  }: {
    disabled: boolean;
    onCopyRow: () => void;
    onBatch: () => void;
  }) => {
    return (
      <>
        <Button
          variant="text"
          size="xs"
          label={t('LABEL.grid.header.copy', '복사')}
          disabled={disabled}
          onClick={onCopyRow}
        />
        <Button variant="text" label={t('일괄설정')} disabled={disabled} onClick={onBatch} />
      </>
    );
  },
);

export { CopyBatchButtons };
