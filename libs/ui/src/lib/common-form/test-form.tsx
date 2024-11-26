import { useTranslation } from 'react-i18next';
import { z } from 'zod';
// import { FormProvider } from "./FormProvider";
import { FieldType } from './type';
import CommonFormItem from './form-item';
import { FormExtend } from './form-extend';
import { Button } from '../button/button';
const TestForm = () => {
  const { t } = useTranslation();

  const schema = z
    .object({
      name: z.string().min(2, {
        message: t('validation.min', { field: t('form.name'), min: 2 }),
      }),
      // email: z.string().optional(),
      email: z
        .string()
        .trim()
        .transform((val) => (val === '' ? undefined : val))
        .pipe(z.string().email(t('validation.email')).optional()),
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
      categories: z.array(z.string()).min(1, {
        message: t('validation.minArrayLength', {
          field: t('form.categories'),
          min: 1,
        }),
      }),
    })
    .refine(
      (data) => {
        // startAmount가 있을 때만 비교
        if (data.startAmount !== undefined && data.endAmount !== undefined) {
          return data.endAmount > data.startAmount;
        }
        return true;
      },
      {
        message: t('validation.amountRange'),
        path: ['endAmount'], // 에러를 표시할 필드
      },
    );
  // .superRefine((data, ctx) => {
  //   const startAmount = data.startAmount;
  //   if (startAmount && data.endAmount <= startAmount) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: t("validation.amountRange"),
  //       path: ["endAmount"],
  //     });
  //   }
  // });

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    // <FormProvider
    //   schema={schema}
    //   onSubmit={handleSubmit}
    //   defaultValues={{
    //     name: "",
    //     email: "",
    //     type: "",
    //     startAmount: 0,
    //     endAmount: 0,
    //     categories: [],
    //   }}
    // >
    <FormExtend
      schema={schema}
      onSubmit={handleSubmit}
      defaultValues={{
        name: '',
        email: '',
        type: '',
        startAmount: 0,
        endAmount: 0,
        categories: [],
      }}>
      <div className="grid grid-cols-2 gap-4">
        <CommonFormItem name="name" label={t('form.name')} type={FieldType.TEXT} />

        <CommonFormItem
          name="email"
          label={t('form.email')}
          type={FieldType.TEXT}
          placeholder={t('form.emailPlaceholder')}
        />

        <CommonFormItem
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
            <CommonFormItem
              name="startAmount"
              label={t('form.startAmount')}
              type={FieldType.NUMBER}
              currency="KRW"
              decimalScale={0}
              thousandSeparator={true}
            />

            <CommonFormItem
              name="endAmount"
              label={t('form.endAmount')}
              type={FieldType.NUMBER}
              currency="USD"
              decimalScale={2}
              thousandSeparator={true}
            />
          </div>
        </div>
      </div>
      <CommonFormItem
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
      <Button className="mt-10" type="submit">
        전송
      </Button>
    </FormExtend>
  );
};

export default TestForm;
