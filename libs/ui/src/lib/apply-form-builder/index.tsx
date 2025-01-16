// /* eslint-disable @nx/enforce-module-boundaries */
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldType } from '../type';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { Form } from '../shadcn/form';
import { SelectOption } from '../select/type';

interface FormBuilderProps {
  staticFields?: FormField[]; // 고정 영역 필드
  dynamicFields?: DynamicFormData; // 동적 영역 필드
  onSubmit?: (values: FormSubmitData) => void;
}

interface DynamicFormData {
  formId: number;
  tenantId: number;
  formName: string;
  field: FormSection[];
}

interface FormSection {
  formType: 'OPTIONAL' | 'CUSTOM';
  json: FormField[];
}

interface FormField {
  name: string;
  slug: string;
  type: string;
  label?: string;
  isRequired?: string;
  description?: string;
  options?: Option[];
}
interface Option {
  name: string;
  value: string;
}

interface FormSubmitData {
  staticData?: Record<string, any>;
  optionalData?: Record<string, any>;
  customData?: Record<string, any>;
}

const ApplyFormBuilder = ({ staticFields = [], dynamicFields, onSubmit }: FormBuilderProps) => {
  const categorizeFields = () => {
    const optional =
      (dynamicFields && dynamicFields.field.find((f) => f.formType === 'OPTIONAL')?.json) || [];
    const custom =
      (dynamicFields && dynamicFields.field.find((f) => f.formType === 'CUSTOM')?.json) || [];

    return {
      static: staticFields,
      optional,
      custom,
    };
  };

  // Zod 스키마 동적 생성
  const generateZodSchema = (fields: FormField[]) => {
    const schemaMap: { [key: string]: any } = {};

    fields.forEach((field) => {
      const fieldType = field.type.toLowerCase();
      const isRequired = field.isRequired === 'TRUE';
      const errorMessage = `${field.name}은(는) 필수 입력입니다.`;

      let schema: z.ZodTypeAny;

      switch (fieldType) {
        case 'date':
          schema = isRequired
            ? z.date({
                required_error: errorMessage,
                invalid_type_error: '올바른 날짜를 입력해주세요.',
              })
            : z
                .date({
                  invalid_type_error: '올바른 날짜를 입력해주세요.',
                })
                .optional();
          break;

        case 'number':
          schema = isRequired
            ? z.number({
                required_error: errorMessage,
                invalid_type_error: '숫자를 입력해주세요.',
              })
            : z.number().optional();
          break;

        case 'checkbox':
        case 'switch':
          schema = isRequired
            ? z.boolean({
                required_error: errorMessage,
              })
            : z.boolean().nullable();
          break;

        case 'multi_select':
          schema = isRequired
            ? z
                .array(z.string(), {
                  required_error: errorMessage,
                })
                .min(1, errorMessage)
            : z.array(z.string()).default([]);
          break;

        case 'select':
          schema = isRequired
            ? z
                .string({
                  required_error: errorMessage,
                })
                .min(1, errorMessage)
            : z.string().optional();
          break;

        default: // text, password 등
          schema = isRequired
            ? z
                .string({
                  required_error: errorMessage,
                })
                .min(1, errorMessage)
            : z.string().optional();
      }

      schemaMap[field.slug] = schema;
    });

    return schemaMap;
  };

  // 전체 스키마 생성
  const allFields = [...staticFields, ...categorizeFields().optional, ...categorizeFields().custom];
  const schema = z.object(generateZodSchema(allFields));
  type FormValues = z.infer<typeof schema>;

  // 필드 타입에 따른 초깃값 생성
  const generateDefaultValues = (formInfo: FormField[]) => {
    const defaultValues: { [key: string]: any } = {};

    formInfo.forEach((field) => {
      const fieldType = field.type.toLowerCase();

      switch (fieldType) {
        case 'select':
          defaultValues[field.slug] = field.options?.[0]?.value || '';
          break;
        case 'checkbox':
        case 'switch':
          defaultValues[field.slug] = false;
          break;
        case 'number':
          defaultValues[field.slug] = '';
          break;
        case 'date':
          defaultValues[field.slug] = undefined;
          break;
        case 'date_range':
          defaultValues[field.slug] = null;
          break;
        case 'multi_select':
          defaultValues[field.slug] = [];
          break;
        default: // text, password 등
          defaultValues[field.slug] = '';
      }
    });

    return defaultValues;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: generateDefaultValues(allFields),
  });

  const handleSubmit = (values: FormValues) => {
    const submitData: FormSubmitData = {};

    // 고정 영역 데이터
    if (staticFields.length > 0) {
      submitData.staticData = staticFields.reduce(
        (acc, field) => ({
          ...acc,
          [field.slug]: values[field.slug],
        }),
        {},
      );
    }

    // OPTIONAL 영역 데이터
    const optionalFields = categorizeFields().optional;
    if (optionalFields.length > 0) {
      submitData.optionalData = optionalFields.reduce(
        (acc, field) => ({
          ...acc,
          [field.slug]: values[field.slug],
        }),
        {},
      );
    }

    // CUSTOM 영역 데이터
    const customFields = categorizeFields().custom;
    if (customFields.length > 0) {
      submitData.customData = customFields.reduce(
        (acc, field) => ({
          ...acc,
          [field.slug]: values[field.slug],
        }),
        {},
      );
    }

    console.log('Data =', submitData);
    onSubmit?.(submitData);
  };

  // 필드 타입 구하기
  const getFieldType = (type: string): FieldType => {
    switch (type.toLowerCase()) {
      case 'text':
        return FieldType.TEXT;
      case 'select':
        return FieldType.SELECT;
      case 'checkbox':
        return FieldType.CHECKBOX;
      case 'radio':
        return FieldType.RADIO;
      case 'number':
        return FieldType.NUMBER;
      case 'date':
        return FieldType.DATE;
      case 'date_range':
        return FieldType.DATE_RANGE;
      case 'password':
        return FieldType.PASSWORD;
      case 'switch':
        return FieldType.SWITCH;
      case 'multi_select':
        return FieldType.MULTI_SELECT;
      default:
        return FieldType.TEXT;
    }
  };

  const mapOptions = (values: Option[] | undefined): SelectOption[] => {
    if (!values) return [];
    return values.map((option) => ({
      label: option.name,
      value: option.value,
    }));
  };

  // 렌더 필드
  const renderFields = (fields: FormField[], sectionTitle?: string) => (
    <div className="space-y-4">
      {sectionTitle && <h3 className="text-lg">{sectionTitle}</h3>}
      {fields.map((field) => {
        const fieldType = getFieldType(field.type);
        return (
          <DynamicFormField
            key={field.slug}
            name={field.slug}
            label={field.name}
            type={fieldType}
            isRequired={field.isRequired === 'TRUE'}
            // description={field.description}
            options={mapOptions(field.options)}
            checkboxLabel={field?.label}
          />
        );
      })}
    </div>
  );

  const { static: staticFormFields, optional, custom } = categorizeFields();

  return (
    <Form {...form} schema={schema}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {staticFormFields.length > 0 && renderFields(staticFormFields, '기본 정보')}
        {optional.length > 0 && renderFields(optional, '추가 정보')}
        {custom.length > 0 && renderFields(custom, '커스텀 정보')}

        <div className="flex justify-end">
          <button type="submit" className="bg-primary text-primary-foreground p-4">
            제출
          </button>
        </div>
      </form>
    </Form>
  );
};

export { ApplyFormBuilder };
