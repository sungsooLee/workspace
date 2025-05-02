/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Input,
  Button,
  Textarea,
  Dropdown,
  Tooltip,
  ChipList,
  SelectOption,
  Switch,
  RadioGroup,
  Checkbox,
  ContentsRow,
  InputTimer,
} from '@learnway/ui';
import { IcoFormRequired, IcoArrowDown, IcoAlertCircle, IcoCloseCircle } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

export const Route = createFileRoute('/_guide/guide/form')({
  component: RouteComponent,
});

function RouteComponent() {
  // switch : 사용기한
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  // chip List
  const options: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
  ];
  return (
    <div>
      <h2 className="guide_tit2">Form Guide</h2>
      <h3 className="guide_tit3">
        Form 사용 케이스(row는 정렬할때 사용- form요소가 아니더라도 사용 가능)
      </h3>
      <p className="loc css">
        파일 위치 : /assets/styles/modules/<strong>form.module.css</strong>
      </p>
      <ul className="info_ul">
        <li>form.module.css import 한 후 필요한 콤포넌트 적용.</li>
        <li>전체 폼은 form_row 감싼다.</li>

        <li>폼영역은 row 로 감싼다. (다만, 한줄씩 떨어질때는 form_row에 col을 같이 사용한다.</li>
      </ul>
      <div className="code_example">
        <pre className="code_block">
          <code>{`// module css import
import formStyles from '../../assets/styles/modules/form.module.css';

// 예시
<div className='form_row'>
  <ContentsRow>
    <div className={formStyles.form_item}>
        form_item
    </div>

    <div className={formStyles.form_item}>
        form_item
    </div>
  </ContentsRow>

  <ContentsRow>
    row
  </ContentsRow>
</div>`}</code>
        </pre>
      </div>
      <h3 className="guide_tit3">Form 예제</h3>
      <form className="form_row">
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name" className={formStyles.form_label}>
              <span className={formStyles.form_text}>채널</span>
              {/* 퍼블수정 : 2025-04-30 count 추가 */}
              <span className={formStyles.form_count}>{'2'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name"
                type="text"
                placeholder="입력"
                disabled
                value="최근 콘테츠 등록한 채널명 또는 최근 생성된 채널명"
              />
              <Button variant="gray" size="sm">
                선택
              </Button>
            </div>
            <p className={cn(formStyles.guide_text)}>기본 메시지</p>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>학습자원명</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            {/* file upload case */}
            <div className={cn(formStyles.input_box)}>
              <Input
                id="name-1-2"
                type="text"
                value="업로드 파일명"
                className="bd_none"
                maxLength={150}
              />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-3" className={formStyles.form_label}>
              <span className={formStyles.form_text}>카테고리</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-1-3"
                type="text"
                disabled
                placeholder="학습자원을 분류할 카테고리를 선택하세요."
              />
              <Button variant="gray" size="sm">
                선택
              </Button>
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-4" className={formStyles.form_label}>
              <span className={formStyles.form_text}>콘텐츠 설명</span>
            </label>
            <div className={formStyles.input_box}>
              <Textarea
                id="name-1-4"
                rows={5}
                cols={33}
                resize="none"
                placeholder="글자수 입력시 옵션 추가 maxLength={2500}"
                maxLength={2500}
                className={formStyles.textarea}
              />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-5" className={formStyles.form_label}>
              <span className={formStyles.form_text}>담당자</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-1-5" type="text" disabled value="김현대" placeholder="" />
              <Button variant="gray" size="sm">
                선택
              </Button>
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-6" className={formStyles.form_label}>
              <span className={formStyles.form_text}>연락처</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Dropdown
                className={formStyles.select_option}
                options={[
                  { value: 'type1', label: '+82' },
                  { value: 'type2', label: '+83' },
                ]}
              />
              <span className={formStyles.dash}></span>
              <Input
                id="name-1-6"
                type="text"
                placeholder="- 제외한 숫자만 입력"
                className={formStyles.dash}
              />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-8" className={formStyles.form_label}>
              <span className={formStyles.form_text}>태그</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={'tooltip content'}
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                </Button>
              </Tooltip>
              <span className={formStyles.sub_test}>
                {'동영상을 표현하는 썸네일을 선택하거나 업로드 하세요. (미선택 시 자동 선택)'}
              </span>
            </label>
            <div className={formStyles.input_box}>
              <ChipList
                className={formStyles.chips_wrap}
                options={options}
                placeholder="한글, 영문, 숫자 포함 9자 이하"
                showInput
                prefixCharacter="#"
              />
            </div>
            <p className={formStyles.text_limit}>
              <em className={formStyles.num}>14개</em>/200개
            </p>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-14" className={formStyles.form_label}>
              <span className={formStyles.form_text}>마켓플레이스 공개설정</span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={'마켓플레이스 공개설정111111'}
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                </Button>
              </Tooltip>
            </label>
            <div className={cn(formStyles.input_box)}>
              <RadioGroup
                className={formStyles.radio_wrap}
                options={[
                  { value: 'type1', label: '비공개' },
                  { value: 'type2', label: '전체공개' },
                  { value: 'type3', label: '일부공개' },
                ]}
              />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-15" className={formStyles.form_label}>
              <span className={formStyles.form_text}>공유채널 설정</span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={'공유채널 설정2222222'}
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                </Button>
              </Tooltip>
            </label>
            <div className={cn(formStyles.input_box)}>
              <Input id="name-1-15" type="text" readOnly value="채널명" placeholder="" />
              <Button variant="gray" size="sm">
                선택
              </Button>
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-auto" className={formStyles.form_label}>
              <span className={formStyles.form_text}>학습자원 개요 (AI 자동 추출)</span>
            </label>
            <div className={formStyles.input_box}>
              <Textarea
                id="name-auto"
                rows={5}
                cols={33}
                placeholder="키워드는 AI 자동 추출되어 표기됩니다.   "
                resize="none"
                size="sm"
                readOnly
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-auto2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>키워드 (AI 자동 추출)</span>
            </label>
            <div className={formStyles.input_box}>
              <Textarea
                id="name-auto2"
                rows={5}
                cols={33}
                placeholder="키워드는 AI 자동 추출되어 표기됩니다."
                resize="none"
                size="sm"
                readOnly
              />
            </div>
          </div>
        </ContentsRow>
        {/* 2025-03-10 수정 S */}
        <ContentsRow type="horizontal">
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-conjugation" className={formStyles.form_label}>
              <span className={formStyles.form_text}>교육자원 활용여부</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Switch
                id="name-use"
                className={dynamicFormStyles.btn_switch}
                label={checked[3] ? '활용 가능' : '활용 불가'}
                checked={checked[3]}
                onCheckedChange={handleCheckedChange(3)}
              />
            </div>
            <p className={formStyles.guide_text}>
              해당 학습자원으로 교육 과정을 개설할 수 {checked[3] ? '있습니다.' : '없습니다.'}
            </p>
          </div>
        </ContentsRow>
        <ContentsRow type="horizontal">
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-conjugation2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>보안콘텐츠 여부</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Switch
                id="name-use2"
                className={dynamicFormStyles.btn_switch}
                label={checked[4] ? '보안 적용' : '보안 미적용'}
                checked={checked[4]}
                onCheckedChange={handleCheckedChange(4)}
              />
            </div>
            <p className={formStyles.guide_text}>
              동영상에 워터마크가 제공되고, DRM 솔루션 적용 및 화면캡쳐 방지 기능이 적용되어 동영상
              보안을 강화할수 {checked[4] ? '있습니다.' : '없습니다.'}
            </p>
          </div>
        </ContentsRow>
        <ContentsRow type="horizontal" className={!checked[5] ? 'inactive' : ''}>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-add" className={formStyles.form_label}>
              <span className={formStyles.form_text}>자막 추가</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              {/* <Switch id="name-title" className={formStyles.btn_switch} label="자막 없음" /> */}
            </label>
            <div className={formStyles.input_box}>
              <Switch
                id="name-title"
                className={formStyles.btn_switch}
                label={checked[5] ? `자막 ${3}개` : '자막 없음'}
                checked={checked[5]}
                onCheckedChange={handleCheckedChange(5)}
              />
            </div>
          </div>
        </ContentsRow>
        {checked[5] && (
          <ContentsRow>
            <div className={formStyles.form_item}>
              <div className={formStyles.input_box}>
                {/* 퍼블수정 20240319 : 수정 S */}
                <div className={dynamicFormStyles.multiple_row}>
                  <ContentsRow className={dynamicFormStyles.row_inner}>
                    <Dropdown
                      className={dynamicFormStyles.short}
                      options={[
                        { value: 'language1', label: '영어' },
                        { value: 'language2', label: '한국어' },
                      ]}
                    />
                    <Input
                      id="name-1-14"
                      type="text"
                      placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                      value="영어자막.smi"
                    />
                    <Button variant="gray" size="sm" className={dynamicFormStyles.btn_edit}>
                      자막 변경
                    </Button>
                    <Button onlyIcon className={dynamicFormStyles.btn_delete}>
                      <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                    </Button>
                  </ContentsRow>
                  <ContentsRow className={dynamicFormStyles.row_inner}>
                    <Dropdown
                      className={dynamicFormStyles.short}
                      options={[
                        { value: 'language1', label: '영어' },
                        { value: 'language2', label: '한국어' },
                      ]}
                    />
                    <Input
                      type="text"
                      placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                      value="영어자막2.smi"
                    />
                    <Button variant="gray" size="sm" className={dynamicFormStyles.btn_edit}>
                      자막 변경
                    </Button>
                    <Button onlyIcon className={dynamicFormStyles.btn_delete}>
                      <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                    </Button>
                  </ContentsRow>
                  <ContentsRow className={dynamicFormStyles.row_inner}>
                    <Dropdown
                      className={dynamicFormStyles.short}
                      options={[
                        { value: 'language1', label: '영어' },
                        { value: 'language2', label: '한국어' },
                      ]}
                    />
                    <Input
                      type="text"
                      placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                      value="영어자막3.smi"
                    />
                    <Button variant="gray" size="sm" className={dynamicFormStyles.btn_edit}>
                      자막 변경
                    </Button>
                    <Button onlyIcon className={dynamicFormStyles.btn_delete}>
                      <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                    </Button>
                  </ContentsRow>
                  <ContentsRow className={dynamicFormStyles.row_inner}>
                    <Dropdown
                      className={dynamicFormStyles.short}
                      options={[
                        { value: 'language1', label: '언어선택' },
                        { value: 'language2', label: '한국어' },
                        { value: 'language3', label: '영어' },
                      ]}
                    />
                    <Input
                      type="text"
                      placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                    />
                    <Button variant="gray" size="sm" className={dynamicFormStyles.btn_edit}>
                      자막 추가
                    </Button>
                  </ContentsRow>
                </div>
                {/* 퍼블수정 20240319 : 수정 E */}
              </div>
            </div>
          </ContentsRow>
        )}
        {/* 퍼블수정 20240320 : 채널 선택 영역 수정 */}
        <ContentsRow type="horizontal">
          <div className={formStyles.form_item}>
            <label htmlFor="name-share" className={formStyles.form_label}>
              <span className={formStyles.form_text}>공유채널 설정</span>
              <Tooltip
                className={formStyles.tooltip}
                side="bottom"
                align="start"
                content={'설정된 채널에 해당 학습자원이 공유됩니다.'}
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                </Button>
              </Tooltip>
            </label>
            <div className={formStyles.input_box}>
              <span className={formStyles.info_area}>
                <span className={formStyles.info_text}>
                  채널<em>10</em>개
                </span>
                <Button variant="search" size="sm">
                  채널선택
                </Button>
              </span>
            </div>
          </div>
        </ContentsRow>
        {/* 2025-03-07 수정 */}
        <div className={formStyles.form_contents_wrap}>
          <strong className={formStyles.tit_sub}>
            최종 확인{/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </strong>
          <div className={formStyles.form_contents}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-confirm" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>검수 확인</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Checkbox className={formStyles.checkbox} />
                  <p className={formStyles.sub_text}>
                    등록하고자 한 동영상이며, 처음부터 끝까지 정상적으로 재생됨이 확인되었습니다.
                  </p>
                </div>
                <p className={cn(formStyles.guide_text, formStyles.error)}>
                  ‘검수 확인’ 체크하세요.
                </p>
              </div>
            </ContentsRow>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-confirm2" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>저작권 확인</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Checkbox className={formStyles.checkbox} />
                  <p className={formStyles.sub_text}>
                    저작권법(제25조2항)에 따라 학습자원(동영상,이미지등)은 해당 학습플랫폼에서만
                    이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법
                    위반에 해당될 수 있음에 동의합니다.
                  </p>
                </div>
                <p className={cn(formStyles.guide_text, formStyles.error)}>
                  ‘저작권 확인’ 체크하세요.
                </p>
              </div>
            </ContentsRow>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-confirm3" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>보안 확인</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Checkbox className={formStyles.checkbox} />
                  <p className={formStyles.sub_text}>
                    보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고, 이에 따른
                    피해를 입을 수 있음에 인지합니다.
                  </p>
                </div>
                <p className={cn(formStyles.guide_text, formStyles.error)}>
                  ‘보안 확인’ 체크하세요.
                </p>
              </div>
            </ContentsRow>
          </div>
        </div>
        <ContentsHistoryInfoFormField />
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name3" className={formStyles.form_label}>
              <span className={formStyles.form_text}>error</span>
              {/* error 케이스 */}
              <span className={formStyles.status}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name3" type="text" value="text" placeholder="입력" error />
            </div>
            {/* 에러인경우 : error 클래스 추가 */}
            <p className={cn(formStyles.guide_text, formStyles.error)}>에러메시지</p>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name4" className={formStyles.form_label}>
              <span className={formStyles.form_text}>Password</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name4" type="password" placeholder="" value="●●●●" />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name5" className={formStyles.form_label}>
              <span className={formStyles.form_text}>readonly</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name5" type="text" placeholder="입력" value="value" readOnly />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name5" className={formStyles.form_label}>
              <span className={formStyles.form_text}>로그인 Case</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name5" type="text" value="text" placeholder="입력" className="lg" />
            </div>
            <p className={cn(formStyles.guide_text)}>기본 메시지</p>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="nameSearch" className={formStyles.form_label}>
              <span className={formStyles.form_text}>검색</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="nameSearch"
                type="text"
                value="text"
                placeholder="입력"
                className="lg"
                showSearchIcon
              />
            </div>
            <p className={cn(formStyles.guide_text)}>기본 메시지</p>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="nameTimer" className={formStyles.form_label}>
              <span className={formStyles.form_text}>타이머</span>
            </label>
            <div className={formStyles.input_box}>
              <InputTimer startTimer={1} initialTime={300} />
            </div>
            <p className={cn(formStyles.guide_text)}>기본 메시지</p>
          </div>
        </ContentsRow>
      </form>
    </div>
  );
}
