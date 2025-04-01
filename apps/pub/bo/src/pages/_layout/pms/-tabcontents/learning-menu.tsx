import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import styles from './learning-menu.module.css'; // 화면 css
import titleStyles from './title.module.css'; // 타이틀 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import {
  Button,
  ContentsRow,
  Textarea,
  CheckboxGroupFormField,
  Switch,
  Tooltip,
  Input,
  Grid,
  DropdownList,
  DropdownOption,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
// eslint-disable-next-line no-empty-pattern
const LearningMenuComponent: FC<{}> = ({}) => {
  // switch : 보안콘텐츠 여부
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
  });
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4' },
    { value: 'option5', label: '옵션 5' },
    { value: 'option6', label: '옵션 6' },
    { value: 'option7', label: '옵션 7' },
    { value: 'option8', label: '옵션 8' },
    { value: 'option9', label: '옵션 9' },
    { value: 'option10', label: '옵션 10' },
  ];

  const data: any[] = [
    {
      Number: '1',
      WidgetName: '학습현황',
      Device: '전체',
      status: '사용',
      Register: '홍길동',
      RegisterDate: 'YYYY-MM-DD HH:MM:SS',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('Number', {
      cell: (info) => info.getValue(),
      header: 'No.',
      size: 64,
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('WidgetName', {
      cell: (info) => info.getValue(),
      header: '위젯명',
      size: 195,
      enableGrouping: false,
    }),
    columnHelper.accessor('Device', {
      cell: (info) => info.getValue(),
      header: '디바이스',
      size: 195,
      enableGrouping: false,
    }),
    columnHelper.accessor('Status', {
      cell: (info) => info.getValue(),
      header: '상태',
      size: 195,
    }),
    columnHelper.accessor('Register', {
      cell: (info) => info.getValue(),
      header: '등록자',
      size: 195,
    }),
    columnHelper.accessor('RegisterDate', {
      cell: (info) => info.getValue(),
      header: '등록일시',
      size: 195,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className={styles.inner}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'목록'}</h3>
          <div className={styles.btn_wrap}>
            <Button variant="text" size="sm" className={styles.btn_text} disabled>
              {'전체펼침'}
            </Button>
            <Button variant="text" size="sm" className={styles.btn_text} disabled>
              {'전체닫기'}
            </Button>
          </div>
        </div>
        <div className={styles.inner_contents}></div>
      </div>
      <div className={styles.inner}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'메뉴 정보'}</h3>
          <div className={styles.btn_wrap}>
            <Button variant="text" size="sm" className={styles.btn_text} disabled>
              {'초기화'}
            </Button>
            <Button variant="text" size="sm" className={styles.btn_text} disabled>
              {'삭제'}
            </Button>
            <Button variant="save" size="sm" disabled>
              {'저장'}
            </Button>
          </div>
        </div>
        <div className={styles.inner_contents}>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menu" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'메뉴 위치'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu"
                  type="text"
                  placeholder="메뉴 위치를 입력하세요."
                  value="러닝웨이"
                  disabled
                  className={formStyles.input}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menu2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'상위 메뉴명'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu2"
                  type="text"
                  placeholder="상위 메뉴명을 입력하세요."
                  value="러닝웨이"
                  disabled
                  className={formStyles.input}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-code" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'메뉴 코드'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu2"
                  type="text"
                  placeholder="메뉴코드를 입력하세요."
                  value="러닝웨이"
                  className={formStyles.input}
                  hideInputLength={false}
                  maxLength={20}
                  disabled
                />
                <Button variant="gray" size="sm" disabled>
                  {'중복'}
                </Button>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menuName" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'메뉴명'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menuName"
                  type="text"
                  placeholder="메뉴명를 입력하세요."
                  value="러닝웨이"
                  className={formStyles.input}
                  hideInputLength={false}
                  maxLength={20}
                  disabled
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menuUrl" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'메뉴 URL'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menuUrl"
                  type="text"
                  placeholder="메뉴명를 입력하세요."
                  value="러닝웨이"
                  className={formStyles.input}
                  hideInputLength={false}
                  maxLength={50}
                  disabled
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menuUrl" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'설명'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-menuUrl"
                  rows={5}
                  cols={33}
                  resize="none"
                  value=""
                  placeholder="메뉴 설명을 입력하세요."
                  size={'sm'}
                  maxLength={50}
                  disabled
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={styles.switch_wrap}>
              <p className={styles.title}>
                {'Hidden메뉴'}

                <Tooltip
                  className={formStyles.tooltip}
                  side="right"
                  align="start"
                  content={
                    'Hidden메뉴 적용 시 메뉴에 API가 매칭 되나, 메뉴 자체는 화면에서 숨김처리가 됩니다.'
                  }>
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </p>
              <Switch
                id="name-use2"
                className={dynamicFormStyles.btn_switch}
                label={checked[1] ? '적용' : '미적용'}
                checked={checked[1]}
                onCheckedChange={handleCheckedChange(1)}
              />
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-device" className={formStyles.form_label}>
                <span className={formStyles.form_text}>디바이스 노출 여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.check_wrap}>
                  <CheckboxGroupFormField
                    options={[
                      { value: 'pc', label: 'PC' },
                      { value: 'mobile', label: 'Mobile' },
                    ]}
                    value={['pc']}
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={styles.switch_wrap}>
              <p className={styles.title}>
                {'개인정보'}

                <Tooltip
                  className={formStyles.tooltip}
                  side="right"
                  align="start"
                  content={'개인정보를 사용하는 경우 엑셀 다운로드 시 사유를 입력해야 합니다.'}>
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </p>
              <Switch
                id="name-use2"
                className={dynamicFormStyles.btn_switch}
                label={checked[2] ? '사용' : '미사용'}
                checked={checked[2]}
                onCheckedChange={handleCheckedChange(2)}
              />
            </div>
          </ContentsRow>
          <ContentsRow>
            <Grid
              data={data}
              columns={columns}
              showSelectedCount={true}
              hideColumnSettings={true}
              title="모듈타이틀"
            />
          </ContentsRow>
        </div>
      </div>
    </div>
  );
};

LearningMenuComponent.displayName = 'LearningMenu';
export const LearningMenu = LearningMenuComponent;
