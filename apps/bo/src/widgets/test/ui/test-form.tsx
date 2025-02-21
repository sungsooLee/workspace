import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import { Button, FieldType, useModal } from '@learnway/ui';
import { DynamicFormField } from '../../../shared/ui/dynamic-form-field';

const fetchFormData = (): Promise<any> => {
  const mockData = {
    name: '초기 텍스트',
    startAmount: 10000,
    endAmount: 5000,
    checkbox: true,
    type: 'type1',
    categories: ['category2'],
    switch: true,
    notificationType: 'mentions',
    birthDate: new Date(),
    dateRange: { from: new Date(), to: new Date() },
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
};

const TestForm = () => {
  const { t } = useTranslation();

  const { data: formData, isLoading } = useQuery({
    queryKey: ['formData'],
    queryFn: fetchFormData,
  });
  const { close: closeModal } = useModal();
  const schema = z.object({
    name: z.string().min(2, {
      message: t('validation.min', { field: t('form.name'), min: 2 }),
    }),
    type: z
      .string({
        required_error: t('validation.required', { field: t('form.type') }),
      })
      .min(1, {
        message: t('validation.required', { field: t('form.type') }),
      }),
    startAmount: z.coerce
      .number({
        required_error: t('validation.required', {
          field: t('form.startAmount'),
        }),
        invalid_type_error: t('validation.invalidNumber', {
          field: t('form.startAmount'),
        }),
      })
      .min(1, {
        message: t('validation.min', {
          field: t('form.startAmount'),
          min: 1,
        }),
      }),
    endAmount: z.coerce
      .number({
        required_error: t('validation.required', {
          field: t('form.endAmount'),
        }),
        invalid_type_error: t('validation.invalidNumber', {
          field: t('form.endAmount'),
        }),
      })
      .min(0),
    categories: z
      .array(z.string())
      .min(1, {
        message: t('validation.minArrayLength', {
          field: t('form.categories'),
          min: 1,
        }),
      })
      .default([]),
    checkbox: z.boolean().optional(),
    switch: z.boolean().optional().default(false),
    notificationType: z.enum(['all', 'mentions', 'none'], {
      required_error: t('validation.required', {
        field: t('form.notificationType'),
      }),
    }),
    birthDate: z.date().optional(),
    dateRange: z.object({
      from: z.date({
        required_error: 'A start date is required',
      }),
      to: z.date({
        required_error: 'An end date is required',
      }),
    }),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      startAmount: 0,
      endAmount: 0,
      checkbox: false,
      type: '',
      categories: [],
      switch: true,
      notificationType: 'none',
      birthDate: new Date(),
      dateRange: { from: new Date(), to: new Date() },
    },
    values: formData,
  });
  const handleSubmit = (data: any) => {
    console.log(data);
    closeModal({ data: data });
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <>
      {/*<Form {...form} schema={schema}>*/}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <DynamicFormField name="name" label={t('form.name')} type={FieldType.TEXT} />

            <DynamicFormField
              name="type"
              label={t('form.type')}
              type={FieldType.SELECT}
              options={[
                { value: 'type1', label: t('form.types.type1') },
                { value: 'type2', label: t('form.types.type2') },
              ]}
            />

            <div className="col-span-2 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <DynamicFormField
                  name="startAmount"
                  label={t('form.startAmount')}
                  type={FieldType.NUMBER}
                  // currency="KRW"
                  decimalScale={0}
                  thousandSeparator={true}
                />

                <DynamicFormField
                  name="endAmount"
                  label={t('form.endAmount')}
                  type={FieldType.NUMBER}
                  decimalScale={2}
                  thousandSeparator={true}
                />
              </div>
            </div>
          </div>
          <DynamicFormField
            name="categories"
            label={t('form.categories')}
            type={FieldType.MULTI_SELECT}
            options={[
              {
                value: 'category1',
                label: t('form.categories.category1'),
              },
              {
                value: 'category2',
                label: t('form.categories.category2'),
              },
            ]}
            maxCount={3}
            variant="default"
            placeholder={t('form.categories.placeholder')}
          />
          <DynamicFormField
            name="checkbox"
            label={t('form.checkbox')}
            type={FieldType.CHECKBOX}
            checkboxLabel="test checkbox"
          />
          <DynamicFormField
            name="switch"
            label={t('form.switch')}
            type={FieldType.SWITCH}
            formLabel="test switch"
          />
          <DynamicFormField
            name="notificationType"
            label={t('form.notificationType')}
            type={FieldType.RADIO}
            options={[
              {
                value: 'all',
                label: t('form.notificationType.all'),
                description: t('form.notificationType.allDescription'),
              },
              {
                value: 'mentions',
                label: t('form.notificationType.mentions'),
                description: t('form.notificationType.mentionsDescription'),
              },
              {
                value: 'none',
                label: t('form.notificationType.none'),
              },
            ]}
            orientation="vertical"
          />
          <DynamicFormField
            name="birthDate"
            label={t('form.birthDate')}
            type={FieldType.DATE}
            // maxDate={new Date()}
          />
          <DynamicFormField
            name="dateRange"
            label={t('form.dateRange')}
            type={FieldType.DATE_RANGE}
            numberOfMonths={2}
            fromLabel={t('form.from')}
            toLabel={t('form.to')}
          />
          <Button className="mt-10" type="submit">
            전송
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            초기화
          </Button>
        </form>
      </Form>
      {/* <Form>
      <FormInput name="test" label="ttt" type={FieldType.TEXT} />
      </Form> */}
    </>
  );
};

export default TestForm;
