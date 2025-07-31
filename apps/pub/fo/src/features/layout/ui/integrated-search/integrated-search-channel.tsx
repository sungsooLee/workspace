import { isMobile } from 'react-device-detect';
import { EmptyText } from '@learnway/ui/empty-text';

import styles from './integrated-search-channel.module.css';
import { Button } from '@learnway/ui/button';

const IntegratedSearchChannelComponent = () => {
  return (
    <div className={`${styles.start} ${styles.channel}`}>
      {/* 검색결과 없음 */}
      <div className={styles.empty}>
        <EmptyText
          hideTitle
          size="lg"
          description={'검색 결과를 찾을 수 없습니다.'}
          footer={isMobile ? <Button variant={'primary'} size={'sm'} label={'교육요청'} /> : ''}
        />
      </div>
    </div>
  );
};

export const IntegratedSearchChannel = IntegratedSearchChannelComponent;
