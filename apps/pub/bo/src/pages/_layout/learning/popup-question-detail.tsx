/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  useModal,
  ModalTitle,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ContentsRow,
  RadioGroupFormField,
  Textarea,
  Switch,
  Input,
  TableBox,
  Checkbox,
  Dropdown,
} from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import { IcoFormRequired, IcoMenu01 } from '@learnway/icons';

/* style */
import uploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import styles from './popup-question-detail.module.css';

export const Route = createFileRoute('/_layout/learning/popup-question-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const QuestionAddContent = () => {
    const [checked, setChecked] = useState<{ [key: number]: boolean }>({
      1: false,
    });
    const handleCheckedChange = (id: number) => (checked: boolean) => {
      setChecked((prev) => ({ ...prev, [id]: checked }));
    };
    const columnHelper = createColumnHelper<any>();

    // thead : 'value'
    const data: any[] = [
      {
        name: (
          <Textarea
            rows={5}
            cols={5}
            maxLength={2000}
            resize={'none'}
            placeholder={'입력'}
            size={'sm'}
          />
        ),
        name2: (
          <div className={uploadStyles.start}>
            <div className={uploadStyles.upload_single}>
              <div className={uploadStyles.view_file}>
                <div className={uploadStyles.attach_area}>
                  <p className={uploadStyles.text}>버튼을 클릭하여 파일을 추가하세요.</p>
                </div>
              </div>
              <Button className={uploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                <input type="file" className={uploadStyles.input_file} />
                {'파일첨부'}
              </Button>
            </div>
          </div>
        ),
        name3: <Checkbox size={'md'} label="정답" />,
        name4: (
          <Button
            onlyIcon
            icon={<IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#4c515e" />}
          />
        ),
      },
      {
        name: (
          <Textarea
            rows={5}
            cols={5}
            maxLength={2000}
            resize={'none'}
            placeholder={'입력'}
            size={'sm'}
          />
        ),
        name2: (
          <div className={uploadStyles.start}>
            <div className={uploadStyles.upload_single}>
              <div className={uploadStyles.view_file}>
                <div className={uploadStyles.attach_area}>
                  <p className={uploadStyles.text}>버튼을 클릭하여 파일을 추가하세요.</p>
                </div>
              </div>
              <Button className={uploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                <input type="file" className={uploadStyles.input_file} />
                {'파일첨부'}
              </Button>
            </div>
          </div>
        ),
        name3: <Checkbox size={'md'} label="정답" />,
        name4: (
          <Button
            onlyIcon
            icon={<IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#4c515e" />}
          />
        ),
      },
    ];

    // Thead 정의
    const columns = [
      columnHelper.accessor('name', {
        header: '보기',
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
          size: 'auto',
        },
      }),
      columnHelper.accessor('name2', {
        header: '첨부파일',
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
          size: 'auto',
        },
      }),
      columnHelper.accessor('name3', {
        header: '정답',
        cell: (info) => info.getValue(),
        size: 104,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
      columnHelper.accessor('name4', {
        header: '순서변경',
        cell: (info) => info.getValue(),
        size: 104,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
    ] as ColumnDef<any, unknown>[];

    // thead : 'value'
    const data2: any[] = [
      {
        name: <Input type={'text'} placeholder={'입력'} value={'O'} readOnly />,
        name2: (
          <div className={uploadStyles.start}>
            <div className={uploadStyles.upload_single}>
              <div className={uploadStyles.view_file}>
                <div className={uploadStyles.attach_area}>
                  <p className={uploadStyles.text}>파일을 첨부하세요.</p>
                </div>
              </div>
              <Button className={uploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                <input type="file" className={uploadStyles.input_file} />
                {'파일첨부'}
              </Button>
            </div>
          </div>
        ),
        name3: <Checkbox size={'md'} label="정답" />,
      },
      {
        name: <Input type={'text'} placeholder={'입력'} value={'X'} readOnly />,
        name2: (
          <div className={uploadStyles.start}>
            <div className={uploadStyles.upload_single}>
              <div className={uploadStyles.view_file}>
                <div className={uploadStyles.attach_area}>
                  <p className={uploadStyles.text}>파일을 첨부하세요.</p>
                </div>
              </div>
              <Button className={uploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                <input type="file" className={uploadStyles.input_file} />
                {'파일첨부'}
              </Button>
            </div>
          </div>
        ),
        name3: <Checkbox size={'md'} label="정답" />,
      },
    ];

    // Thead 정의
    const columns2 = [
      columnHelper.accessor('name', {
        header: '보기',
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
          size: 'auto',
        },
      }),
      columnHelper.accessor('name2', {
        header: '첨부파일',
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
          size: 'auto',
        },
      }),
      columnHelper.accessor('name3', {
        header: '정답',
        cell: (info) => info.getValue(),
        size: 104,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
    ] as ColumnDef<any, unknown>[];

    // thead : 'value'
    const data3: any[] = [
      {
        name: <Input type={'text'} placeholder={'입력'} value={'O'} readOnly />,
      },
      {
        name: <Input type={'text'} placeholder={'입력'} value={'X'} readOnly />,
      },
    ];

    // Thead 정의
    const columns3 = [
      columnHelper.accessor('name', {
        header: '보기',
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
          size: 'auto',
        },
      }),
    ] as ColumnDef<any, unknown>[];

    // dropdown
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const options = [
      { value: 'option1', label: '과정이해도' },
      { value: 'option2', label: '과정이해도2' },
      { value: 'option3', label: '과정이해도3' },
    ];

    return (
      <ModalContainer>
        <ModalTitle>{'문항추가'}</ModalTitle>
        <ModalBody>
          <div className={cn(popupStyles.wrap, styles.start)}>
            <FormSubTitle label={'기본정보'} />
            <div className={cn(tableStyles.start, tableStyles.wrap)}>
              <table>
                <caption>{'기본정보'}</caption>
                <colgroup>
                  <col style={{ width: '240px' }} />
                  <col />
                  <col style={{ width: '240px' }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope={'row'}>{'테넌트'}</th>
                    <td>{'테넌트명'}</td>
                    <th scope={'row'}>{'채널'}</th>
                    <td>{'채널명'}</td>
                  </tr>
                  <tr>
                    <th scope={'row'}>{'유형'}</th>
                    <td>{'시험지'}</td>
                    <th scope={'row'}>{'학습자원명'}</th>
                    <td>{'학습자원명'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <FormSubTitle label={'문항정보'} lineType={'dark'} />
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>문항유형</span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.segment_wrap}>
                    <RadioGroupFormField
                      options={[
                        { value: 'option01', label: '객관식' },
                        { value: 'option02', label: '다답식' },
                        { value: 'option03', label: '단답식' },
                        { value: 'option04', label: '주관식' },
                        { value: 'option05', label: 'OX' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type2" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>난이도</span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.segment_wrap}>
                    <RadioGroupFormField
                      options={[
                        { value: 'option01', label: '상' },
                        { value: 'option02', label: '중' },
                        { value: 'option03', label: '하' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type2-1" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>문항유형</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    type={'text'}
                    placeholder={'입력'}
                    id="name-type2-1"
                    value={'입력'}
                    disabled
                  />
                </div>
              </div>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type2-2" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>난이도</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    type={'text'}
                    placeholder={'입력'}
                    id="name-type2-2"
                    value={'입력'}
                    disabled
                  />
                </div>
              </div>
            </ContentsRow>
            {/* 퍼블수정 20250619 문항속성 추가 */}
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type2-1" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>문항속성</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Dropdown
                    options={options}
                    value={selectedValues}
                    onChange={(selected) => setSelectedValues(selected)}
                    variant="default"
                    placeholder="선택"
                    size={'sm'}
                  />
                </div>
              </div>
              <div className={formStyles.form_item}></div>
              <div className={formStyles.form_item}></div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type3" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>문항</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Textarea
                    id={'name-type3'}
                    rows={5}
                    cols={5}
                    maxLength={2000}
                    resize={'none'}
                    placeholder={'입력'}
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type4" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>해설</span>
                </label>
                <div className={formStyles.input_box}>
                  <Textarea
                    id={'name-type4'}
                    rows={5}
                    cols={5}
                    maxLength={2000}
                    resize={'none'}
                    placeholder={'입력'}
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow type="horizontal">
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type5" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>첨부파일</span>
                  {/* <Tooltip
                    className={formStyles.tooltip}
                    side="bottom"
                    align="start"
                    content={'사용기한 내 콘텐츠 공유/교육자원활용이 가능합니다.'}
                  >
                    <Button onlyIcon>
                      <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                    </Button>
                  </Tooltip> */}
                </label>
                <div className={formStyles.input_box}>
                  <Switch
                    id="switch01"
                    className={formStyles.btn_switch}
                    label={checked[1] ? '파일추가' : '파일없음'}
                    checked={checked[1]}
                    onCheckedChange={handleCheckedChange(1)}
                  />
                </div>
              </div>
            </ContentsRow>
            {checked[1] && (
              <div className={dynamicFormStyles.form_display}>
                <div className={cn(uploadStyles.start, uploadStyles.wrap)}>
                  <div className={uploadStyles.upload_single}>
                    <div className={uploadStyles.view_file}>
                      <div className={uploadStyles.attach_area}>
                        <p className={uploadStyles.text}>버튼을 클릭하여 파일을 추가하세요.</p>
                      </div>
                    </div>
                    <Button className={uploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                      <input type="file" className={uploadStyles.input_file} />
                      {'파일첨부'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <TableBox
              data={data}
              columns={columns}
              tableMode={true}
              showAdd={true}
              multiple={true}
              showNumberingColumn={true}
              showSelectAll={true}
              title={'보기목록'}
              guideText={'보기의 첨부파일은 최대1개, 이미지파일만 가능합니다.'}
              className={styles.detail_table}
            />
            <TableBox
              data={data2}
              columns={columns2}
              tableMode={true}
              multiple={true}
              showNumberingColumn={true}
              showSelectAll={true}
              title={'보기목록'}
              guideText={'보기의 첨부파일은 최대1개, 이미지파일만 가능합니다.'}
              className={styles.detail_table02}
            />
            <TableBox
              data={data3}
              columns={columns3}
              tableMode={true}
              showNumberingColumn={true}
              showSelectAll={true}
              title={'보기목록'}
              className={styles.detail_table03}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'저장'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <QuestionAddContent />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>Hello "/_layout/learning/popup-question-detail"!</div>;
}
