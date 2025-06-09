/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
/* style  */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css'; // 타이틀 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { Button, ContentsRow, Textarea, Input, Tooltip, Switch } from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';

export const Route = createFileRoute('/_layout/pms/category-menagement')({
  component: RouteComponent,
});

function RouteComponent() {
  // switch
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    // 컨턴츠 안에 스크롤인 경우 : scrollHidden 추가
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}>
        <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
          <div className={cn(layoutStyles.inner, layoutStyles.type2)}>
            <div className={titleStyles.title_wrap}>
              <h3 className={titleStyles.title}>{'공통 카테고리  목록'}</h3>
              <div className={layoutStyles.btn_wrap}>
                <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
                  {'전체펼침'}
                </Button>
                <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
                  {'전체닫기'}
                </Button>
              </div>
            </div>
            {/* 트리 영역 */}
            <div className={layoutStyles.inner_contents}></div>
          </div>
          <div className={cn(layoutStyles.inner, layoutStyles.type2)}>
            <div className={titleStyles.title_wrap}>
              <h3 className={titleStyles.title}>{'{러닝웨이} 카테고리'}</h3>
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
                    <span className={formStyles.form_text}>{'카테고리 위치'}</span>
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
                    <span className={formStyles.form_text}>{'상위 카테고리명'}</span>
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
                    <span className={formStyles.form_text}>{'카테고리 코드'}</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name-menu2"
                      type="text"
                      placeholder="카테고리 코드를 입력하세요."
                      value="카테고리"
                      className={formStyles.input}
                      hideInputLength={false}
                      maxLength={20}
                    />
                    <Button variant="gray" size="sm">
                      {'중복'}
                    </Button>
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                {/* form_item */}
                <div className={formStyles.form_item}>
                  <label htmlFor="name-menuName" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>{'카테고리 명'}</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name-menuName"
                      type="text"
                      placeholder="카테고리 명을 입력하세요."
                      value="러닝웨이"
                      className={formStyles.input}
                      hideInputLength={false}
                      maxLength={10}
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
                    />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow type="horizontal">
                <div className={formStyles.form_item}>
                  <label htmlFor="name-toggle01" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>사용 여부</span>
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
                </div>
              </ContentsRow>
              <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
                <ContentsHistoryInfoFormField />
              </ContentsRow>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
