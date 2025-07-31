import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { pageRouteConfig } from '@features/auth';
import { FormTranslationBox } from '@shared/ui/form';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormRow } from '@shared/ui';
import { useWidgets } from '@entities/widgets';
import { WidgetPreviewButton } from '@features/platform';
import { WidgetComponentTable } from '@features/platform-management/platform/widget-managemnet/ui/widget-component-table';
import { WidgetAssignedTenantGrid } from '@features/platform-management/platform/widget-managemnet/ui/widget-assigned-tenant-grid';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';

export const Route = createFileRoute('/_layout/platform/system/widget/view')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      widgetCode: {
        format: 'string',
        required: true } } }) });

function RouteComponent() {
  const router = useRouter();
  const { widgetCode, processType, getWidget } = useWidgets();

  const { provider, control, onSubmit, updateFormData, getValues, onFormChange, setFormError } =
    useDynamicForm(formConfig);

  const data = useWatch({
    control });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const widget = (await getWidget(widgetCode)) as any;

    const values = {
      ...widget,
      devices: [] };
    updateFormData(values);
  };

  /**
   * 목록으로 이동
   */
  const handleGoToListPage = () => {
    router.navigate({ to: '/platform/system/widget' });
  };

  return (
    processType !== 'LOADING' && (
      <form>
        <PageContainer>
          <ContentsButtons>
            <Button type="button" variant="primary" size="sm" onClick={handleGoToListPage}>
              목록
            </Button>
          </ContentsButtons>
          <MainContents>
            <ContentsRow>
              <FormRow provider={provider} name={'widgetName'}>
                <WidgetPreviewButton widget={data as any} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'widgetDesc'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={`deviceNames`} element={<FormTranslationBox />} />
              <FormRow provider={provider} name={'isUsed'} />
            </ContentsRow>
            <ContentsRow type="horizontal">
              <FormRow provider={provider} name={'isSecurityContent'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'components'}
                element={data?.components && <WidgetComponentTable data={data.components} />}
              />
            </ContentsRow>
            <ContentsRow>
              {data?.components && <WidgetAssignedTenantGrid data={data.tenantWidgetList} />}
            </ContentsRow>
          </MainContents>
        </PageContainer>
      </form>
    )
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'widgetName',
      type: 'text',
      label: '위젯명',
      value: '',
      disabled: true },
    {
      name: 'widgetDesc',
      type: 'textarea',
      label: '위젯설명',
      value: '',
      disabled: true },
    {
      name: 'deviceNames',
      type: 'checkbox-group',
      label: '디바이스',
      value: [],
      options: [
        {
          value: 'PC',
          label: 'PC' },
        {
          value: 'Mobile',
          label: 'Mobile' },
      ],
      disabled: true },
    {
      name: 'isUsed',
      type: 'radio-group',
      label: '사용여부',
      value: true,
      options: [
        {
          value: true,
          label: '사용' },
        {
          value: false,
          label: '미사용' },
      ],
      disabled: true },
    {
      name: 'isSecurityContent',
      type: 'switch',
      label: '보안컨텐츠여부',
      format: 'boolean',
      switchConfig: {
        label: (value: boolean) => (value ? '보안 적용' : '보안 미적용') },
      guideText: '보안콘텐츠 미 설정 시 학습자원의 불법 배포와 보안 위협에 취약합니다',
      value: true,
      disabled: true },
    {
      name: 'components',
      type: 'custom',
      label: '컴포넌트 ID',
      value: [] },
  ],
  validator: {} };
