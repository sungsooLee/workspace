import { t } from 'i18next';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@widgets/layout';

import styles from './blog-detail.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/view')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" label={t('매핑과정')} />
        <Button type="button" variant="point" size="sm" label={t('공유이력 보기')} />
        <Button type="button" variant="point" size="sm" label={t('LABEL.button.delete')} />
        <Button type="submit" variant="line" size="sm" label={t('LABEL.button.modify')} />
        <Button type="button" variant="primary" size="sm" label={t('LABEL.button.list')} />
      </ContentsButtons>
      <MainContents>블로그 상세</MainContents>
      <SubContents>
        <div className={styles.sub_container}>
          <strong className={styles.title}>{t('블로그')}</strong>
        </div>
      </SubContents>
    </PageContainer>
  );
}
