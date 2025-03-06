import { Children, cloneElement, FC, isValidElement, ReactElement, ReactNode } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';

const TranslationBodyComponent: FC<any> = ({ control, defaultLang, children, locale }) => {
  const { fields: translations } = useFieldArray({ control, name: 'translations' });
  //const translations = useWatch({ control, name: 'translations' });
  const modifyDynamicFormFieldName = (
    field: any,
    child: ReactNode,
    index: number,
    isDefault: boolean,
  ): ReactNode => {
    if (!isValidElement(child)) return child;

    // DynamicFormField 컴포넌트인 경우
    if (
      typeof child.type !== 'string' &&
      ((child.type as any).displayName === 'DynamicFormField' ||
        (child.type as any).name === 'DynamicFormField')
    ) {
      const [parentName, childName]: string = child.props.name.split('.'); // 예: "locale"
      const newName = `${parentName}.${index}.${childName}`;
      return cloneElement(child as ReactElement, {
        name: newName,
        disabled: isDefault,
        key: `pop-translations-${field.locale}-${index}`,
      });
    }

    // 자식이 있으면 재귀적으로 처리
    if (child.props && child.props.children) {
      const newChildren = Children.map(child.props.children, (c) =>
        modifyDynamicFormFieldName(field, c, index, isDefault),
      );
      return cloneElement(child as ReactElement, { children: newChildren });
    }

    return child;
  };
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className="border-t-4 border-red-500 bg-white shadow-md">
        <div className="p-4">
          <h2 className="border-b pb-2 font-semibold text-gray-700">기준 언어 정보</h2>
        </div>
        {translations.map(
          (field: any, index: number) =>
            field.locale === defaultLang &&
            modifyDynamicFormFieldName(field, children, index, true),
        )}
      </div>

      <div className="relative border-t-4 border-gray-500 bg-white shadow-md">
        <div className="p-4">
          <h2 className="border-b pb-2 font-semibold text-gray-700">번역 언어 정보 - 영어</h2>
        </div>
        {translations.map(
          (field: any, index: number) =>
            field.locale === locale && modifyDynamicFormFieldName(field, children, index, false),
        )}
      </div>
    </div>
  );
};

TranslationBodyComponent.displayName = 'TranslationBody';
export const TranslationBody = TranslationBodyComponent;
