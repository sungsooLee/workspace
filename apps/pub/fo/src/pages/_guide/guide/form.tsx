import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Input,
  Button,
  Textarea,
  Select,
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
import formStyles from '../../../assets/styles/modules/form.module.css';

export const Route = createFileRoute('/_guide/guide/form')({
  component: RouteComponent,
});

function RouteComponent() {
  // form toggle
  const [toggleSections, setToggleSections] = useState<{ [key: number]: boolean }>({
    1: true, // toggleSections[1] 열려 있음
    2: true, // toggleSections[2] 열려 있음
    3: true, // toggleSections[3] 열려 있음
    4: true, // toggleSections[4] 열려 있음
  });

  const toggleContent = (index: number) => {
    setToggleSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 해당 index만 토글
    }));
  };

  // chip List
  const options: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
  ];
  const handleChange = (event: SelectOption[]) => {
    console.log(event);
  };
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
            <div className={cn(formStyles.input_box, formStyles.line)}>
              <Input id="name-1-2" type="text" value="업로드 파일명" className="bd_none" />
              <span className={formStyles.count}>
                <em className={formStyles.num}>7</em>/150
              </span>
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
                placeholder="한글,영문,숫자 포함 2500자 이하"
              />
            </div>
            <p className={formStyles.text_limit}>
              <em className={formStyles.num}>7</em>/2500
            </p>
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
              <Select
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
            <label htmlFor="name-1-7" className={formStyles.form_label}>
              <span className={formStyles.form_text}>외주개발업체 정보</span>
              <Button
                className={formStyles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(1)}
                aria-expanded={toggleSections[1] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div
              className={`${formStyles.input_box_wrap} ${toggleSections[1] ? formStyles.open : ''}`}>
              <div className={formStyles.input_box}>
                <Input id="name-1-7" type="text" disabled value="김현대" placeholder="" />
                <Button variant="gray" size="sm">
                  선택
                </Button>
              </div>
              <div className="row">
                <div className={formStyles.form_item}>
                  <label htmlFor="name-1-7-1" className={formStyles.form_label}>
                    <span className={cn(formStyles.form_text, formStyles.sm)}>
                      외주개발업체 담당자
                    </span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input id="name-1-7-1" type="text" disabled value="김현대" placeholder="" />
                    <Button variant="gray" size="sm">
                      선택
                    </Button>
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-1-7-2" className={formStyles.form_label}>
                    <span className={cn(formStyles.form_text, formStyles.sm)}>연락처</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '+82' },
                        { value: 'type2', label: '+83' },
                      ]}
                    />
                    <span className={formStyles.dash}></span>
                    <Input
                      id="name-1-7-2"
                      type="text"
                      placeholder="- 제외한 숫자만 입력"
                      className={formStyles.dash}
                    />
                  </div>
                </div>
              </div>
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
                content={'tooltip content'}>
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
                onChange={handleChange}
              />
            </div>
            <p className={formStyles.text_limit}>
              <em className={formStyles.num}>14개</em>/200개
            </p>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-9" className={formStyles.form_label}>
              <span className={formStyles.form_text}>학습자원 개요 (AI 자동 추출)</span>
              <Button
                className={formStyles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(2)}
                aria-expanded={toggleSections[2] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div
              className={`${formStyles.input_box_wrap} ${toggleSections[2] ? formStyles.open : ''}`}>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-1-9"
                  rows={5}
                  cols={33}
                  placeholder="컨텐츠 개요는 AI 자동 추출되어 표기됩니다."
                  resize="none"
                  size="sm"
                />
              </div>
              <p className={formStyles.text_limit}>
                <em className={formStyles.num}>0</em>/2500
              </p>
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-10" className={formStyles.form_label}>
              <span className={formStyles.form_text}>키워드 (AI 자동 추출)</span>
              <Button
                className={formStyles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(3)}
                aria-expanded={toggleSections[3] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div
              className={`${formStyles.input_box_wrap} ${toggleSections[3] ? formStyles.open : ''}`}>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-1-10"
                  rows={5}
                  cols={33}
                  placeholder="키워드는 AI 자동 추출되어 표기됩니다."
                  resize="none"
                  size="sm"
                />
              </div>
              <p className={formStyles.text_limit}>
                <em className={formStyles.num}>0</em>/2500
              </p>
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-11" className={formStyles.form_label}>
              <span className={formStyles.form_text}>교육자원 활용여부</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_test}>
                {'해당 동영상으로 교육 과정을 개설할 수 있습니다.'}
              </span>
            </label>
            <div className={cn(formStyles.input_box, formStyles.type2)}>
              <Switch id="name-1-11" className={formStyles.btn_switch} />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-12" className={formStyles.form_label}>
              <span className={formStyles.form_text}>보안콘텐츠 여부</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_test}>
                {
                  '동영상에 워터마크가 제공되고, DRM 솔루션 적용 및 화면캡쳐 방지 기능이 적용되어 동영상 보안을 강화할수 있어요.'
                }
              </span>
            </label>
            <div className={cn(formStyles.input_box, formStyles.type2)}>
              <Switch id="name-1-12" className={formStyles.btn_switch} />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-13" className={formStyles.form_label}>
              <span className={formStyles.form_text}>자막변경</span>
              <span className={formStyles.comment}>
                자막<em className={formStyles.num}>3</em>개
              </span>
              <Button
                className={formStyles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(4)}
                aria-expanded={toggleSections[4] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div
              className={`${formStyles.input_box_wrap} ${toggleSections[4] ? formStyles.open : ''}`}>
              <div className={formStyles.input_box}>
                <Select
                  className={cn(formStyles.select_option, formStyles.lg)}
                  options={[
                    { value: 'language1', label: '영어' },
                    { value: 'language2', label: '한국어' },
                  ]}
                />
                <Input
                  id="name-1-14"
                  type="text"
                  readOnly
                  placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                  value="영어자막.smi"
                />
                <Button variant="gray" size="sm" className={formStyles.btn_edit}>
                  자막 변경
                </Button>
                <Button onlyIcon className={formStyles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
              <div className={formStyles.input_box}>
                <Select
                  className={cn(formStyles.select_option, formStyles.lg)}
                  options={[
                    { value: 'language1', label: '영어' },
                    { value: 'language2', label: '한국어' },
                  ]}
                />
                <Input
                  type="text"
                  readOnly
                  placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                  value="영어자막2.smi"
                />
                <Button variant="gray" size="sm" className={formStyles.btn_edit}>
                  자막 변경
                </Button>
                <Button onlyIcon className={formStyles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
              <div className={formStyles.input_box}>
                <Select
                  className={cn(formStyles.select_option, formStyles.lg)}
                  options={[
                    { value: 'language1', label: '영어' },
                    { value: 'language2', label: '한국어' },
                  ]}
                />
                <Input
                  type="text"
                  readOnly
                  placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                />
                <Button variant="gray" size="sm" className={formStyles.btn_edit}>
                  자막 추가
                </Button>
                <Button onlyIcon className={formStyles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
            </div>
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
                content={'마켓플레이스 공개설정111111'}>
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
                content={'공유채널 설정2222222'}>
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
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={cn(formStyles.form_item, formStyles.type2)}>
            <label htmlFor="name-1-16" className={formStyles.form_label}>
              <span className={formStyles.form_text}>검수 확인</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_test}>
                {'등록하고자 한 동영상이며, 처음부터 끝까지 정상적으로 재생됨이 확인되었습니다.'}
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Checkbox className={formStyles.check} />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={cn(formStyles.form_item, formStyles.type2)}>
            <label htmlFor="name-1-17" className={formStyles.form_label}>
              <span className={formStyles.form_text}>저작권 확인</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_test}>
                {
                  '저작권법(제25조2항)에 따라 학습자원(동영상,이미지등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에  동의합니다.'
                }
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Checkbox className={formStyles.check} />
            </div>
          </div>
        </ContentsRow>
        {/* row */}
        <ContentsRow>
          {/* form_item */}
          <div className={cn(formStyles.form_item, formStyles.type2)}>
            <label htmlFor="name-1-18" className={formStyles.form_label}>
              <span className={formStyles.form_text}>보안 확인</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_test}>
                {
                  '보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고, 이에 따른 피해를 입을 수 있음에 인지합니다.'
                }
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Checkbox className={formStyles.check} />
            </div>
          </div>
        </ContentsRow>
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
