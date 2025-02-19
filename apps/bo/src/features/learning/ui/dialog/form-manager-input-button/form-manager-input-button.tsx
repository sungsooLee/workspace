import { forwardRef, useEffect, useState } from 'react';
import { t } from 'i18next';

import { Button, ButtonComponentProps, Input, useModalControl } from '@learnway/ui';
import { ManagerList } from './manager-list';

export interface FormManagerInputButtonProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  button?: ButtonComponentProps;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormManagerInputButtonComponent = forwardRef<HTMLDivElement, FormManagerInputButtonProps>(
  ({ value = [], onChange: ownerOnChange, button = {}, ...props }, ref) => {
    const { open: openModal } = useModalControl();
    const [selectedManager, setSelectedManager] = useState<any>(value);

    const { variant = 'point', size = 'sm', label = t('선택') } = button;

    useEffect(() => {
      ownerOnChange?.(selectedManager);
    }, [selectedManager]);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // 모달 오픈 - 관리자 목록
      openModal(<ManagerList />, { title: '관리자 목록' }, (newOption) => {
        newOption && setSelectedManager(newOption);
      });
    };

    return (
      <div ref={ref} className={'flex flex-row items-center gap-3'}>
        <Input value={selectedManager?.name} disabled={true} />
        <Button label={label} variant={variant} size={size} onClick={handleButtonClick} />
      </div>
    );
  },
);
export const FormManagerInputButton = FormManagerInputButtonComponent;
