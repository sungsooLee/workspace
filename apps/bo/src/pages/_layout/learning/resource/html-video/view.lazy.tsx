/* IA112 / NLP_BO_CMS_1022 - 나의 학습자원 > HTML 상세(저장 및 조회용) */
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Button, Divider, useModal } from '@learnway/ui';

import { FileStatus } from '@types';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui';
import { HtmlDetail } from './-components/html-detail';

import defaultImage from '@assets/images/thumb/img_thumb_default.jpg';
import movieStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import styles from './html-detail.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/html-video/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();
  const [tenantId, setTenantId] = useState<number>(-1);

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(routerState.location.state?.contentUuid),
  );

  const { data: mappingData } = useQuery(
    learningResourceQueryOptions.getCoursesMapping(routerState.location.state?.contentUuid),
  );

  const { data: htmlStatus } = useQuery(
    learningResourceQueryOptions.getHTML5Status(routerState.location.state?.contentUuid),
  );
  console.log('html save status', htmlStatus);

  // draft: 임시저장 상태 / complete: 한 번이라도 저장 버튼을 눌러 저장한 상태
  const [mode, setMode] = useState<'draft' | 'complete'>('draft');

  const { confirm: openConfirm } = useModal();

  const fileAttributes = useMemo(
    () => [
      { label: t('파일명'), value: '화면 기록 2024-11-28 오후 3.00.55.mov' },
      { label: t('원본용량'), value: '1.97GB' },
      { label: t('파일형식'), value: 'ZIP' },
    ],
    [],
  );

  const handleClickSaveButton = async () => {
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
  const handleClickDeleteButton = async () => {
    console.log('mappingData', mappingData);
  };

  useEffect(() => {
    if (!routerState.location.state?.contentUuid) {
      router.navigate({
        to: '/learning/learning-resource',
        replace: true,
      });
    }
  }, [routerState.location.state]);

  useEffect(() => {
    if (loginUser?.activeTenant) {
      setTenantId(loginUser.activeTenant.tenantId);
    } else {
      if (loginUser?.tenants?.length) {
        setTenantId(loginUser.tenants[0].tenantId);
      }
    }
  }, [loginUser]);

  useEffect(() => {
    if (htmlStatus?.contentStatusCode === FileStatus.COMPLETE) {
      setMode('complete');
    } else {
      setMode('draft');
    }
  }, [htmlStatus]);

  return (
    <PageContainer>
      <ContentsButtons>
        {mode === 'complete' && (
          <>
            <Button type="button" variant="search" size="sm" label={t('과정개설')} />
            <Button type="button" variant="point" size="sm" label={t('매핑과정')} />
            <Button type="button" variant="point" size="sm" label={t('번역현황')} />
            <Button type="button" variant="point" size="sm" label={t('공유이력')} />
          </>
        )}
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('목록')}
          onClick={handleClickGoListButton}
        />
        <Divider orientation="vertical" />
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('LABEL.button.delete')}
          onClick={handleClickDeleteButton}
        />
        <Button type="button" variant="point" size="sm" label={t('LABEL.button.translate')} />
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={t('LABEL.button.save')}
          onClick={handleClickSaveButton}
        />
      </ContentsButtons>

      <MainContents>
        <HtmlDetail
          ref={formRef}
          mode={mode}
          tenantId={tenantId}
          data={data}
          hasMapping={mappingData?.hasMapping}
        />
      </MainContents>

      <SubContents>
        <div className={styles.sub_container}>
          <strong className={styles.title}>{t('업로드 파일')}</strong>
          <ul className={movieStyles.btn_list}>
            <li>
              <Button className={movieStyles.btn_text} label={t('원본 다운로드')} />
            </li>
            <li>
              <Button className={movieStyles.btn_text} label={t('파일 변경')} />
            </li>
            {mode === 'complete' && (
              <li>
                <Button className={movieStyles.btn_text} label={t('미리보기')} />
              </li>
            )}
          </ul>
          {/* 파일 정보 조회 영역 */}
          <div className={styles.thumbnail_container}>
            <img src={defaultImage} width="100%" alt="" />
          </div>
          <table className={styles.file_info_container}>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
            <tbody>
              {fileAttributes?.map((attr, i) => (
                <tr key={i}>
                  <th>{attr.label}</th>
                  <td>{attr.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubContents>
    </PageContainer>
  );
}
