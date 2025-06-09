import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  ModalTitle,
  ContentsRow,
  RadioGroupFormField,
  Input,
  DatePicker,
  TableBox,
  Dropdown,
  Switch,
} from '@learnway/ui';
import { IcoFormRequired } from '@learnway/icons';

/** style */
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

export const Route = createFileRoute('/_layout/pms/popup-login-option')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const Contents = () => {
    const columnHelper = createColumnHelper<any>();
    const [selectedValues, setSelectedValues] = useState<null>(null);
    const options = [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
      { value: 'option4', label: '옵션 4' },
      { value: 'option5', label: '옵션 5' },
      { value: 'option6', label: '옵션 6' },
      { value: 'option7', label: '옵션 7' },
    ];
    // thead : 'value'
    const data: any[] = [
      {
        day: (
          <Dropdown
            options={options}
            value={selectedValues}
            onChange={(selected) => setSelectedValues(selected)}
            placeholder="선택"
          />
        ),
        loginLimit: (
          <div className="select_date_wrap">
            <DatePicker displayType={'time'} size={'md'} />
            <span className="dash"></span>
            <DatePicker displayType={'time'} size={'md'} />
          </div>
        ),
        uasAble: <Switch id="switch01" />,
      },
      {
        day: (
          <Dropdown
            options={options}
            value={selectedValues}
            onChange={(selected) => setSelectedValues(selected)}
            placeholder="선택"
          />
        ),
        loginLimit: (
          <div className="select_date_wrap">
            <DatePicker displayType={'time'} size={'md'} />
            <span className="dash"></span>
            <DatePicker displayType={'time'} size={'md'} />
          </div>
        ),
        uasAble: <Switch id="switch02" />,
      },
      {
        day: (
          <Dropdown
            options={options}
            value={selectedValues}
            onChange={(selected) => setSelectedValues(selected)}
            placeholder="선택"
          />
        ),
        loginLimit: (
          <div className="select_date_wrap">
            <DatePicker displayType={'time'} size={'md'} />
            <span className="dash"></span>
            <DatePicker displayType={'time'} size={'md'} />
          </div>
        ),
        uasAble: <Switch id="switch03" />,
      },
    ];

    // Thead 정의
    const columns = [
      columnHelper.accessor('day', {
        cell: (info) => info.getValue(),
        header: '요일',
        meta: {
          size: 'auto',
          headerAlign: 'center',
          cellAlign: 'center',
        },
      }),
      columnHelper.accessor('loginLimit', {
        cell: (info) => info.getValue(),
        header: '로그인 제한 시간',
        size: 557,
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      }),
      columnHelper.accessor('uasAble', {
        cell: (info) => info.getValue(),
        header: '사용여부',
        meta: {
          size: 'auto',
          headerAlign: 'center',
          cellAlign: 'center',
        },
      }),
    ] as ColumnDef<any, unknown>[];
    return (
      <ModalContainer>
        <ModalTitle>{'로그인 제한 시간 설정'}</ModalTitle>
        <ModalBody>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menu" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'로그인 제한 구분'}</span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.radio_wrap}>
                  <RadioGroupFormField
                    options={[
                      { value: 'a', label: '근무 시간 외 로그인 제한' },
                      { value: 'b', label: '근무시간 내 로그인 제한' },
                      { value: 'c', label: '제한 없음' },
                    ]}
                  />
                </div>
              </div>
              <p className={cn(formStyles.guide_text)}>
                {
                  '사용자가 학습자 사이트에 로그인 가능한 시간을 설정할 수 있으며, 로그인 가능 시간 경과 시 자동 로그아웃됩니다. '
                }
              </p>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menu2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'로그인 제한명'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} placeholder={'입력'} value={''} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menu3" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'기간 선택'}</span>
              </label>
              <div className={formStyles.input_box}>
                <DatePicker displayType={'day'} size={'md'} placeholder={'0000-00-00'} />
                <span className={formStyles.dash}></span>
                <DatePicker displayType={'day'} size={'md'} placeholder={'0000-00-00'} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menu" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'로그인 제한 설정 방식'}</span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.radio_wrap}>
                  <RadioGroupFormField
                    options={[
                      { value: 'a', label: '시간 설정' },
                      { value: 'b', label: '근태 정보 연동' },
                    ]}
                    disabled
                    defaultValue={'a'}
                  />
                </div>
              </div>
              <p className={cn(formStyles.guide_text)}>
                {
                  '근태 정보 연동 선택 시 각 사용자별 근태 정보를 기준으로 로그인 제한이 설정됩니다. '
                }
              </p>
            </div>
          </ContentsRow>
          <TableBox
            data={data}
            columns={columns}
            tableMode={true}
            showSelectedCount={false}
            multiple
            title={'요일 및 시간 제한 설정'}
          />
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <Contents />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>Hello "/_layout/pms/popup-login-option"!</div>;
}
