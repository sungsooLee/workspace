import { useFetchUser } from '@entities/users';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { FormSubTitle } from '@learnway/ui/base-form';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { EnGlobalConst } from '@shared/types/enums';
import { t } from 'i18next';
import { forwardRef, useCallback, useImperativeHandle } from 'react';

import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import { useModal } from '@learnway/ui/modal';
import { useToast } from '@learnway/ui/toast';
import { SearchBox } from '@shared/ui';
import { createColumnHelper } from '@tanstack/react-table';

interface ChannelDetailSubscriberDetailProps {
  userUuid: string;
  onUnsubscribe: () => void;
}

const ChannelDetailSubscriberDetailComponent = (
  props: ChannelDetailSubscriberDetailProps,
  ref: any,
) => {
  const { confirm: openConfirm } = useModal();
  const { open: openToast } = useToast();
  const { data: user } = useFetchUser(props.userUuid);

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const searchParam = () => {
    const data = getValues();
    const searchData = {
      ...data,
      userUuid: props.userUuid,
      subscribeStartDate: data.subscribeDate.from
        ? getDateToString(new Date(data.subscribeDate.from), 'YYYYMMDD')
        : '',
      subscribeEndDate: data.subscribeDate.to
        ? getDateToString(new Date(data.subscribeDate.to), 'YYYYMMDD')
        : '',
      unsubscribeStartDate: data.unsubscribeDate.from
        ? getDateToString(new Date(data.unsubscribeDate.from), 'YYYYMMDD')
        : '',
      unsubscribeEndDate: data.unsubscribeDate.to
        ? getDateToString(new Date(data.unsubscribeDate.to), 'YYYYMMDD')
        : '',
    };
    return searchData;
  };

  const { config: gConfig, gridFetch } = useGridBox(gridConfig, searchParam);

  useImperativeHandle(ref, () => ({
    cancelSubscribe() {
      openConfirm({
        title: t('구독을 해지하시겠습니까?'),
        content: (
          <p>
            {t('선택한 구독자의 채널 구독이 해지됩니다.')}
            <br />
            {t('해지 시 사용자에게 알림이 발송됩니다.')}
          </p>
        ),
        onClose: (value: boolean) => {
          if (value) {
            console.log('#### cancelSubscribe', value);
            openToast({ title: t('구독을 해지 하였습니다.'), type: 'success' });
            props.onUnsubscribe();
          }
        },
      });
    },
  }));

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(searchParam());
  }, []);

  return (
    <>
      <FormSubTitle label={t('유저 정보')} noLine />
      <div className={cn(tableStyles.start, tableStyles.wrap, 'pb-10')}>
        <table>
          <caption>{t('유저 정보')}</caption>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{t('회원 유형')}</th>
              <td>
                {user?.linkageSystem
                  ? t(
                      `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.LinkageSystem.${user.linkageSystem}`,
                    )
                  : '-'}
              </td>
              <th scope="row">{t('이름')}</th>
              <td>{user?.name}</td>
              <th scope="row">{t('사번')}</th>
              <td>{user?.employeeNumber}</td>
            </tr>
            <tr>
              <th scope={'row'}>{t('회원가입일')}</th>
              <td>
                {user?.linkageSystem === null
                  ? user?.createdDate
                    ? getDateToString(new Date(user?.createdDate), DATE_TIME_FORMAT.DATETIME_SEC)
                    : '-'
                  : user?.joinDate
                    ? getDateToString(new Date(user?.joinDate), DATE_TIME_FORMAT.DATETIME_SEC)
                    : '-'}
              </td>
              <th scope={'row'}>{t('최근 접속일')}</th>
              <td>
                {user?.lastLoginDate
                  ? getDateToString(new Date(user.lastLoginDate), DATE_TIME_FORMAT.DATETIME_SEC)
                  : '-'}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <FormSubTitle label={t('구독자 정보')} noLine />
      <div className={cn(tableStyles.start, tableStyles.wrap)}>
        <table>
          <caption>{t('구독자 정보')}</caption>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{t('테넌트')}</th>
              <td>완성차 테넌트</td>
              <th scope="row">{t('회사')}</th>
              <td>현대자동차</td>
              <th scope="row">{t('소속')}</th>
              <td>경영관리1팀</td>
            </tr>
            <tr>
              <th scope="row">{t('구독 방식')}</th>
              <td>수동 구독</td>
              <th scope="row">{t('상태')}</th>
              <td>재구독</td>
              <th scope="row">{t('구독 신청일')}</th>
              <td>2025-01-01 15:00:00</td>
            </tr>
            <tr>
              <th scope="row">{t('구독 해지일')}</th>
              <td>2025-01-01 15:00:00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <FormSubTitle label={t('구독/해지 이력')} />
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <GridBox
        config={gConfig}
        columns={columns}
        showNumberingColumn
        disabledSelectionToggle
        title={t('구독/해지 이력')}
      />
    </>
  );
};

export const ChannelDetailSubscriberDetail = forwardRef(ChannelDetailSubscriberDetailComponent);

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'channelSubscribeStatus',
        type: 'dropdown',
        label: t('상태'),
        value: '',
        options: [
          { label: t('구독'), value: 'A' },
          { label: t('해지'), value: 'B' },
          { label: t('재구독'), value: 'C' },
        ],
        presetOptionLabel: t('전체'),
      },
      {
        name: 'updateDivision',
        type: 'dropdown',
        label: t('수정 구분'),
        value: '',
        options: [
          { label: t('사용자'), value: 'A' },
          { label: t('관리자'), value: 'B' },
        ],
        presetOptionLabel: t('전체'),
      },
      {
        name: 'subscribeDate',
        label: '구독 신청 기간',
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined,
        },
      },
      {
        name: 'unsubscribeDate',
        label: '구독 해지 기간',
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 1000,
    sort: [],
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('channelSubscriptionType', {
    cell: (info) => info.getValue(),
    header: t('구독 방식'),
    enableGrouping: false,
  }),
  columnHelper.accessor('channelSubscribeStatus', {
    cell: (info) => info.getValue(),
    header: t('상태'),
    enableGrouping: false,
  }),
  columnHelper.accessor('updateDivision', {
    cell: (info) => info.getValue(),
    header: t('수정 구분'),
    enableGrouping: false,
  }),
  columnHelper.accessor('modifiedBy', {
    cell: (info) => info.getValue(),
    header: t('수정자'),
    enableGrouping: false,
  }),
  columnHelper.accessor('subscribeDate', {
    cell: (info) => info.getValue(),
    header: t('구독 신청일'),
    enableGrouping: false,
  }),
  columnHelper.accessor('unsubscribeDate', {
    cell: (info) => info.getValue(),
    header: t('구독 해지일'),
    enableGrouping: false,
  }),
];
