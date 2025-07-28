import { IcoMinus } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { Button, FormSubTitle, TableBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { LinkBox } from '@shared/ui';
import { t } from 'i18next';

interface ChannelDetailHomeBannerProps {
  onAddClick: () => void;
}

const ChannelDetailHomeBannerComponent = ({ onAddClick }: ChannelDetailHomeBannerProps) => {
  const { config, gridFetch } = useGridBox(gridConfig());
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
      <TableBox
        config={config}
        multiple
        tableMode
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
      />
    </>
  );
};

export const ChannelDetailHomeBanner = ChannelDetailHomeBannerComponent;

const gridConfig = (): useGridBoxConfig => ({
  query: '',
  columns: [
    {
      name: 'thumbnail',
      label: t('썸네일'),
      size: 100,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'bannerType',
      label: t('배너 유형'),
      size: 120,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'bannerName',
      label: t('배너명'),
    },
    {
      name: 'period',
      label: t('게재 기간'),
      size: 220,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'status',
      label: t('상태'),
      size: 140,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'viewCount',
      label: t('노출'),
      size: 100,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'clickCount',
      label: t('클릭'),
      size: 100,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'modifiedDate',
      label: t('수정일'),
      size: 250,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'isView',
      label: t('노출여부'),
      size: 120,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'move',
      label: t('순서 이동'),
      size: 90,
      meta: {
        cellAlign: 'center',
      },
    },
  ],
});
