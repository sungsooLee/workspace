import { t } from 'i18next';
import { memo } from 'react';
import { Button } from '@learnway/ui/button';

const CopyBatchButtons = memo(
  ({
    disabledCopy,
    disabledBatch,
    onCopyRow,
    onBatch }: {
    disabledCopy: boolean;
    disabledBatch: boolean;
    onCopyRow: () => void;
    onBatch: () => void;
  }) => {
    return (
      <>
        <Button
          variant="text"
          size="xs"
          label={t('LABEL.grid.header.copy', '복사')}
          disabled={disabledCopy}
          onClick={onCopyRow}
        />
        <Button variant="text" label={t('일괄설정')} disabled={disabledBatch} onClick={onBatch} />
      </>
    );
  },
);

export { CopyBatchButtons };
