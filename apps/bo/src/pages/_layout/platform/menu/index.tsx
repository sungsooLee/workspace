import { createFileRoute } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, Switch, TreeEventPayload, TreeView } from '@learnway/ui';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import React, { FC, useEffect } from 'react';
import { ContentsRow } from '../../../../widgets/layout/ui/container/parts/contents-row';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useDynamicForm from '../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { DynamicFormConfig } from '../../../../shared/ui/dynamic-form-field';
import { useFieldArray } from 'react-hook-form';
import { useMenuMangerFetchMenus } from '../../../../entities/menu/service/menu-manager.hook';
import { useQueryClient } from '@tanstack/react-query';
import { menuManagerQueryOptions } from '../../../../entities/menu/service/menu-manager.queries';
import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
export const Route = createFileRoute('/_layout/platform/menu/')({
  component: RouteComponent,
});

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'eventMenu',
      type: 'custom',
      value: [],
    },
    {
      name: 'gnbMenu',
      type: 'custom',
      value: [],
    },
  ],
  validator: {},
};

function RouteComponent() {
  const { data: menuData, isLoading } = useMenuMangerFetchMenus();
  const queryClient = useQueryClient();
  const { control, fetchData, onSubmit, onFormChange } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log(data);
  };

  const init = async () => {
    /*const result = await httpService.get<any>(
      `http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/pms-module/admin/api/v1/menus`,
    );
    console.log(result);*/
    console.log(await queryClient.fetchQuery(menuManagerQueryOptions.all()));
    console.log('menuData => ', menuData);
  };

  useEffect(() => {
    init();
  }, [menuData]);

  useEffect(() => {
    fetchData({
      eventMenu: [
        {
          id: 1,
          isUsed: true,
          menus: [
            {
              key: '1',
              title: '이벤트 메뉴 1',
            },
            {
              key: '1',
              title: '이벤트 메뉴 1',
            },
            {
              key: '1',
              title: '이벤트 메뉴 1',
              children: [
                {
                  key: '1',
                  title: '이벤트 메뉴 1',
                },
              ],
            },
            {
              key: '1',
              title: '이벤트 메뉴 1',
            },
          ],
        },
      ],
      gnbMenu: [
        {
          id: 1,
          isUsed: true,
          menus: [
            {
              key: '1',
              title: 'GNB 메뉴 1',
            },
          ],
        },
        {
          id: 2,
          isUsed: true,
          menus: [
            {
              key: '1',
              title: 'GNB 메뉴 2',
            },
          ],
        },
      ],
    });
  }, []);
  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="button" variant="point" size="sm" onClick={() => onFormChange()}>
            초기화
          </Button>
          <Button type="submit" variant="point" size="sm">
            저장
          </Button>
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <MenuContainer
              control={control}
              name={'eventMenu'}
              title={'이벤트 메뉴'}
              maxLength={2}
            />
          </ContentsRow>
          <ContentsRow>
            <MenuContainer control={control} name={'gnbMenu'} title={'GNB 메뉴'} maxLength={2} />
          </ContentsRow>
        </MainContents>
      </PageContainer>
    </form>
  );
}

const Title: FC<any> = ({ title }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button type={'button'} variant="point" size="sm">
            + 메뉴추가
          </Button>
        </div>
      </div>
      <hr className="mt-2 w-full border-t-2 border-gray-900" />
    </div>
  );
};
const MenuContainer: FC<any> = ({ control, name, title, maxLength }) => {
  /*
  배열형태의 데이터가 아니면 useController 사용 가능
  const {
    field: { value: values, onChange },
  } = useController({
    name,
    control,
  });*/
  const { fields, append, update, move } = useFieldArray({
    control,
    name: name,
  });

  // 드래그가 끝났을 때 실행되는 콜백
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // 드래그가 끝난 위치(over)가 있고, 위치가 바뀌었다면 재정렬
    if (over && active.id !== over.id) {
      const newIndex = fields.findIndex((field) => field.id === active.id);
      const oldIndex = fields.findIndex((field) => field.id === over.id);
      return move(oldIndex, newIndex);
    }
  };

  const handleAddMenu = () => {
    console.log('add menu');
  };

  const handleChangeRow = (menus: any, isUsed: any, index: number) => {
    update(index, {
      menus: menus,
      isUsed: isUsed,
    });
  };

  return (
    <div className={'w-full'}>
      <Title title={title} onClick={handleAddMenu} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}>
          {fields &&
            fields.map((field: any, index: number) => (
              <MenuRow
                key={index}
                id={field.id}
                menu={field}
                onChange={(menu: any, isUsed: any) => handleChangeRow(menu, isUsed, index)}
              />
            ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

const MenuRow: FC<any> = ({ id, menu, onChange }) => {
  const handleAction = (payload: TreeEventPayload) => {
    console.log('payload => ', payload);
    switch (payload.type) {
      case 'NODE_SELECT':
        break;
      case 'NODE_MOVE':
        break;
      case 'NODE_COPY':
        break;
    }
  };

  // useSortable 훅을 사용해 드래그/드롭 기능 활성화
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  // 전체 로우 스타일 (드래그 애니메이션 포함)
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '8px 12px',
    marginBottom: '4px',
    backgroundColor: isDragging ? '#f0f0f0' : '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  // 햄버거 아이콘 스타일 (드래그 핸들)
  const handleStyle: React.CSSProperties = {
    padding: '4px',
    cursor: 'grab',
    userSelect: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* 항목 내용 */}
      <span>
        <TreeView treeId="source" data={menu.menus} onAction={handleAction} />
      </span>
      <div className={'flex gap-10'}>
        <Switch checked={menu.isUsed} onChange={(checked) => onChange(menu.menus, checked)} />
        {/* 여기서만 드래그 이벤트를 적용 */}
        <div {...listeners} style={handleStyle}>
          ☰
        </div>
      </div>
    </div>
  );
};
