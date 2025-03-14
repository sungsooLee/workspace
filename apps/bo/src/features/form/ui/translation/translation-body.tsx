import { Children, cloneElement, FC, isValidElement, ReactElement, ReactNode } from 'react';
import { FieldArrayWithId, useFieldArray } from 'react-hook-form';
import { TranslationBodyProps, TranslationField } from './type';
import { DynamicFormField } from '@learnway/ui';

/**
 * TranslationBodyComponent 컴포넌트 정의
 * - 이 컴포넌트는 React의 함수형 컴포넌트(FC)로,
 *   폼 데이터를 처리하고 언어별 번역 정보를 나타냅니다.
 * @param control
 * @param defaultLang
 * @param children
 * @param locale
 * @constructor
 */
const TranslationBodyComponent: FC<TranslationBodyProps> = ({
  control,
  defaultLang,
  children,
  locale,
}) => {
  // react-hook-form의 useFieldArray를 사용하여 translations라는 배열 필드를 다룹니다.
  const { fields: translations } = useFieldArray({
    control: control,
    name: 'translations',
  });

  if (!control && !defaultLang && !locale) return null;
  // const translations = useWatch({ control, name: 'translations' }); // 주석 처리된 대체 코드로, useWatch를 사용할 수도 있음.

  // 폼 필드 이름을 동적으로 수정하기 위한 함수
  const modifyDynamicFormFieldName = (
    field: any, // 번역 필드 하나에 대한 정보
    child: ReactNode, // 처리 중인 자식 컴포넌트
    index: number, // translations 배열의 현재 인덱스
    isDefault: boolean, // 기본 언어인지 여부
  ): ReactNode => {
    // React Element가 아닌 경우 그대로 반환
    if (!isValidElement(child)) return child;

    // 자식 컴포넌트가 DynamicFormField인지 확인
    // 일반 HTML 요소가 아니라 React 컴포넌트인 경우
    // 이름이 'DynamicFormField'인 경우
    if (typeof child.type !== 'string' && child.type === DynamicFormField) {
      // 기존 필드 이름을 '.' 기준으로 분리 (예: "locale")
      const [parentName, childName]: string = child.props.name.split('.');
      // 새 필드 이름 생성 (예: "translations.0.locale")
      const newName = `${parentName}.${index}.${childName}`;

      // 기존 child 요소를 클론(clone)하면서 새 필드 이름과 disabled 속성 추가
      return cloneElement(child as ReactElement, {
        name: newName,
        disabled: isDefault, // 기본 언어의 폼 필드는 비활성화
        key: `pop-translations-${field.locale}-${index}`, // 유니크한 key 설정
      });
    }

    // 자식 요소를 재귀적으로 처리
    if (child.props && child.props.children) {
      const newChildren = Children.map(child.props.children, (c) =>
        modifyDynamicFormFieldName(field, c, index, isDefault),
      );

      // 처리된 자식(children)을 포함한 새로운 요소 리턴
      return cloneElement(child as ReactElement, { children: newChildren });
    }

    // 처리할 내용이 없는 경우 그대로 반환
    return child;
  };

  // 컴포넌트 렌더링
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {/* 기준 언어 섹션 */}
      <div className="border-t-4 border-red-500 bg-white shadow-md">
        <div className="p-4">
          <h2 className="border-b pb-2 font-semibold text-gray-700">기준 언어 정보</h2>
        </div>
        {translations.map(
          (field: any, index: number) =>
            field.locale === defaultLang && // 기본 언어(defaultLang)와 같을 때만
            modifyDynamicFormFieldName(field, children, index, true), // 기준 언어 필드 렌더링
        )}
      </div>

      {/* 번역 언어 섹션 */}
      <div className="relative border-t-4 border-gray-500 bg-white shadow-md">
        <div className="p-4">
          <h2 className="border-b pb-2 font-semibold text-gray-700">번역 언어 정보 - 영어</h2>
        </div>
        {translations.map(
          (field: any, index: number) =>
            field.locale === locale && // 전달받은 locale과 같을 때만
            modifyDynamicFormFieldName(field, children, index, false), // 번역 언어 필드 렌더링
        )}
      </div>
    </div>
  );
};

TranslationBodyComponent.displayName = 'TranslationBody';
export const TranslationBody = TranslationBodyComponent;
