import { useChannelHomeBannerList } from '@features/channel/channel-management/hooks/use-channel-home-banner-list';
import { IcoMinus } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { CountText } from '@learnway/ui/elements';
import { GridBox } from '@learnway/ui/grid';
import { LinkBox } from '@shared/ui/layout';
import { t } from 'i18next';
import { ChannelHomeBannerListProps } from '../../../types/type';

const ChannelDetailHomeBannerComponent = (props: ChannelHomeBannerListProps) => {
  const { onAddClick } = props;
  const { gridConfig, displayedCount, totalCount } = useChannelHomeBannerList(props);

  return (
    <>
      <FormSubTitle
        label={t('홈 배너 관리')}
        lineType="light"
        titleNode={
          <p className={formStyles.guide_text}>
            {t('노출 가능한 배너가 3개 이상인 경우 순서에 따라 최대 3개만 노출됩니다.')}
          </p>
        }
      />
      <GridBox
        config={gridConfig}
        multiple
        tableMode
        showTotalCount={false}
        titleCustomNode={
          <>
            <CountText label={t('노출')} count={displayedCount} />
            <CountText label={t('전체')} count={totalCount} />
          </>
        }
        customButtonNode={
          <>
            <LinkBox>
              <Button variant="text" size="sm" label={t('미리보기')} />
            </LinkBox>
            <Button
              variant="outline"
              size="sm"
              label={t('삭제')}
              icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
            />
            <Button variant="save" size="sm" label={t('등록')} onClick={onAddClick} />
          </>
        }
        disabledSelectionToggle
        hidePagination
      />
    </>
  );
};

export const ChannelDetailHomeBanner = ChannelDetailHomeBannerComponent;
