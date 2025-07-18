import { cn, DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import { Button } from '@learnway/ui';
import style from '@learnway/styles/bo/assets/styles/modules/contents-history-info.module.css';
import { t } from 'i18next';
import { DynamicFormProvider } from '@learnway/hooks';
import { FieldValues, UseFormWatch } from 'react-hook-form';

interface ContentsHistoryInfoFormFieldComponentProp {
  provider?: DynamicFormProvider; // dynamic form provider가 필요합니다.
  type?: string;
}

const ContentsHistoryInfoFormFieldComponent = ({
  provider = {
    watch: ((name: string) => 'provider missed') as UseFormWatch<FieldValues>,
  } as DynamicFormProvider,
  type, // column
}: ContentsHistoryInfoFormFieldComponentProp) => {
  const { watch } = provider;
  const creatorName = watch('creatorName');
  const createdDate = watch('createdDate');
  const modifyerName = watch('modifyerName');
  const modifiedDate = watch('modifiedDate');
  return (
    <div className={cn(style.start, style.wrap, 'history_info_wrap', type && style[type])}>
      <p>
        {t('최초 등록')} <span className={style.info}>{creatorName}</span>
        <span className={style.info}>{formatDate(createdDate, DATE_TIME_FORMAT.DATETIME_SEC)}</span>
      </p>
      <p>
        {t('최종 수정')} <span className={style.info}>{modifyerName}</span>
        <span className={style.info}>
          {formatDate(modifiedDate, DATE_TIME_FORMAT.DATETIME_SEC)}
        </span>
      </p>
      <Button size="xs" variant="gray2" className={style.btn_info}>
        {t('이력정보')}
      </Button>
    </div>
  );
};

export const ContentsHistoryInfoFormField = ContentsHistoryInfoFormFieldComponent;
