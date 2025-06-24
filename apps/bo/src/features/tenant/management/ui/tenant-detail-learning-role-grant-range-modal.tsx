import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';

/* style */
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form module css
import popLayoutstyles from '@learnway/styles/bo/assets/styles/modules/popup-layout.module.css';
import dataInfostyles from '@learnway/styles/bo/assets/styles/modules/data-info.module.css';
import selectMenuStyles from '@learnway/styles/bo/assets/styles/modules/select-menu.module.css';

import {
  Button,
  ContentsRow,
  DatePicker,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Switch,
  Tooltip,
  useModal,
} from '@learnway/ui';
import { IcoAlertCircle, IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import { FormRow, FormSubTitle } from '@shared/ui';
import { DateRangeFormField } from '@shared/ui/search-box';
import { useSaveUsers } from '@entities/role/service/role-manage.hook';

/**
 * 화면번호: NLP_BO_PMS_1111 (데이터접근범위 일괄적용)
 * @returns
 */
const TenantDetailLearningRoleGrantRangeModalComponent = ({
  roleId,
  userList,
}: {
  roleId: number;
  userList: any[];
}) => {
  const { close: closeModal } = useModal();

  const formRef = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState(t('역할 사용 여부'));
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // switch : 사용기한
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);

  const { saveUsersRole: saveRoleUsers } = useSaveUsers({});

  const handleOnSubmit = async (data: any) => {
    const { isUsed, dateRange } = getValues();

    const addUsers = userList.map((item) => ({
      userUuid: item.userUuid,
      startDate: activeIndex === 1 ? dateRange.from : item.startDate,
      endDate: activeIndex === 1 ? dateRange.to : item.endDate,
      isUsed: activeIndex === 0 ? isUsed : item.isUsed,
    }));

    const payload = { roleId: roleId, body: { addUserUuids: addUsers } };
    console.log('getValues----', payload, userList);
    const result = await new Promise((resolve) => {
      saveRoleUsers(payload, { onSuccess: resolve });
    });

    console.log('getValues', result);
    closeModal();
  };

  const handleSelectClick = (index: number) => {
    onFormChange({ activeIndex: index });
    setActiveIndex(index);
    setTitle(items[index]);
  };

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <ModalContainer>
      <ModalTitle>{'일괄적용'}</ModalTitle>
      <ModalBody>
        <div className={cn(popLayoutstyles.start, popLayoutstyles.wrap)}>
          <div className={popLayoutstyles.contents}>
            <div className={popLayoutstyles.left_contents}>
              <FormSubTitle label={t('역할 일괄 적용')} lineType={'light'} />
              <div className={dataInfostyles.start}>
                <div className={dataInfostyles.title_box}>
                  <strong className={dataInfostyles.title}>{t('일괄적용 대상')}</strong>
                  <span className={dataInfostyles.num}>{userList.length}</span>
                  <span className={dataInfostyles.unit}>{t('건')}</span>
                  <span className={dataInfostyles.icon_area}>
                    <IcoFormRequired className={dataInfostyles.icon_required} />
                  </span>
                  <Tooltip
                    className={formStyles.tooltip}
                    side="bottom"
                    align="start"
                    content={t('툴팁 내용입니다.')}
                  >
                    <Button onlyIcon>
                      <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                    </Button>
                  </Tooltip>
                </div>
                <p className={dataInfostyles.text}>
                  {t('선택한 항목의 정보를 일괄 수정할 수 있습니다.')}
                </p>
                <p className={dataInfostyles.text}>
                  {t('일괄적용할 항목을 선택한 후 우측에 적용할 내용을 입력하세요.')}
                </p>
              </div>
              <div className={selectMenuStyles.start}>
                <p className={selectMenuStyles.title}>{t('일괄적용 항목선택')}</p>
                <ul className={selectMenuStyles.list}>
                  {items.map((label, index) => (
                    <li
                      key={index}
                      className={cn(index === activeIndex && selectMenuStyles.active)}
                    >
                      <span className={selectMenuStyles.menu}>{label}</span>
                      <Button
                        label={t('선택')}
                        size="ts"
                        variant={index === activeIndex ? 'primary' : 'gray'}
                        className={selectMenuStyles.button}
                        onClick={() => handleSelectClick(index)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={popLayoutstyles.main_contents}>
              <FormSubTitle
                label={title}
                lineType={'light'}
                titleNode={
                  <>
                    <strong className="tit">{t('전체')}</strong>
                    <span className="num">{userList.length}</span>
                  </>
                }
              />
              <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)} style={{ marginTop: '20px' }}>
                {activeIndex === 0 && (
                  <ContentsRow type={'horizontal'}>
                    <FormRow provider={provider} name="isUsed" />
                  </ContentsRow>
                )}
                {activeIndex === 1 && (
                  <ContentsRow>
                    <FormRow
                      provider={provider}
                      name="dateRange"
                      element={<DateRangeFormField />}
                    />
                  </ContentsRow>
                )}
              </form>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button
          label={'적용'}
          variant={'primary'}
          size={'lg'}
          onClick={() => {
            const form = formRef.current;
            if (form) {
              form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
          }}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantDetailLearningRoleGrantRangeModal =
  TenantDetailLearningRoleGrantRangeModalComponent;

const items = [t('역할 사용 여부'), t('역할 시작일/종료일')];

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'activeIndex',
      type: 'hidden',
      label: '',
      value: 0,
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('역할 사용 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'dateRange',
      type: 'date-range',
      label: t('역할 부여 기간'),
      format: 'object',
      value: { from: undefined, to: undefined },
      placeholder: '',
      maxLength: 150,
    },
  ],
  validator: {
    isUsed: true,
    dateRange: {
      required: {
        fn: (values) => {
          console.log('required', values);
          return values.activeIndex === 1;
        },
      },
      conditions: [
        {
          fn: (values) => values.activeIndex === 1 && !values.dateRange?.from,
          message: t('시작 및 종료 날짜를 선택하세요'),
        },
        {
          fn: (values) => values.activeIndex === 1 && !values.dateRange?.from,
          message: t('시작 날짜를 선택하세요'),
        },
        {
          fn: (values) => values.activeIndex === 1 && !values.dateRange?.to,
          message: t('종료 날짜를 선택하세요.'),
        },
        {
          fn: (values) => values.activeIndex === 1 && values.dateRange.from > values.dateRange.to,
          message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
        },
      ],
    },
  },
};
