import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import style from '@learnway/styles/bo/assets/styles/modules/contents-history-info.module.css';

interface ContentsHistoryInfoFormFieldComponentProp {
  type?: string;
}

const ContentsHistoryInfoFormFieldComponent = ({
  type = 'column',
}: ContentsHistoryInfoFormFieldComponentProp) => {
  return (
    <div className={cn(style.start, style.wrap, type && style[type])}>
      <p>
        {'최초 등록'} <span className={style.info}>{'홍길동'}</span>
        <span className={style.info}>{'2025-02-18 15:00:22'}</span>
      </p>
      <p>
        {'최종 수정'} <span className={style.info}>{'김현대'}</span>
        <span className={style.info}>{'2025-02-18 15:00:22'}</span>
      </p>
      <Button size="xs" variant="gray2" className={style.btn_info}>
        {'이력정보'}
      </Button>
    </div>
  );
};

export const ContentsHistoryInfoFormField = ContentsHistoryInfoFormFieldComponent;
