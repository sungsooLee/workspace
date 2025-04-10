import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { cn } from '@learnway/shared';
import { useTranslation } from 'react-i18next';
import { IcoFormRequired, IcoAlertCircle, IcoRefresh02, IcoSearch } from '@learnway/icons';
import {
  ContentsRow,
  Input,
  Textarea,
  CheckboxGroupFormField,
  Tooltip,
  Button,
  Switch,
  ThumbnailImageUpload,
  ImageOption,
  ChipListModalSelectorFormField,
  useModal,
  ModalTitle,
  ModalContainer,
  ModalBody,
  ModalFooter,
  Dropdown,
  Grid,
  TransferGrid,
} from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

/* image */
import selectedImg from '../../../assets/images/thumb/img_thumb_hyundai.jpg';

export const Route = createFileRoute('/_layout/pms/menu-tenant-platform-management-registration')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  // switch
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  const { close: closeModal } = useModal();
  const columnHelper = createColumnHelper<any>();
  // 회사 조회 팝업 (공통)
  const ModalCompanySearchContent = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
    const options = [
      { value: 'type1-1', label: '전체' },
      { value: 'type1-2', label: '항목' },
    ];
    const options2 = [
      { value: 'type2-1', label: '전체' },
      { value: 'type2-2', label: '항목' },
    ];

    // grid
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const data: any[] = [
      {
        order: '1',
        companySort: '그룹사',
        company: '현대차',
        owner: '김현대',
        registerNumber: '123-45-12345',
        callNumber: '+82 2 1234-4567',
        email: 'asdfged@gmail.com',
      },
      {
        order: '2',
        companySort: '그룹사',
        company: '현대차',
        owner: '김현대',
        registerNumber: '123-45-12345',
        callNumber: '+82 2 1234-4567',
        email: 'asdfged@gmail.com',
      },
    ];

    const columns = [
      columnHelper.accessor('order', {
        cell: (info) => info.getValue(),
        header: 'NO.',
        size: 64,
        meta: {
          headerAlign: 'left',
          cellAlign: 'center',
        },
        enableGrouping: false,
      }),
      columnHelper.accessor('companySort', {
        cell: (info) => info.getValue(),
        header: '회사구분',
        enableGrouping: false,
        size: 210,
      }),
      columnHelper.accessor('company', {
        cell: (info) => info.getValue(),
        header: '회사',
        size: 240,
        enableGrouping: false,
      }),
      columnHelper.accessor('owner', {
        cell: (info) => info.getValue(),
        header: '대표자',
        size: 150,
        enableGrouping: false,
      }),
      columnHelper.accessor('registerNumber', {
        cell: (info) => info.getValue(),
        header: '사업자 등록번호',
        size: 220,
        enableGrouping: false,
      }),
      columnHelper.accessor('callNumber', {
        cell: (info) => info.getValue(),
        header: '대표 전화',
        size: 220,
        enableGrouping: false,
      }),
      columnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: '대표 이메일',
        size: 240,
        enableGrouping: false,
      }),
    ] as ColumnDef<any, unknown>[];

    return (
      <ModalContainer>
        <ModalTitle>회사 조회</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select1" className={searchStyles.label}>
                          <span className={searchStyles.text}>회사구분</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => setSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select2" className={searchStyles.label}>
                          <span className={searchStyles.text}>회사</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options2}
                            value={selectedValues2}
                            onChange={(selected) => setSelectedValues2(selected)}
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
            <div className={popupStyles.container}>
              {/* Grid Case */}
              <Grid
                data={data}
                columns={columns}
                height={380}
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
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };

  // HRD 담당자 역할 조회 팝업 (공통)
  const ModalOwnerSearchContent = () => {
    const [selectedValues3, setSelectedValues3] = useState<string[]>([]);
    const [selectedValues4, setSelectedValues4] = useState<string[]>([]);
    const [selectedValues5, setSelectedValues5] = useState<string[]>([]);
    const [selectedValues6, setSelectedValues6] = useState<string[]>([]);
    const options3 = [
      { value: 'type3-1', label: '전체' },
      { value: 'type3-2', label: '항목' },
    ];
    const options4 = [
      { value: 'type4-1', label: '전체' },
      { value: 'type4-2', label: '항목' },
    ];
    const options5 = [
      { value: 'type5-1', label: '전체' },
      { value: 'type5-2', label: '항목' },
    ];
    const options6 = [
      { value: 'type5-1', label: '전체' },
      { value: 'type5-2', label: '항목' },
    ];

    // grid
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const data: any[] = [
      {
        tenantName: '테넌트A',
        channelName: '내 관리 채널명',
        company: '현대자동차',
        affiliation: '경영지원팀',
        hrdOwner: '테넌트 담당자',
        companyNumber: '1234567',
        name: '김현대',
        roleTerm: '2025-01-03 ~ 2025-01-03',
        tenure: '재직',
        roleStatus: '정상',
      },
    ];

    const columnHelper = createColumnHelper<any>();

    const columns = [
      columnHelper.accessor('tenantName', {
        cell: (info) => info.getValue(),
        header: '테넌트명',
        enableGrouping: false,
        size: 180,
      }),
      columnHelper.accessor('channelName', {
        cell: (info) => info.getValue(),
        header: '채널명',
        size: 150,
        enableGrouping: false,
      }),
      columnHelper.accessor('company', {
        cell: (info) => info.getValue(),
        header: '회사',
        size: 150,
        enableGrouping: false,
      }),
      columnHelper.accessor('affiliation', {
        cell: (info) => info.getValue(),
        header: '소속',
        size: 100,
        enableGrouping: false,
      }),
      columnHelper.accessor('hrdOwner', {
        cell: (info) => info.getValue(),
        header: 'HRD 담당자 역할',
        size: 130,
        enableGrouping: false,
      }),
      columnHelper.accessor('companyNumber', {
        cell: (info) => info.getValue(),
        header: '사번',
        size: 100,
        enableGrouping: false,
      }),
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: '이름',
        size: 100,
        enableGrouping: false,
      }),
      columnHelper.accessor('roleTerm', {
        cell: (info) => info.getValue(),
        header: '역할 기간',
        size: 200,
        enableGrouping: false,
      }),
      columnHelper.accessor('tenure', {
        cell: (info) => info.getValue(),
        header: '재직여부',
        size: 100,
        enableGrouping: false,
      }),
      columnHelper.accessor('roleStatus', {
        cell: (info) => info.getValue(),
        header: '역할 상태',
        size: 100,
        enableGrouping: false,
      }),
    ] as ColumnDef<any, unknown>[];

    return (
      <ModalContainer>
        <ModalTitle>HRD 담당자 역할 조회</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-tenantName" className={searchStyles.label}>
                          <span className={searchStyles.text}>테넌트명</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options3}
                            value={selectedValues3}
                            onChange={(selected) => setSelectedValues3(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select2" className={searchStyles.label}>
                          <span className={searchStyles.text}>회사명</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options4}
                            value={selectedValues4}
                            onChange={(selected) => setSelectedValues4(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-ownerRole" className={searchStyles.label}>
                          <span className={searchStyles.text}>관리자 역할</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options5}
                            value={selectedValues5}
                            onChange={(selected) => setSelectedValues5(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name" className={searchStyles.label}>
                          <span className={searchStyles.text}>이름</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input
                            id="name"
                            type="text"
                            placeholder="이름을 입력하세요."
                            className={formStyles.input}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-companyNum" className={searchStyles.label}>
                          <span className={searchStyles.text}>사번</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input
                            id="name-companyNum"
                            type="text"
                            placeholder="사번을 입력하세요."
                            className={formStyles.input}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-roleStatus" className={searchStyles.label}>
                          <span className={searchStyles.text}>역할 상태</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options6}
                            value={selectedValues6}
                            onChange={(selected) => setSelectedValues6(selected)}
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
            <div className={popupStyles.container}>
              <Grid
                data={data}
                columns={columns}
                height={310}
                hideColumnSettings={true}
                pagination={{
                  pageSize,
                  pageIndex,
                  totalRows: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                multiple
                hideRowSelectionCheckBox={false}
                title="타이틀"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'적용'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };

  return (
    <PageContainer>
      {/* main_contents */}
      <div className={cn(styles.main_contents)}>
        <div className="title_wrap">
          <strong className="title">{'기본 정보'}</strong>
        </div>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-tenantName" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{t('테넌트명')}</span>
              {/* 필수 케이스 */}
              <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-tenantName"
                type="text"
                placeholder="입력"
                className={formStyles.input}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-tenantLog" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'테넌트 로그(Size : 000x000)'}</span>
              {/* 필수 케이스 */}
              <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <ThumbnailImageUpload
                options={[{ id: '1', path: selectedImg }]}
                onChange={(options: ImageOption[]) => console.log('onChange', options)}
                onCheckedChange={(options: ImageOption[]) =>
                  console.log('onCheckedChange', options)
                }
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-owner" className={formStyles.form_label}>
              <span className={formStyles.form_text}>테넌트 담당자</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <ChipListModalSelectorFormField
                modalConfig={{ width: 'xl', content: <ModalOwnerSearchContent /> }}
                chipList={{
                  labelField: 'name',
                  valueField: 'value',
                  hideBorder: true,
                }}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-tag" className={formStyles.form_label}>
              <span className={formStyles.form_text}>테넌트 정산 태그</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-tag"
                type="text"
                placeholder="입력"
                className={formStyles.input}
                maxLength={150}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-companySelect" className={formStyles.form_label}>
              <span className={formStyles.form_text}>회사 선택</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={
                  '테넌트 소속 회사를 여러개 선택할 수 있습니다. 회사가 여러 개인 경우 회사별로 개별 설정이 필요합니다. '
                }
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                </Button>
              </Tooltip>
            </label>
            <div className={formStyles.input_box}>
              <ChipListModalSelectorFormField
                modalConfig={{ width: 'xl', content: <ModalCompanySearchContent /> }}
                chipList={{
                  labelField: 'name',
                  valueField: 'value',
                  hideBorder: true,
                }}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow type="horizontal">
          <div className={formStyles.form_item}>
            <label htmlFor="name-toggle01" className={formStyles.form_label}>
              <span className={formStyles.form_text}>사용 여부</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={
                  '테넌트 사용이 ON이면 학습자 사이트에 로그인 할 수 있으며, OFF이면 로그인 할 수 없습니다.'
                }
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                </Button>
              </Tooltip>
            </label>
            <div className={formStyles.input_box}>
              <Switch
                id="name-use"
                className={dynamicFormStyles.btn_switch}
                label={checked[1] ? '사용' : '미사용'}
                checked={checked[1]}
                onCheckedChange={handleCheckedChange(1)}
              />
            </div>
            <p className={formStyles.guide_text}>
              테넌트 사용 여부를 설정할 수 {checked[1] ? ' 있습니다.' : ' 없습니다.'}
            </p>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-auto" className={formStyles.form_label}>
              <span className={formStyles.form_text}>설명</span>
            </label>
            <div className={formStyles.input_box}>
              <Textarea
                id="name-auto"
                rows={5}
                cols={33}
                placeholder="설명을 입력해 주세요."
                resize="none"
                size="md"
                maxLength={2000}
              />
            </div>
          </div>
        </ContentsRow>
        <div className="title_wrap no_line">
          <strong className="title">{'시스템 설정'}</strong>
        </div>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-device" className={formStyles.form_label}>
              <span className={formStyles.form_text}>디바이스</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={
                  'PC, 모바일, APP 모두 사용가능하며 과정 등록 시 PC, 모바일 학습 여부를 설정할 수 있습니다. '
                }
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                </Button>
              </Tooltip>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.check_wrap}>
                <CheckboxGroupFormField
                  options={[
                    { value: 'all', label: '전체' },
                    { value: 'pc', label: 'PC' },
                    { value: 'mobile', label: 'Mobile' },
                    { value: 'app', label: 'APP' },
                  ]}
                  value={['all']}
                />
              </div>
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-device" className={formStyles.form_label}>
              <span className={formStyles.form_text}>카테고리 사용 여부</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={'테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다.'}
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                </Button>
              </Tooltip>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.check_wrap}>
                <CheckboxGroupFormField
                  options={[
                    { value: 'all', label: '전체' },
                    { value: 'common', label: '공통 카테고리' },
                    { value: 'tenant', label: '테넌트 카테고리' },
                  ]}
                  value={['all', 'common', 'tenant']}
                />
              </div>
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-device" className={formStyles.form_label}>
              <span className={formStyles.form_text}>언어</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={
                  '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다. '
                }
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                </Button>
              </Tooltip>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.check_wrap}>
                <CheckboxGroupFormField
                  options={[
                    { value: 'a', label: '전체' },
                    { value: 'b', label: '한국어' },
                    { value: 'c', label: '영어' },
                    { value: 'd', label: '네팔어' },
                    { value: 'e', label: '루미나이어' },
                    { value: 'f', label: '말레이어' },
                    { value: 'g', label: '베트남어' },
                    { value: 'h', label: '스페인어' },
                    { value: 'i', label: '영어' },
                  ]}
                  value={['all', 'common', 'tenant']}
                />
              </div>
            </div>
          </div>
        </ContentsRow>
      </div>
    </PageContainer>
  );
}
