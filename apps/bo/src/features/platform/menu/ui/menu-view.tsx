import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { cn } from '@learnway/shared';
import { Button, ContentsRow, DynamicFormField, GridBox, TreeNode, useModal } from '@learnway/ui';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { DuplicateCodeGuideText } from './menu-code-input';
import { MenuApiMappingModal } from './menu-api-mapping-modal';
import { ApiInfoModal } from './api-info-modal';
import { findMenuPathById } from '../service/menu.service';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { useCheckExistsMenu, useMenuManageDetail } from '../../../../entities/menu';
import { ContentsHistoryInfoFormField, FormRow } from '../../../../shared/ui';
import { useRouter } from '@tanstack/react-router';

const columnHelper = createColumnHelper<any>();

const MenuViewComponent: FC<any> = ({
  treeData,
  selectedNode,
  mode,
  parentNode,
  menuScope,
  onSave,
  onUpdate,
  onDelete,
}) => {
  const { data, isLoading } = useMenuManageDetail(
    mode !== 'add' && selectedNode ? selectedNode.menuId : undefined,
  );
  const { open: openModal, confirm: openConfirm } = useModal();
  const router = useRouter();

  // TODO: 역할에 따라서 메타 설정이 다르면 Config 설정 어떻게 분기 처리?
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);
  const [isSuccessCodeCheck, setIsSuccessCodeCheck] = useState(false);
  const [codeCheckState, setCodeCheckState] = useState<'none' | 'success' | 'duplicate' | 'error'>(
    'none',
  );
  const initialFromValuesRef = React.useRef<any>(null);

  const { checkExistsMenu } = useCheckExistsMenu({
    onSuccess: (data: any) => {
      const isUnique = !data;
      setIsSuccessCodeCheck(isUnique);
      setCodeCheckState(isUnique ? 'success' : 'duplicate');
      onFormChange?.({
        isDuplicateMenuCode: isUnique,
      });
    },
    onError: () => {
      setIsSuccessCodeCheck(false);
      setCodeCheckState('error');
      onFormChange?.({ isDuplicateMenuCode: false });
    },
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (mode === 'view') {
      const location = findMenuPathById(treeData, selectedNode.menuId);
      if (data) {
        const formData = {
          key: data.menuId?.toString() || '',
          parentKey: data.parentId?.toString() || '',
          isUsed: data.isUsed || false,
          location: location || '', // 경로 생성 함수
          code: data.menuCode || '',
          title: data.menuName || t(`${data.menuCode}`),
          url: data.path || '',
          isPersoninfoInclusion: data.isPersoninfoInclusion || false,
          menuDesc: data.menuDesc || '',
          parentMenuName: data.parentCode,
          isWebExposed: data?.isWebExposed,
          isMobileExposed: data?.isMobileExposed,
          hiddenYn: data?.hiddenYn || false,
          visible: [
            data.isWebExposed === true && 'isWebExposed',
            data.isMobileExposed === true && 'isMobileExposed',
          ].filter(Boolean),
          isDuplicateMenuCode: true, // view 모드에서는 기본적으로 중복 체크 통과로 설정
          apiMappingMenuList: data?.apiMappingMenuList,
        };

        initialFromValuesRef.current = { ...formData };

        setCodeCheckState('none');
        fetchData(formData);
      }
    } else if (mode === 'add' && parentNode) {
      initialFromValuesRef.current = null;
      const location = findMenuPathById(treeData, parentNode.menuId);
      const initialData = {
        key: '', // 신규 메뉴는 키 없음
        parentKey: parentNode.key || '',
        parentMenuName: parentNode.title,
        isUsed: true,
        location: location,
        code: '',
        title: '',
        url: '',
        isPersoninfoInclusion: false,
        menuDesc: '',
        isDuplicateMenuCode: false,
        visible: ['isWebExposed'],
        hiddenYn: false,
        apiMappingMenuList: [],
      };
      fetchData(initialData);
    } else if (mode === 'init') {
      const initialData = {
        key: '',
        parentKey: '',
        parentMenuName: '',
        isUsed: false,
        location: '',
        code: '',
        title: '',
        url: '',
        isPersoninfoInclusion: false,
        menuDesc: '',
        isDuplicateMenuCode: false,
        visible: [],
        hiddenYn: false,
      };
      fetchData(initialData);
    }
  }, [data, selectedNode, mode, parentNode, isLoading]);

  // 폼 초기화를 처리하는 핸들러
  const handleReset = async () => {
    // onFormChange();
    const isReset = await openConfirm({
      title: '초기화 하시겠습니까?',
    });
    if (isReset) onFormChange();
  };

  const isFieldChanged = (fieldName: string, currentValue: any) => {
    if (!initialFromValuesRef.current) return true; // 초기 값이 없으면 변경된 것으로 간주
    return initialFromValuesRef.current[fieldName] !== currentValue;
  };

  const handleCodeChange = (newCode: string) => {
    const isChanged = isFieldChanged('code', newCode);

    if (onFormChange) {
      // 코드가 변경됐을 경우에만 중복 체크 필요
      onFormChange({
        isDuplicateMenuCode: !isChanged && mode === 'view',
      });
      setCodeCheckState(!isChanged && mode === 'view' ? 'success' : 'none');
    }
  };

  const handleOnSubmit = (node: any) => {
    console.log(node.apiMappingMenuList);
    const isMobileExposed = node.visible.find((element: string) => element === 'isMobileExposed')
      ? true
      : false;
    const isWebExposed = node.visible.find((element: string) => element === 'isWebExposed')
      ? true
      : false;
    const apiMappingKeys = [] as number[];
    node.apiMappingMenuList.forEach((i: any) => apiMappingKeys.push(i.apiId));
    // View 모드에서 저장 처리
    if (mode === 'view') {
      // 메뉴 코드가 변경되었는지 확인
      const isCodeChanged = isFieldChanged('code', node.code);

      // 코드가 변경되지 않았으면 중복 체크 없이 진행
      if (!isCodeChanged) {
        // 수정 API 호출을 위한 데이터 준비
        const updateData = {
          menuId: selectedNode.menuId,
          menuCode: node.code,
          parentId: node.parentKey,
          menuName: node.title,
          isDeleted: false,
          hiddenYn: node.hiddenYn,
          isUsed: true,
          isWebExposed: isWebExposed,
          isMobileExposed: isMobileExposed,
          menuDesc: node.menuDesc,
          isPersoninfoInclusion: node.isPersoninfoInclusion,
          sortOrder: 1,
          path: node.url,
          menuScope: menuScope,
          apiMappingMenuList: apiMappingKeys,
        };

        // 수정 API 호출
        onUpdate(updateData);
        return;
      }
    }
    if (codeCheckState === 'none') {
      setFormError?.('code', '메뉴 코드의 중복 여부를 확인해 주세요.');
      return;
    }

    if (!isSuccessCodeCheck || codeCheckState === 'duplicate') {
      setFormError?.('code', '이미 사용 중인 메뉴 코드입니다.');
      return;
    }
    const tmpData = {
      menuCode: node.code,
      parentId: node.parentKey,
      isDeleted: false,
      hiddenYn: node.hiddenYn,
      isUsed: true,
      isWebExposed: isWebExposed,
      isMobileExposed: isMobileExposed,
      menuDesc: node.menuDesc,
      isPersoninfoInclusion: node.isPersoninfoInclusion,
      sortOrder: 1,
      path: node.url,
      menuScope: menuScope,
      menuName: node.title,
      apiMappingMenuList: apiMappingKeys,
    };
    onSave(tmpData);
  };

  const handleDelete = () => {
    const deleteNode = {
      menuId: selectedNode.menuId,
    };
    onDelete(deleteNode);
  };

  const getTitle = () => {
    if (mode === 'add') {
      return parentNode ? `${parentNode.title} 하위 메뉴 추가` : '메뉴 추가';
    }
    return '메뉴 정보';
  };

  const isInitMode = mode === 'init';

  const handleApiMapping = async () => {
    const selectedApiKeys = getValues('apiMappingMenuList');
    const keyArray = selectedApiKeys.map((item: TreeNode) => item.apiId.toString());

    const selectApis = await openModal({
      content: <MenuApiMappingModal menuScopeCode={menuScope} selectedApiKeys={keyArray} />,
      width: 'lg',
    });
    console.log(getValues());
    fetchData({ ...getValues(), apiMappingMenuList: [...selectApis] });
  };

  // API 정보 컬럼
  const columns = [
    columnHelper.accessor('apiName', {
      cell: (info) => info.getValue(),
      header: '분류',
      size: 120,
      // enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('apiId', {
      cell: (info: CellContext<any, string>) => {
        const rowData = info.row.original;
        return (
          <p
            className="cursor-pointer underline"
            onClick={() => {
              openModal({
                content: <ApiInfoModal apiId={rowData.apiUuid} />,
                width: 's',
                closeOnOutsideClick: true,
              });
            }}
          >
            {info.getValue()}
          </p>
        );
      },
      header: 'API',
      size: 490,
      // enableGrouping: false,
    }),
    columnHelper.accessor('Delete', {
      cell: (info) => {
        return (
          <Button
            onClick={() => {
              // 현재 row의 데이터 가져오기
              const rowData = info.row.original;
              // 현재 apiMappingMenuList 가져오기
              const currentApiList = getValues('apiMappingMenuList') || [];
              // 해당 row를 제외한 새 배열 생성 (apiId로 필터링)
              const updatedApiList = currentApiList.filter(
                (item: any) => item.apiId !== rowData.apiId,
              );
              fetchData({ ...getValues(), apiMappingMenuList: updatedApiList });
            }}
          >
            삭제
          </Button>
        );
      },
      header: '삭제',
      size: 100,
      // enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <div className={layoutStyles.inner}>
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{getTitle()}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              type="button"
              variant="text"
              size="sm"
              onClick={handleReset}
              disabled={isInitMode}
              className={layoutStyles.btn_text}
            >
              초기화
            </Button>
            <Button
              variant="text"
              size="sm"
              disabled={isInitMode || mode === 'add'}
              onClick={handleDelete}
              className={layoutStyles.btn_text}
            >
              삭제
            </Button>
            <Button type="submit" variant="save" size="sm" disabled={isInitMode}>
              저장
            </Button>
          </div>
        </div>
        {/* 폼 필드 - location (비활성화 상태) */}

        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'location'} disabled={true} />
            </FormRow>
          </ContentsRow>

          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'parentMenuName'} disabled={true} />
            </FormRow>
          </ContentsRow>

          {/* 폼 필드 - code */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'code'}>
                <DuplicateCodeGuideText
                  clearFormError={clearFormError}
                  checkExistsMenu={checkExistsMenu}
                  isSuccess={isSuccessCodeCheck}
                  disabled={isInitMode}
                  codeCheckState={codeCheckState}
                  handleCodeChange={handleCodeChange}
                  setFormError={setFormError}
                  menuScope={menuScope}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>

          {/* 폼 필드 - title */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'title'} disabled={isInitMode} />
              <Button
                type="button"
                variant="gray"
                size="sm"
                disabled={mode !== 'view'}
                onClick={() => {
                  const menuCode = getValues('code');
                  const menuName = getValues('title');
                  router.navigate({
                    to: '/platform/system/multilingual',
                    state: {
                      keyType: menuScope === 'FO' ? 'LEARNER_MENU' : 'HRD_CENTER_MENU',
                      multilinguaKey: menuCode,
                      translation: menuName,
                    },
                  });
                }}
              >
                다국어 관리
              </Button>
            </FormRow>
          </ContentsRow>

          {/* 폼 필드 - url */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'url'} disabled={isInitMode} />
            </FormRow>
          </ContentsRow>

          {/* 폼 필드 - description */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'menuDesc'} disabled={isInitMode} />
            </FormRow>
          </ContentsRow>

          <ContentsRow type={'horizontal'} className={'inactive'}>
            <FormRow provider={provider}>
              <DynamicFormField name={'hiddenYn'} disabled={isInitMode} />
            </FormRow>
          </ContentsRow>

          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'visible'} disabled={isInitMode} />
            </FormRow>
          </ContentsRow>

          <ContentsRow type={'horizontal'} className={'inactive'}>
            <FormRow provider={provider}>
              <DynamicFormField name={'isPersoninfoInclusion'} disabled={isInitMode} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'apiMappingMenuList'}>
                <GridBox
                  data={getValues('apiMappingMenuList') || []}
                  columns={columns}
                  showTotalCount={true}
                  title={t('API')}
                  customButtonNode={
                    <Button
                      variant="text"
                      onClick={() => handleApiMapping()}
                      disabled={isInitMode}
                      className={layoutStyles.btn_text}
                    >
                      추가
                    </Button>
                  }
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow className={cn(formStyles.no_line, formStyles.space)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </div>
      </form>
    </div>
  );
};

