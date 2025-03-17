import { Children, cloneElement, FC, isValidElement, ReactElement, ReactNode } from 'react';
import { useWatch } from 'react-hook-form';
import { FormI18nProps, TranslationField } from './type';
import { DynamicFormField } from '@learnway/ui';

const FormI18nComponent: FC<FormI18nProps> = ({ control, name, children, defaultLang }) => {
  const fields = useWatch({ control, name: 'translations' });
  // 재귀적으로 자식 요소를 업데이트하는 함수
  const updateChild = (child: ReactNode): ReactNode => {
    if (!isValidElement(child)) return child;

    // DynamicFormField 컴포넌트 확인 (displayName 또는 name 속성을 사용)
    if (typeof child.type !== 'string' && child.type === DynamicFormField) {
      const nameProp: string = child.props.name;
      // container의 name과 점(.)이 포함된 자식만 변경합니다.
      const prefix = `${name}.`;
      if (!nameProp.startsWith(prefix)) {
        return child;
      }
      // fields 배열에서 locale이 defaultLang (또는 'kr')인 요소의 인덱스를 찾음
      const index = fields.findIndex((field: TranslationField) => field.locale === defaultLang);
      // index가 -1이면 해당 요소는 렌더링하지 않음
      if (index === -1) {
        return null;
      }
      // container의 name 뒤의 점을 제거하고 나머지만 추출
      const remaining = nameProp.slice(prefix.length); // 예: 'translation'
      const newName = `${name}.${index}.${remaining}`;
      return cloneElement(child as ReactElement, { name: newName });
    }

    // 자식 요소에 또 다른 자식들이 있다면 재귀적으로 처리
    if (child.props && child.props.children) {
      const newChildren = Children.map(child.props.children, updateChild);
      return cloneElement(child as ReactElement, { children: newChildren });
    }

    return child;
  };

  const updatedChildren = Children.map(children, updateChild);
  return <>{updatedChildren}</>;
};

export const FormI18n = FormI18nComponent;
