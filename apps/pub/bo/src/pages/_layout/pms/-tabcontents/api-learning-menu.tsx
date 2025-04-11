import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { ContentsHistoryInfoFormField } from '../../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '../title.module.css'; // 타이틀 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { Button, ContentsRow, Textarea, Switch, Input, RadioGroupFormField } from '@learnway/ui';
import { IcoFormRequired } from '@learnway/icons';
const ApiLearningMenuComponent: FC<{}> = ({}) => {
  // switch : 보안콘텐츠 여부
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false, // 사용여부
  });
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={layoutStyles.inner}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'학습자 API'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
              {'전체펼침'}
            </Button>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
              {'전체닫기'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}></div>
      </div>
      <div className={layoutStyles.inner}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'타이틀'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
              {'초기화'}
            </Button>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
              {'삭제'}
            </Button>
            <Button variant="save" size="sm" disabled>
              {'저장'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menu" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'API 위치'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu"
                  type="text"
                  placeholder="API 위치를 입력하세요."
                  value="러닝웨이"
                  readOnly
                  className={formStyles.input}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menu2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'상위 API명'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu2"
                  type="text"
                  placeholder="상위 API명을 입력하세요."
                  value="러닝웨이"
                  readOnly
                  className={formStyles.input}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-code" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'API ID'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu2"
                  type="text"
                  placeholder=""
                  value="1932267687686"
                  className={formStyles.input}
                  hideInputLength={false}
                  maxLength={20}
                  readOnly
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
              <label htmlFor="name-method" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'API Method 구분'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.radio_wrap}>
                  <RadioGroupFormField
                    options={[
                      { value: 'a', label: 'get' },
                      { value: 'b', label: 'post' },
                      { value: 'c', label: 'put' },
                      { value: 'd', label: 'delete' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menuName" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'API 이름'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menuName"
                  type="text"
                  placeholder="API 이름을 입력하세요."
                  value="등록 입력 정보 출력"
                  className={formStyles.input}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menuUrl" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'API URL'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menuUrl"
                  type="text"
                  placeholder="API 경로를 입력하세요."
                  value="PMS/compopup_001"
                  className={formStyles.input}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menuUrl" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'내용'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-menuUrl"
                  rows={5}
                  cols={33}
                  resize="none"
                  value=""
                  placeholder="내용을 입력하세요."
                  size={'sm'}
                  maxLength={2000}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={dynamicFormStyles.switch_wrap}>
              <p className={dynamicFormStyles.title}>
                {'사용여부'}
                {/* 필수 케이스 */}
                <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </p>
              <Switch
                id="name-useabled"
                className={dynamicFormStyles.btn_switch}
                label={checked[1] ? '사용' : '미사용'}
                checked={checked[1]}
                onCheckedChange={handleCheckedChange(1)}
              />
            </div>
          </ContentsRow>
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </div>
      </div>
    </div>
  );
};

ApiLearningMenuComponent.displayName = 'ApiLearningMenu';
export const ApiLearningMenu = ApiLearningMenuComponent;
