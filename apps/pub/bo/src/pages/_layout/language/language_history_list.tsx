/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  Input,
  Dropdown,
  Button,
  GridBox,
  Divider,
  DatePicker,
  ChipListModalSelectorFormField,
  useModal,
  ModalTitle,
  ModalContainer,
  ModalBody,
  ModalFooter,
} from '@learnway/ui';
import { IcoRefresh02, IcoSearch, IcoArrowDownDouble } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

export const Route = createFileRoute('/_layout/language/language_history_list')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const ModalOwnerSearchContent = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const { close: closeModal } = useModal();

    const data2: any[] = [
      {
        title1: '영어',
        title2: 'G-TELP',
      },
      {
        title1: '영어',
        title2: 'G-TELP',
      },
      {
        title1: '영어',
        title2: 'G-TELP',
      },
    ];

    const columnHelper = createColumnHelper<any>();
    const columns2 = [
      columnHelper.accessor('title1', {
        cell: (info) => info.getValue(),
        header: '언어 분류',
        enableGrouping: false,
        size: 140,
      }),
      columnHelper.accessor('title2', {
        cell: (info) => info.getValue(),
        header: '어학시험 과목',
        enableGrouping: false,
        meta: {
          size: 'auto',
        },
      }),
    ] as ColumnDef<any, unknown>[];

    return (
      <ModalContainer>
        <ModalTitle>{'어학시험 과목 조회'}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-popSelect" className={searchStyles.label}>
                          <span className={searchStyles.text}>언어 분류</span>
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
                        <label htmlFor="name-popSelect2" className={searchStyles.label}>
                          <span className={searchStyles.text}>어학시험 과목</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id={'name-popSelect2'} type={'text'} placeholder={'입력'} />
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
              <Divider />
              <GridBox
                data={data2}
                columns={columns2}
                showSelectedCount={true}
                title={'어학시험 과목 목록'}
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
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select1" className={searchStyles.label}>
                        <span className={searchStyles.text}>테넌트</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues}
                          onChange={(selected) => setSelectedValues(selected)}
                          variant="default"
                          size={'sm'}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>회사</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          className={searchStyles.select_option}
                          options={[
                            { value: 'type1', label: '전체' },
                            { value: 'type2', label: '항목' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직</span>
                      </label>
                      <div className={searchStyles.box}>
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
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select4" className={searchStyles.label}>
                        <span className={searchStyles.text}>성명/사번</span>
                      </label>
                      <div className={searchStyles.box}>
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
                  </div>
                </div>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>테넌트</span>
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
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channel2" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          className={searchStyles.select_option}
                          options={[
                            { value: 'type1', label: '전체' },
                            { value: 'type2', label: '항목' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-type2" className={searchStyles.label}>
                        <span className={searchStyles.text}>유형</span>
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
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-owner2" className={searchStyles.label}>
                        <span className={searchStyles.text}>담당자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input
                          id="name-owner2"
                          type="text"
                          placeholder="담당자명으로 조회하세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* 확장영역 */}
                {isExpanded && (
                  <div className={cn(searchStyles.form_display, searchStyles.item_wrap)}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-term" className={searchStyles.label}>
                          <span className={searchStyles.text}>공유기간</span>
                        </label>
                        <div className={searchStyles.box}>
                          <DatePicker className={searchStyles.datepicker_item} />
                          <span className={searchStyles.dash}></span>
                          <DatePicker className={searchStyles.datepicker_item} />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-owner2" className={searchStyles.label}>
                          <span className={searchStyles.text}>담당자</span>
                        </label>
                        <div className={searchStyles.box}>
                          <div className={searchStyles.half}>
                            <Input
                              id="name-owner2"
                              type="text"
                              placeholder="담당자명을 입력하세요."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={searchStyles.btn_box}>
                <Button
                  type="button"
                  className={cn(searchStyles.btn_expand, isExpanded ? searchStyles.active : '')}
                  variant="search"
                  size="sm"
                  onlyIcon
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <IcoArrowDownDouble className={searchStyles.ico_expand} />
                </Button>
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
          <Divider />
        </div>
      </PageContainer>
    </form>
  );
}