export default MenuViewComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'key',
      type: 'text',
      label: t('키'),
      value: '',
    },
    {
      name: 'parentKey',
      type: 'text',
      label: t('부모키'),
      value: '',
    },
    {
      name: 'isUsed',
      type: 'custom',
      value: false,
    },
    {
      name: 'location',
      type: 'text',
      label: t('메뉴 위치'),
      value: '',
    },
    {
      label: t('상위 메뉴명'),
      name: 'parentMenuName',
      type: 'text',
      value: '',
    },
    {
      label: t('메뉴 코드'),
      name: 'code',
      type: 'custom',
      maxLength: 20,
      value: '',
    },
    {
      label: t('메뉴명'),
      name: 'title',
      type: 'text',
      maxLength: 10,
      value: '',
    },
    {
      label: t('메뉴 URL'),
      name: 'url',
      type: 'text',
      maxLength: 50,
      value: '',
    },
    {
      label: t('개인정보'),
      tooltip: '개인정보를 사용하는 경우 엑셀 다운로드 시 사유를 입력해야 합니다.',
      name: 'isPersoninfoInclusion',
      type: 'switch',
      value: false,
    },
    {
      label: t('Hidden 메뉴'),
      tooltip: 'Hidden메뉴 적용 시 메뉴에 API가 매칭 되나, 메뉴 자체는 화면에서 숨김처리가 됩니다.',
      name: 'hiddenYn',
      type: 'switch',
      value: false,
    },
    {
      label: t('메뉴 설명'),
      name: 'menuDesc',
      type: 'textarea',
      maxLength: 100,
      value: '',
    },
    {
      name: 'isDuplicateMenuCode',
      type: 'hidden',
      format: 'boolean',
      value: false,
    },
    {
      name: 'visible',
      type: 'checkbox-group',
      label: t('디바이스 노출 여부'),
      format: 'array',
      value: [],
      options: [
        {
          value: 'isWebExposed',
          label: 'PC',
        },
        {
          value: 'isMobileExposed',
          label: '모바일',
        },
      ],
    },
    {
      name: 'apiMappingMenuList',
      type: 'custom',
      format: 'array',
      value: [],
    },
  ],
  validator: {
    isDuplicateMenuCode: {
      required: {
        fn: (values) => {
          return values.isDuplicateMenuCode === true;
        },
        message: t('메뉴 코드의 중복 여부를 확인해주세요.'),
        path: 'code',
      },
      conditions: [],
    },
    code: {
      required: true,
    },
    title: {
      required: true,
    },
    url: {
      required: true,
    },
    visible: {
      required: {
        fn: (values) => {
          return !values.isMobileExposed && !values.isWebExposed;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
  },
};
