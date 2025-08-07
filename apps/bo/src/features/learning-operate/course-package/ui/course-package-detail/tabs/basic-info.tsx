import { useCoursePackageDetailBasicInfo } from '@features/learning-operate/course-package/hooks/use-course-package-detail-basic-info';
import { CategoryChoiceModal } from '@features/learning-operate/course/course-management';
import { CODE_GROUP, S3_PATH } from '@learnway/hooks';
import { Badge } from '@learnway/ui/badge';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import {
  ChipListModalSelectorFormField,
  EditorFormField,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  RadioGroupFormField,
} from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import {
  ChipListFormField,
  DateRangePickerFormField,
  DropdownFormField,
  FormRow2,
  TenantByRoleChannelCheckboxFormField,
  TenantChannelDropdownFormField2,
  ThumbnailListFormField,
} from '@shared/ui/form';
import { UserChoiceModal, UserGroupChoiceModal, UserGroupTabsChoiceModal } from '@shared/ui/modal';
import { useTranslation } from 'react-i18next';

const BasicInfoComponent = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const { provider, getValues, onFormChange } = useCoursePackageDetailBasicInfo();

  return (
    <form>
      {/*기본정보*/}
      <FormSubTitle label={t('기본정보')} />
      {/*채널*/}
      <ContentsRow>
        {/*채널*/}
        <FormRow2
          provider={provider}
          name={'channelUuid'}
          label={t('채널')}
          validation={{ required: true, format: 'string' }}
          element={<TenantChannelDropdownFormField2 tenantId={-1} />}
        />
      </ContentsRow>
      {/*패키지 사용*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'isUsed'}
          label={t('패키지 사용')}
          format={'boolean'}
          validation={{ required: true, format: 'boolean' }}
          element={
            <RadioGroupFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['mock.options.use'],
              }}
            />
          }
        />
        {/*노출 기간*/}
        <FormRow2
          provider={provider}
          name={'exposureRange'}
          label={t('노출 기간')}
          format={'object'}
          validation={{ required: true, format: 'object' }}
          element={<DateRangePickerFormField displayType={'day-time-h'} />}
        />
      </ContentsRow>

      {/*공개대상*/}
      <FormSubTitle label={t('공개대상')} />
      {/*테넌트*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'tenantIds'}
          label={t('테넌트')}
          format={'array'}
          validation={{ required: true, format: 'array' }}
          element={<TenantByRoleChannelCheckboxFormField channelUuid={getValues().channelUuid} />}
        />
      </ContentsRow>
      {/*카테고리*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'categories'}
          label={t('카테고리')}
          format={'object'}
          validation={{ required: true, format: 'object' }}
          element={
            <ListModalSelectorFormField
              deletable
              modalConfig={() => ({
                content: <CategoryChoiceModal tenantIds={getValues().tenantIds} />,
                width: 'lg',
              })}
              transformModalData={(modalData: any[]) => {
                return modalData?.map((d: any) => ({
                  categoryId: d.id,
                  categoryPath: d.fullPath,
                }));
              }}
              listConfig={{
                checkable: true,
                deletable: true,
                disabledActive: true,
                labelField: 'categoryPath',
                valueField: 'categoryId',
                selectedNodeBeforeLabel: (
                  <Badge option={{ label: '대표', value: '' }} variant={'text'} status="fill" />
                ),
              }}
              selectedValue={getValues()?.primaryCategoryId}
              onSelected={(option: any) => onFormChange({ primaryCategoryId: option.categoryId })}
              actionNode={<Button variant="text" size="sm" label={t('추가')} />}
            />
          }
        />
      </ContentsRow>
      {/*학습대상(유저그룹)*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'targetList'}
          format={'object'}
          label={t('학습대상(유저그룹)')}
          validation={{ required: true, format: 'object' }}
          element={
            <ChipListModalSelectorFormField
              modalConfig={() => ({
                width: 'xl',
                content: (
                  <UserGroupTabsChoiceModal
                    tenantIds={getValues().tenantIds}
                    option={getValues().targetList}
                  />
                ),
              })}
              chipList={{
                labelField: 'pathValue',
                valueField: 'pathKey',
                wordwrap: true,
              }}
              showAddButton
            />
          }
          actionNode={
            <Button
              variant="text"
              label={t('대상자')}
              disabled={!getValues().targetList?.length}
              onClick={(e: any) => {
                openModal({
                  width: 'xl',
                  content: <UserGroupChoiceModal groups={getValues().targetList} />,
                });
              }}
            />
          }
        />
      </ContentsRow>

      {/*패키지소개*/}
      <FormSubTitle label={t('패키지소개')} />
      {/*언어*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'language'}
          label={t('언어')}
          validation={{ required: true, format: 'string' }}
          element={
            <DropdownFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
              }}
            />
          }
        />
      </ContentsRow>
      {/*패키지명*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'packageName'}
          label={t('패키지명')}
          validation={{ required: true, format: 'string' }}
          element={<Input maxLength={40} />}
        />
      </ContentsRow>
      {/*패키지 소개*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'description'}
          label={t('패키지 소개')}
          validation={{ required: true, format: 'string' }}
          element={<EditorFormField />}
        />
      </ContentsRow>

      {/*관리자*/}
      <FormSubTitle label={t('관리자')} />
      {/*담당자*/}
      <ContentsRow>
        {/*담당자*/}
        <FormRow2
          provider={provider}
          name={'coordinatorName'}
          label={t('담당자')}
          validation={{ required: true, format: 'string' }}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <UserChoiceModal />,
              }}
              transformModalData={(data: any) => ({
                coordinatorUuid: data.uuid,
                coordinatorName: `${data.name}/${data?.dept?.deptName}`,
                coordinatorDeptName: `${data.name}/${data?.dept?.deptName}`,
                coordinatorTelNo: data.phoneNumber,
                coordinatorEmail: data.email,
              })}
            />
          }
        />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name={'coordinatorTelNo'}
          label={t('연락처')}
          validation={{ required: true, format: 'string' }}
          element={<Input />}
        />
        {/*이메일*/}
        <FormRow2
          provider={provider}
          name={'coordinatorEmail'}
          label={t('이메일')}
          validation={{ required: true, format: 'string' }}
          element={<Input />}
        />
        {/*담당자 ID - hidden */}
        <FormRow2 provider={provider} name={'coordinatorId'} type={'hidden'} value={''} />
      </ContentsRow>
      {/*운영자*/}
      <ContentsRow>
        {/*운영자*/}
        <FormRow2
          provider={provider}
          name={'operatorName'}
          label={t('운영자')}
          validation={{ required: true, format: 'string' }}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <UserChoiceModal />,
              }}
              transformModalData={(data: any) => ({
                operatorUuid: data.uuid,
                operatorName: `${data.name}/${data?.dept?.deptName}`,
                operatorDeptName: `${data.name}/${data?.dept?.deptName}`,
                operatorTelNo: data.phoneNumber,
                operatorEmail: data.email,
              })}
            />
          }
        />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name={'operatorTelNo'}
          label={t('연락처')}
          validation={{ required: true, format: 'string' }}
          element={<Input />}
        />
        {/*이메일*/}
        <FormRow2
          provider={provider}
          name={'operatorEmail'}
          label={t('이메일')}
          validation={{ required: true, format: 'string' }}
          element={<Input />}
        />
        {/*운영자 ID - hidden */}
        <FormRow2 provider={provider} name={'operatorId'} type={'hidden'} value={''} />
      </ContentsRow>

      {/*게시*/}
      <FormSubTitle label={t('게시')} />
      {/*썸네일*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'thumbnailFileGroupUuid'}
          label={t('대표 이미지')}
          format={'string'}
          validation={{ required: true, format: 'string' }}
          element={
            <ThumbnailListFormField
              uuidType={'group'}
              showDefault={getValues()?.courseType}
              uploadConfig={{
                affairType: 'LMS',
                s3Path: S3_PATH['upload/course/thumbnail'],
              }}
              selected={getValues()?.primaryThumbnailFileUuid}
              onSelected={(selectedThumbnail1: string) =>
                onFormChange({ primaryThumbnailFileUuid: selectedThumbnail1 })
              }
            />
          }
        />
      </ContentsRow>
      {/*태그*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'tagNames'}
          label={t('태그')}
          format={'array'}
          validation={{ required: true, format: 'array' }}
          element={
            <ChipListFormField
              chipListConfig={{
                showInput: true,
                labelField: 'tagName',
                valueField: 'tagId',
                wordwrap: true,
              }}
            />
          }
        />
      </ContentsRow>
    </form>
  );
};

export const BasicInfo = BasicInfoComponent;
