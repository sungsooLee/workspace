/* IA110 / NLP_BO_CMS_1031 - 나의 학습자원 > 블로그 등록 */
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { Button, Divider, useModal } from '@learnway/ui';
import defaultImage from '@assets/images/thumb/img_thumb_default.jpg';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui';
import { BlogDetail } from './-components/blog-detail';

import styles from './blog-detail.module.css';
import { useFetchAuthUser } from '@learnway/auth/entities';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>(defaultImage);

  const { confirm: openConfirm } = useModal();
  const router = useRouter();

  const { data: loginUser } = useFetchAuthUser();
  const [tenantId, setTenantId] = useState<number>(-1);

  const handleClickSubmitButton = (e: MouseEvent<HTMLButtonElement>) => {
    if (formRef.current) {
      formRef.current?.requestSubmit();
    }
  };

  const handleClickGoListButton = async () => {
    if (
      await openConfirm({
        title: t('LABEL.confirm.goList.title'),
        content: t('LABEL.confirm.goList.message'),
      })
    ) {
      router.navigate({ to: '/learning/learning-resource' });
    }
  };

  useEffect(() => {
    if (loginUser?.activeTenant) {
      setTenantId(loginUser.activeTenant.tenantId);
    } else {
      if (loginUser?.tenants?.length) {
        setTenantId(loginUser.tenants[0].tenantId);
      }
    }
  }, [loginUser]);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('LABEL.button.list')}
          onClick={handleClickGoListButton}
        />
        <Divider orientation="vertical" />
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={t('LABEL.button.save')}
          onClick={handleClickSubmitButton}
        />
      </ContentsButtons>

      <MainContents>
        <BlogDetail
          ref={formRef}
          tenantId={tenantId}
          mode="create"
          setThumbnailImage={setThumbnailImage}
        />
      </MainContents>

      {/* 썸네일 영역 */}
      <SubContents>
        <div className={styles.sub_container}>
          <strong className={styles.title}>{t('블로그')}</strong>
        </div>
        <div className={styles.thumbnail_container}>
          <img width="100%" src={thumbnailImage} alt="" />
        </div>
      </SubContents>
    </PageContainer>
  );
}
