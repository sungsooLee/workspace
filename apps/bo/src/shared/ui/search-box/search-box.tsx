import React, { cloneElement, FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Button,
  ContentsRow,
  DatePicker,
  DropdownList,
  DropdownOption,
  DynamicFormField,
  Input,
  Select,
} from '@learnway/ui';
import { searchFieldConfig } from './search-field-config';
import { SearchBoxProps } from './type';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import style from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { DropdownFormField } from '../../../features/form/ui';
/**
 * 퍼블 완료 되면 주석 및 코드 리팩터링 추가 예정
 * @param config
 * @param onSearch
 * @constructor
 */
const SearchBoxComponent: FC<SearchBoxProps> = ({ config, onSearch }) => {
  const { builders: initBuilders, formSubmit, control, ...props } = config;
  // expand btn
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('on form submit?');
    onSearch && formSubmit(onSearch);
  };

  const renderSearchField = (column: any): any => {
    const FormComponent = searchFieldConfig[column.type as keyof typeof searchFieldConfig];
    // FormComponent가 유효하다면 JSX로 반환
    if (FormComponent) {
      return FormComponent; // 필요한 props 전달
    }
    return null;
  };

  const renderFormItem = (item: any) => (
    <div className={searchStyles.item} key={item.name}>
      <label htmlFor={item.name} className={searchStyles.label}>
        <span className={searchStyles.text}>{item.label}</span>
      </label>
      <div className={searchStyles.box}>
        <DynamicFormField
          control={control}
          name={item.name}
          {...item}
          {...props}
          component={renderSearchField(item)}
        />
      </div>
    </div>
  );

  const renderColumn = (column: any, index: number, totalColumns: number) => {
    const className = cn(
      searchStyles.inner,
      config.builders.length === 1 && totalColumns < 3 && searchStyles.item_cols1,
    );

    if (column.type === 'group') {
      return (
        <div key={`group-${index}`} className={className}>
          {column.builders.map(renderFormItem)}
        </div>
      );
    }

    return (
      <div key={`column-${index}`} className={className}>
        {renderFormItem(column)}
      </div>
    );
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_wrap}>
            {config.builders
              .filter((_, index) => index < 2)
              .map((columns: any) =>
                columns.map((column: any, columnIndex: number) =>
                  renderColumn(column, columnIndex, columns.length),
                ),
              )}
            {config.builders.length > 1 && isExpanded && (
              <div className={searchStyles.form_display}>
                {config.builders
                  .filter((_, index) => index > 0)
                  .map((columns: any) =>
                    columns.map((column: any, columnIndex: number) =>
                      renderColumn(column, columnIndex, columns.length),
                    ),
                  )}
              </div>
            )}
            <div className={searchStyles.btn_box}>
              <Button
                type="button"
                className={searchStyles.btn_refresh}
                variant="search"
                size="sm"
                onlyIcon>
                <IcoRefresh02 className={searchStyles.icon_refresh} />
              </Button>
              <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
                <IcoSearch className={searchStyles.icon_sm_search} />
                조회
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export const SearchBox = SearchBoxComponent;
