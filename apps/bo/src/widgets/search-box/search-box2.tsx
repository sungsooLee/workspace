import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@learnway/ui';
import { SearchBoxProps } from './type';
import { searchDialogConfig } from '../../shared/ui/search-box/search-field-config';

/**
 * 퍼블 완료 되면 주석 및 코드 리팩터링 추가 예정
 * @param config
 * @param onSearch
 * @constructor
 */
const SearchBoxComponent: FC<SearchBoxProps> = ({ config, onSearch }) => {
  const { builders: initBuilders, control, formSubmit, reset } = config;

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('on form submit?');
    onSearch && formSubmit(onSearch);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="inline-block w-full border border-dashed border-blue-400 p-4">
        <div className="flex items-center space-x-4">
          {initBuilders &&
            initBuilders.map((property: any) => {
              const { type, name, ...properties } = property;
              const DialogComponent =
                searchDialogConfig[property.type as keyof typeof searchDialogConfig]; // 해당 타입의 컴포넌트

              return DialogComponent ? (
                <Controller
                  key={name}
                  control={control}
                  name={name}
                  render={({ field: { onChange, onBlur, value, ref }, formState: { errors } }) => {
                    // 폼 필드에 공통적으로 전달할 파라미터
                    const formParams: any = {
                      /*  onFormChange,
                      formData,
                      onFocus,*/
                      ref,
                      type,
                      name,
                      onBlur,
                      ...properties,
                      onChange,
                      value,
                    };

                    return (
                      <div key={property.name}>
                        {property?.label && (
                          <label htmlFor={property.name}>{property?.label}</label>
                        )}
                        <DialogComponent {...formParams} />
                      </div>
                    );
                  }}
                />
              ) : null; // props 전달
            })}

          <div className="flex items-center space-x-2">
            <Button type="button" variant="point" size="sm" onClick={() => reset()}>
              초기화
            </Button>
            <Button type="submit" variant="point" size="sm">
              조회
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export const SearchBox = SearchBoxComponent;
