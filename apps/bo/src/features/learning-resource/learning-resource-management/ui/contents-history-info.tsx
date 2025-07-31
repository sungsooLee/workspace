import { t } from 'i18next';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { GetContentDetailRes } from '@types';

import style from '@learnway/styles/bo/assets/styles/modules/contents-history-info.module.css';
import { Button } from '@learnway/ui/button';

interface ContentsHistoryInfoComponentProp {
  type?: string;
  detail?: Partial<GetContentDetailRes>;
}

const ContentsHistoryInfoComponent = ({ type, detail }: ContentsHistoryInfoComponentProp) => {
  return (
    <div className={cn(style.start, style.wrap, 'history_info_wrap', type && style[type])}>
      <p>
        {t('최초 등록')} <span className={style.info}>{detail?.creatorName}</span>
        {detail?.createdDate && (
          <span className={style.info}>
            {getDateToString(detail.createdDate, DATE_TIME_FORMAT.DATETIME_SEC)}
          </span>
        )}
      </p>
      <p>
        {t('최종 수정')} <span className={style.info}>{detail?.modifyerName}</span>
        {detail?.modifiedDate && (
          <span className={style.info}>
            {getDateToString(detail.modifiedDate, DATE_TIME_FORMAT.DATETIME_SEC)}
          </span>
        )}
      </p>
      <Button size="xs" variant="gray2" className={style.btn_info} label={t('이력정보')} />
    </div>
  );
};

ContentsHistoryInfoComponent.displayName = 'ContentsHistoryInfo';

export const ContentsHistoryInfo = ContentsHistoryInfoComponent;
