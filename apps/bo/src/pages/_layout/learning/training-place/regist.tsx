import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch, IcoFormRequired, IcoTrash03, IcoPpt } from '@learnway/icons';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { FormSubTitle } from '@shared/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import fileUploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드

import {
  Button,
  Input,
  Dropdown,
  ContentsRow,
  InputModalSelectorFormField,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  GridBox,
  Textarea,
  RadioGroupFormField,
} from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export const Route = createFileRoute('/_layout/learning/training-place/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <FormSubTitle label={'교육장소 정보 '} />
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-sort" className={formStyles.form_label}>
                <span className={formStyles.form_text}>구분</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                {/* 50% 만 적용인 경우 */}
                <div className={dynamicFormStyles.w_half}>
                  <Dropdown
                    options={options}
                    value={selectedValues}
                    onChange={(selected) => setSelectedValues(selected)}
                    variant="default"
                    size={'sm'}
                    placeholder="선택"
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-locationCode" className={formStyles.form_label}>
                <span className={formStyles.form_text}>장소 코드</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name-locationCode" type="text" placeholder="입력" />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-locationName" className={formStyles.form_label}>
                <span className={formStyles.form_text}>장소 명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name-locationName" type="text" placeholder="입력" />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-tenantName" className={formStyles.form_label}>
                <span className={formStyles.form_text}>테넌트 명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <InputModalSelectorFormField
                  modalConfig={{
                    width: 'xl',
                    content: <ModalHistoryInfoContent />,
                  }}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-map" className={formStyles.form_label}>
                <span className={formStyles.form_text}>약도 이미지 첨부</span>
              </label>
              <div className={formStyles.input_box}>
                <div className={cn(fileUploadStyles.start, fileUploadStyles.wrap)}>
                  {/* 첨부 전 */}
                  <div className={fileUploadStyles.upload_single}>
                    <div className={fileUploadStyles.view_file}>
                      <div className={fileUploadStyles.attach_area}>
                        <p className={fileUploadStyles.text}>버튼 클릭 후 파일을 첨부하세요.</p>
                      </div>
                    </div>
                    <Button className={fileUploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                      <input type="file" className={fileUploadStyles.input_file} />
                      {'파일첨부'}
                    </Button>
                  </div>
                  <div className={fileUploadStyles.upload_single}>
                    <div className={fileUploadStyles.view_file}>
                      <div className={fileUploadStyles.attach_area}>
                        <p className={fileUploadStyles.attach_view}>
                          <IcoPpt
                            width={'20'}
                            height={'21'}
                            className={fileUploadStyles.icon_type}
                          />
                          <span className={fileUploadStyles.attached_name}>{'파일명.png'}</span>
                        </p>
                        <Button className={fileUploadStyles.btn_clear} onlyIcon>
                          <IcoTrash03 width={20} height={20} stroke="#131C30" />
                        </Button>
                      </div>
                    </div>
                    <Button className={fileUploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                      <input type="file" className={fileUploadStyles.input_file} />
                      {'파일첨부'}
                    </Button>
                  </div>
                </div>
              </div>
              <p className={cn(formStyles.guide_text)}>
                {
                  '※ 첨부파일은 png, jpg, gif 형식만 업로드 가능하며, 이미지 사이즈는 500 X 500으로 업로드해 주세요.'
                }
              </p>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-address" className={formStyles.form_label}>
                <span className={formStyles.form_text}>링크 주소</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-address"
                  type="text"
                  placeholder="http:// 또는 https:// 전체 URL을 입력하세요."
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-note" className={formStyles.form_label}>
                <span className={formStyles.form_text}>비고</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-note"
                  rows={5}
                  cols={33}
                  resize="none"
                  placeholder="비고 내용을 입력하세요."
                  size="sm"
                  maxLength={2000}
                  className={formStyles.textarea}
                />
              </div>
              <p className={cn(formStyles.guide_text)}>{'※ 사용자에게 노출되지 않습니다.'}</p>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-reservation" className={formStyles.form_label}>
                <span className={formStyles.form_text}>예약 가능</span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.radio_wrap}>
                  <RadioGroupFormField
                    options={[
                      { value: 'y', label: '예약 가능' },
                      { value: 'n', label: '예약 불가' },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor="name-use" className={formStyles.form_label}>
                <span className={formStyles.form_text}>사용 가능</span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.radio_wrap}>
                  <RadioGroupFormField
                    options={[
                      { value: 'y', label: '사용 가능' },
                      { value: 'n', label: '사용 불가' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsHistoryInfoFormField />
        </div>
      </PageContainer>
    </form>
  );
}
