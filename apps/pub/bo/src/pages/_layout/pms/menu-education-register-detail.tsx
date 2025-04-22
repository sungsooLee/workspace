/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch, IcoFormRequired, IcoTrash03, IcoPpt } from '@learnway/icons';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';

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

export const Route = createFileRoute('/_layout/pms/menu-education-register-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  // 공통 팝업(이력 정보)
  const { close: closeModal } = useModal();
  const ModalHistoryInfoContent = () => {
    // 이력 구분
    const [recordSelectedValues, setRecordSelectedValues] = useState<string[]>([]);
    const recordOptions = [
      { value: 'type1', label: '전체' },
      { value: 'type2', label: '항목' },
    ];

    // grid
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const data: any[] = [
      {
        order: '1',
        record: '수정',
        name: '테넌트명1',
        owner: '김현대',
        id: '123457@hyundai.com',
        date: '2025-01-01 15:15:11',
      },
      {
        order: '2',
        record: '등록',
        name: '테넌트명1',
        owner: '김현대',
        id: '123457@hyundai.com',
        date: '2025-01-01 15:15:11',
      },
      {
        order: '3',
        record: '삭제',
        name: '테넌트명2',
        owner: '김현대',
        id: '123457@hyundai.com',
        date: '2025-01-01 15:15:11',
      },
    ];

    const columnHelper = createColumnHelper<any>();

    const columns = [
      columnHelper.accessor('order', {
        cell: (info) => info.getValue(),
        header: 'NO.',
        footer: (props) => `Total: ${props.table.getRowModel().rows.length}`,
        size: 64,
        meta: {
          headerAlign: 'left',
          cellAlign: 'center',
        },
        enableGrouping: false,
      }),
      columnHelper.accessor('record', {
        cell: (info) => info.getValue(),
        header: '이력 구분',
        enableGrouping: false,
        size: 120,
      }),
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: '테넌트명',
        size: 520,
        enableGrouping: false,
      }),
      columnHelper.accessor('owner', {
        cell: (info) => info.getValue(),
        header: '담당자',
        size: 160,
        enableGrouping: false,
      }),
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: '아이디(이메일)',
        size: 240,
        enableGrouping: false,
      }),
      columnHelper.accessor('date', {
        cell: (info) => info.getValue(),
        header: '일시',
        size: 210,
        enableGrouping: false,
      }),
    ] as ColumnDef<any, unknown>[];

    return (
      <ModalContainer>
        <ModalTitle>{'이력 정보'}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select1" className={searchStyles.label}>
                          <span className={searchStyles.text}>테넌트명</span>
                          {/* 필수 케이스 */}
                          <span className={cn(searchStyles.status, searchStyles.required)}>
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id="name-select1" type="text" placeholder="입력" />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-owner" className={searchStyles.label}>
                          <span className={searchStyles.text}>담당자</span>
                          {/* 필수 케이스 */}
                          <span className={cn(searchStyles.status, searchStyles.required)}>
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id="name-owner" type="text" placeholder="입력" />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-id" className={searchStyles.label}>
                          <span className={searchStyles.text}>아이디(이메일)</span>
                          {/* 필수 케이스 */}
                          <span className={cn(searchStyles.status, searchStyles.required)}>
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id="name-id" type="text" placeholder="입력" />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-record" className={searchStyles.label}>
                          <span className={searchStyles.text}>이력 구분</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={recordOptions}
                            value={recordSelectedValues}
                            onChange={(selected) => setRecordSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.btn_box}>
                  <Button
                    type="button"
                    className={searchStyles.btn_refresh}
                    variant="search"
                    size="sm"
                    onlyIcon
                  >
                    <IcoRefresh02 className={searchStyles.icon_refresh} />
                  </Button>
                  <Button
                    type="button"
                    variant="search"
                    size="sm"
                    className={searchStyles.btn_search}
                  >
                    <IcoSearch className={searchStyles.icon_sm_search} />
                    조회
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid_wrap line">
              <GridBox
                data={data}
                columns={columns}
                height={280}
                hideColumnSettings={true}
                pagination={{
                  pageSize,
                  pageIndex,
                  totalRows: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                title="타이틀"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };

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
