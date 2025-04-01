import { FC } from 'react';
import { cn } from '@learnway/shared';
import styles from './learning-menu.module.css'; // 화면 css
import titleStyles from './title.module.css'; // 타이틀 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import {
  Button,
  ContentsRow,
  Textarea,
  // DatePicker,
  // // Switch,
  // Select,
  // // ThumbnailImageUpload,
  // // ChipList,
  // // SelectOption,
  Input,
} from '@learnway/ui';
import { IcoFormRequired } from '@learnway/icons';
// eslint-disable-next-line no-empty-pattern
const LearningMenuComponent: FC<{}> = ({}) => {
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
                  disabled
                />
              </div>
            </div>
          </ContentsRow>
        </div>
      </div>
    </div>
  );
};

LearningMenuComponent.displayName = 'LearningMenu';
export const LearningMenu = LearningMenuComponent;
