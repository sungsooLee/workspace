import { queryOptions } from '@entities/training-place';
import { CODE_GROUP, SearchBoxConfig, useFileManager, useSearchBox } from '@learnway/hooks';
import { IcoDownload } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { PreviewImage } from '@learnway/ui/preview-image';
import { SearchBox } from '@shared/ui/search-box';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { EnGlobalConst, EnPageMode } from '@types';
import { useCreation } from 'ahooks';
import { t } from 'i18next';
import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';

interface TrainingPlaceListProps {
  pageMode: EnPageMode;
  onSelect?: (data: any) => void;
  onAdd?: () => void;
}

const TrainingPlaceListComponent = (props: TrainingPlaceListProps, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'tenantId',
          type: 'dropdown',
          format: 'object',
          label: t('테넌트'),
          value: '',
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
          },
          presetOptionLabel: t('선택'),
        },
        {
          name: 'onOffLineType',
          type: 'dropdown',
          label: t('교육공간 타입'),
          value: '',
          presetOptionLabel: t('전체'),
          optionsConfig: {
            codeGroup: CODE_GROUP['lms.space.OnOffLineType'],
          },
        },
        {
          name: 'isUsed',
          type: 'dropdown',
          label: t('사용 여부'),
          value: '',
          options: [
            { value: '', label: t('전체') },
            { value: true, label: t('사용') },
            { value: false, label: t('미사용') },
          ],
        },
        {
          name: 'learningSpaceName',
          type: 'text',
          label: t('교육공간명'),
          value: '',
        },
      ],
    ],
  };

  const linkClick = (learningSpaceId: number) => {
    router.navigate({
      to: '/learning/training-place/detail',
      state: {
        learningSpaceId,
        listParam: getValues(),
      },
    });
  };

  const gridInitConfig = useCreation(
    () => ({
      query: queryOptions.list,
      columns: [
        {
          name: 'tenantName',
          label: t('테넌트'),
          size: 180,
        },
        {
          name: 'onOffLineType',
          label: t('교육공간 타입'),
          render: (info: any) =>
            t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.lms.space.OnOffLineType.${info.getValue()}`),
          size: 180,
        },
        {
          name: 'learningSpaceName',
          label: t('교육공간명'),
          render: (info: any) => {
            if (props.pageMode === EnPageMode.MODAL) return info.getValue();
            else
              return (
                <Button
                  className="link"
                  onClick={() => linkClick(info.row.original.learningSpaceId)}
                  label={info.row.original.learningSpaceName}
                />
              );
          },
        },
        {
          name: 'addressUrl',
          label: t('주소 / URL'),
          size: 390,
        },
        {
          name: 'isUsed',
          label: t('사용 여부'),
          render: (info: any) => (info.getValue() ? t('사용') : t('미사용')),
          size: 150,
          enableSorting: false,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'action',
          label: () => {
            switch (props.pageMode) {
              case EnPageMode.PAGE:
                return t('미리보기');
              case EnPageMode.MODAL:
                return t('선택');
            }
          },
          render: (info: any) => {
            if (props.pageMode === EnPageMode.PAGE) {
              switch (info.row.original.onOffLineType) {
                case 'ONLINE':
                  return (
                    <Button
                      variant="gray"
                      label={t('미리보기')}
                      onClick={() => window.open(info.row.original.preview, '_blank')}
                    />
                  );
                case 'OFFLINE':
                  if (info.row.original.preview.length > 0)
                    return (
                      <Button
                        variant="gray"
                        label={t('미리보기')}
                        onClick={() => onHandlePreview(info.row.original.preview)}
                      />
                    );
              }
            } else if (props.pageMode === EnPageMode.MODAL) {
              return (
                <Button variant="gray" label={t('선택')} onClick={() => onHandleSelect(info.row)} />
              );
            }
            return '';
          },
          enableSorting: false,
          size: 150,
          meta: {
            cellAlign: 'center',
          },
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 10,
        sort: [],
      },
    }),
    [],
  );

  const { openModal } = useModal();
  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, getValues);

  const { getFileInfo, fileDownload } = useFileManager();

  useEffect(() => {
    const init = async () => {
      const listParam = routerState.location.state.listParam;
      if (listParam) {
        onFormChange(listParam);
        if (await onFormValid()) {
          handleOnSearch(getValues());
        }
      }
    };
    init();
  }, []);

  const handleOnSearch = useCallback(
    (data: any) => {
      gridFetch(data);
    },
    [gridFetch],
  );

  useImperativeHandle(ref, () => ({
    reload() {
      console.log('reload');
      gridFetch();
    },
  }));

  const onHandleSelect = (row: any) => {
    if (props.onSelect) props.onSelect(row.original);
  };

  const onHandlePreview = async (preview: string) => {
    const mapFile = await getFileInfo(preview);
    if (mapFile && mapFile.fileUrl) {
      console.log('### fileUrl', mapFile.fileUrl);
      openModal({
        width: 'full',
        height: 'full',
        content: <PreviewImage imageUrl={mapFile.fileUrl} />,
        headerActionNode: (
          <Button onlyIcon onClick={() => fileDownload(preview)}>
            <IcoDownload width={40} height={40} stroke="#131C30" />
          </Button>
        ),
      });
    }
  };

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        title={t('교육공간 목록')}
        showAdd={props.pageMode === EnPageMode.MODAL}
        onAddClick={props.onAdd}
        disabledSelectionToggle
        showNumberingColumn
      />
    </>
  );
};

export const TrainingPlaceList = forwardRef(TrainingPlaceListComponent);
