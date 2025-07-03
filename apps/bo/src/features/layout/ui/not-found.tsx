// import { Link } from '@tanstack/react-router';
// import styles from '@learnway/styles/bo/assets/styles/modules/not-found.module.css';

import { useTranslation } from 'react-i18next';
import { useRouter } from '@tanstack/react-router';

import { Button, EmptyText } from '@learnway/ui';
import { cn } from '@learnway/shared';
import pageStyles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';

// 404 에러코드 노출로 주석처리
// const NotFoundComponent = () => {
//   return (
//     <div className={cn(pageStyles.start, pageStyles.contents, '!pb-0')}>
//       <div className={cn(pageStyles.inner, '!pb-0')}>
//         <div className={cn(styles.start, 'not_found')}>
//           <div className={styles.guide_wrap}>
//             <div className={styles.empty_message}>
//               <strong>{'404'}</strong>
//               <p>{'NOT FOUND'}</p>
//             </div>
//             <p className={styles.text}>{'요청하신 페이지를 찾을 수 없습니다.'}</p>
//             <div className={styles.btn_wrap}>
//               <Link to={'/'}>
//                 <Button variant={'primary'} size={'lg'}>
//                   {'홈'}
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export const NotFoundComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={cn(pageStyles.start, pageStyles.contents, '!pb-0')}>
      <div className={cn(pageStyles.inner, '!pb-0')}>
        <div className={cn('flex h-screen flex-col items-center justify-center overflow-hidden')}>
          <div>
            <EmptyText
              text={t('잘못된 접근이거나 요청하신 페이지를 찾을 수 없습니다.')}
              footer={
                <Button
                  variant={'primary'}
                  size={'md'}
                  label={t('action 2')}
                  onClick={() => {
                    router.navigate({ to: '/' });
                  }}
                >
                  홈
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotFound = NotFoundComponent;
