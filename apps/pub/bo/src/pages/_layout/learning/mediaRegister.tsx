import { createFileRoute } from '@tanstack/react-router';

import styles from './page-content.module.css';
import movieInfoStyles from './movie-info.module.css';
import formStyles from '../../../assets/styles/modules/form.module.css'; // form css
import { Spinner, Input, Textarea, Button } from '@learnway/ui';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { IcoFormRequired, IcoStatusFail } from '@learnway/icons';
import { cn } from '@learnway/shared';

export const Route = createFileRoute('/_layout/learning/mediaRegister')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}>
        <div className="row">
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
            <div className={formStyles.input_box}>
              <Input
                id="name-1-2"
                type="text"
                placeholder="학습명을 입력하세요."
                value=""
                className={formStyles.input}
                showCounter
              />
              {/* <span className={formStyles.count}>
                <em className={formStyles.num}>7</em>/150
              </span> */}
            </div>
          </div>
        </div>
        <div className="row">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-explain" className={formStyles.form_label}>
              <span className={formStyles.form_text}>학습자원 설명</span>
            </label>
            {/* file upload case */}
            <div className={formStyles.input_box}>
              <Textarea
                id="name-explain"
                rows={5}
                cols={33}
                resize="none"
                value=""
                placeholder="콘텐츠에 대한 설명을 입력해주세요."
              />
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.vertical_line} />
      {/* sub_contents */}
      <div className={styles.sub_contents}>
        <strong className={movieInfoStyles.title}>업로드 파일</strong>
        {/* 인코딩 진행 중 */}
        <div className={movieInfoStyles.status_wrap}>
          <Spinner isLoading={true} showBackdrop className={movieInfoStyles.loading} />
          <p className={movieInfoStyles.text}>
            <strong>인코딩 진행 중입니다.</strong>
            인코딩 대기 및 영상 길이에 따라 인코딩 시간이 오래 걸릴수도 있습니다.
          </p>
        </div>
        {/* 인코딩 실패 */}
        <div className={movieInfoStyles.status_wrap}>
          <IcoStatusFail className={movieInfoStyles.fail} />
          <p className={movieInfoStyles.text}>
            <strong>인코딩이 실패되었습니다.</strong>
            다시 시도해 주세요.
          </p>
          <div className={movieInfoStyles.btn_box}>
            <Button className={movieInfoStyles.btn} variant="gray" size="sm">
              재시도
            </Button>
            <Button className={movieInfoStyles.btn} variant="primary" size="sm">
              동영상 변경
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
