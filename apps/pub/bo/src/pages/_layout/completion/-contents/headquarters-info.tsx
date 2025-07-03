/* eslint-disable @nx/enforce-module-boundaries */
import { FC } from 'react';
import { forwardRef, useState } from 'react';
import { cn } from '@learnway/shared';
import {
  ContentsRow,
  Button,
  RadioGroupFormField,
  Input,
  Textarea,
  ChipListModalSelectorFormField,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  GridBox,
} from '@learnway/ui';
import { IcoMinus } from '@learnway/icons';
import { IcoFormRequired } from '@learnway/icons';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui';

/* style */
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

const HeadquartersInfoComponent: FC<{}> = ({}) => {
  const getMockData = () => {
    return {
      data: Array(5)
        .fill(null)
        .map((d, i) => ({ id: `id${i}`, name: `manager${i}` })),
    };
  };
  const TestModal = forwardRef<HTMLDivElement, any>(({ ...props }, ref) => {
    const { close } = useModal();
    const { data: gridData }: any = getMockData();
    const [option, setOption] = useState<{ value: string; label: string }>();

    const columns = [{ header: '운영자', accessorKey: 'name' }];

    const handleRowSelect = (row: any) => {
      setOption({
        value: row.id,
        label: row.name,
      });
    };

    const handleOnClose = () => {
      close({
        id: '',
        name: '',
      });
    };
    const handleOnConfirm = () => {
      if (!option) return;
      close({ id: option.value, name: option.label });
    };

    return (
      <ModalContainer>
        <ModalTitle>{'타이틀'}</ModalTitle>
        <ModalBody>
          <div>
            <GridBox
              title={'목록'}
              data={gridData}
              columns={columns}
              onRowSelect={handleRowSelect}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button
            type={'button'}
            label={'확인'}
            variant={'primary'}
            size={'lg'}
            onClick={handleOnConfirm}
          />
        </ModalFooter>
      </ModalContainer>
    );
  });
  return (
    <>
      <FormSubTitle
        label={'본부 정보'}
        actionNode={
          <>
            <Button variant={'text'} size={'sm'} label={'초기화'} disabled />
            <Button
              variant={'text'}
              size={'sm'}
              label={'삭제'}
              icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
              disabled
            />
            <Button variant={'save'} size={'sm'} label={'저장'} disabled />
          </>
        }
        lineType={'dark'}
      />
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name01" className={formStyles.form_label}>
            <span className={formStyles.form_text}>회사</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <RadioGroupFormField
              options={[
                { value: 'option01', label: '현대자동차' },
                { value: 'option02', label: '기아자동차' },
                { value: 'option03', label: '총괄' },
              ]}
              disabled
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name02" className={formStyles.form_label}>
            <span className={formStyles.form_text}>본부명</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input id={'name02'} type={'text'} placeholder={'입력'} value={''} disabled />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name03" className={formStyles.form_label}>
            <span className={formStyles.form_text}>코스트 센터</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input id={'name03'} type={'text'} placeholder={'입력'} value={''} disabled />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name04" className={formStyles.form_label}>
            <span className={formStyles.form_text}>설명</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Textarea
              id={'name04'}
              rows={5}
              cols={5}
              resize={'none'}
              placeholder={'입력'}
              size="sm"
              disabled
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name05 " className={formStyles.form_label}>
            <span className={formStyles.form_text}>품의시 재경협조처</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'name',
                hideBorder: true,
                wordwrap: true,
              }}
              modalConfig={{
                content: <TestModal />,
              }}
              showAddButton
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name06" className={formStyles.form_label}>
            <span className={formStyles.form_text}>활성화 여부</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <RadioGroupFormField
              options={[
                { value: 'option01', label: '활성화' },
                { value: 'option02', label: '비활성화' },
              ]}
              disabled
            />
          </div>
        </div>
      </ContentsRow>
    </>
  );
};

HeadquartersInfoComponent.displayName = 'HeadquartersInfo';
export const HeadquartersInfo = HeadquartersInfoComponent;
