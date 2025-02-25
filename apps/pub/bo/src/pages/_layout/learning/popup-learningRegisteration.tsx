import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useModal, Button, RadioCard } from '@learnway/ui';
import styles from './popup-learningRegisteration.module.css';
import {
  IcoMybook,
  IcoBlog,
  IcoEntrust,
  IcoInfoCircle,
  IcoImage01,
  IcoVideo01,
  IcoVideo02,
  IcoHtml,
  IcoEtc,
} from '@learnway/icons';
// import { cn } from '@learnway/shared';

export const Route = createFileRoute('/_layout/learning/popup-learningRegisteration')({
  component: RouteComponent,
});

// #06226A

function RouteComponent() {
  const { open: openModal } = useModal();
  const CustomFooter = () => {
    const { close: closeModal } = useModal();
    return (
      <Button variant="gray" size="lg" onClick={() => closeModal()}>
        {'취소'}
      </Button>
    );
  };
  const TypeSelectContent = () => {
    return (
      <div className={styles.wrap}>
        <h2 className={styles.title}>{'등록할 학습자원의 유형을 선택하세요.'}</h2>
        <div className={styles.select_wrap}>
          <RadioCard
            className={styles.select_item}
            options={[
              {
                value: 'type1',
                label: (
                  <>
                    <IcoVideo01 className={styles.icon} />
                    <strong className={styles.select_title}>동영상</strong>
                    <p className={styles.select_text}>1개 동영상 업로드</p>
                  </>
                ),
              },
              {
                value: 'type2',
                label: (
                  <>
                    <IcoVideo02 className={styles.icon} />
                    <strong className={styles.select_title}>멀티 동영상</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type3',
                label: (
                  <>
                    <IcoHtml className={styles.icon} />
                    <strong className={styles.select_title}>HTML 동영상</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type4',
                label: (
                  <>
                    <IcoImage01 className={styles.icon} />
                    <strong className={styles.select_title}>이미지</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                      설명문구2줄설명문구2줄설명문구2줄설명문구2줄설명문구2줄설명문구2줄설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type5',
                label: (
                  <>
                    <IcoEtc className={styles.icon} />
                    <strong className={styles.select_title}>기타</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type6',
                label: (
                  <>
                    <IcoInfoCircle className={styles.icon} />
                    <strong className={styles.select_title}>외부 링크</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type7',
                label: (
                  <>
                    <IcoEntrust className={styles.icon} />
                    <strong className={styles.select_title}>외부 위탁</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type8',
                label: (
                  <>
                    <IcoBlog className={styles.icon} />
                    <strong className={styles.select_title}>블로그</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type9',
                label: (
                  <>
                    <IcoMybook className={styles.icon} />
                    <strong className={styles.select_title}>이북</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type10',
                label: (
                  <>
                    <IcoMybook className={styles.icon} />
                    <strong className={styles.select_title}>스콤</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type11',
                label: (
                  <>
                    <IcoMybook className={styles.icon} />
                    <strong className={styles.select_title}>멀티 스콤</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type12',
                label: (
                  <>
                    <IcoMybook className={styles.icon} />
                    <strong className={styles.select_title}>설문지</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type13',
                label: (
                  <>
                    <IcoMybook className={styles.icon} />
                    <strong className={styles.select_title}>시험지</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
              {
                value: 'type14',
                label: (
                  <>
                    <IcoMybook className={styles.icon} />
                    <strong className={styles.select_title}>과제</strong>
                    <p className={styles.select_text}>
                      설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    );
  };
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        title: '',
        width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <TypeSelectContent />,
        footer: <CustomFooter />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>학습자원 조회 유형 선택 팝업</div>;
}
