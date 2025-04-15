import React, { FC, FormEvent, KeyboardEvent, useMemo, useState } from 'react';
import { Button, DynamicFormField } from '@learnway/ui';
import { searchFieldConfig } from './search-field-config';
import { SearchBoxProps } from './type';
import { cn } from '@learnway/shared';
import { IcoArrowDownDouble, IcoRefresh02, IcoSearch } from '@learnway/icons';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';

/**
 * 검색 박스 컴포넌트 ( config 에 의거해 자동 렌더링 됨 )
 *
 * @param provider - 상태 및 폼 제어 객체
 * @param onSearch - 검색 실행 시 호출될 함수
 */
const SearchBoxComponent: FC<SearchBoxProps> = ({ provider, onSearch }) => {
  const { builders: initBuilders, onFormChange, onSubmit, control, ...props } = provider;
  // expand 버튼 상태 관리 (접기/펼치기)
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * CSS 클래스명 생성 로직
   * - 필드가 한 줄에 2개 이하일 경우 자동으로 크기 조정
   */
  const rowClassName = useMemo(
    () =>
      cn(
        searchStyles.item_row,
        provider.builders.length === 1 &&
          (provider.builders[0] as unknown as any[]).length < 3 &&
          searchStyles.item_auto,
      ),
    [provider.builders],
  );

  /**
   * 폼 리셋 핸들러
   * - 리셋 버튼 클릭 시 실행되는 함수입니다.
   * - 폼의 상태를 초기화하거나 관련 로직을 트리거할 수 있습니다.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - 버튼 클릭 이벤트 객체입니다. 현재 함수 본문에서는 사용되지 않고 있습니다.
   */
  const handleFormReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    onFormChange();
  };

  /**
   * 폼 제출 핸들러
   * - 폼 제출 시 실행
   *
   * @param event - 폼 이벤트 객체
   */
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (onSearch) {
      onSubmit(onSearch)(event); // ✅ 반환된 함수 직접 실행
    }
  };

  /**
   * 키보드 이벤트 핸들러
   * - 엔터 키 입력 시 폼 제출
   *
   * @param event - 키보드 이벤트 객체
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    // 엔터 키(Enter) 입력 시 폼 제출
    if (event.key === 'Enter') {
      event.preventDefault();

      const form = event.currentTarget;
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }
  };

  /**
   * 필드 타입에 따른 렌더링 설정
   * - searchFieldConfig에서 필드 타입에 따라 컴포넌트 선택
   *
   * @param column - 필드 설정 객체
   * @returns - 필드에 대한 JSX 반환
   */
  const renderSearchField = (column: any): any => {
    const FormComponent = searchFieldConfig[column.type as keyof typeof searchFieldConfig];
    // FormComponent가 유효하다면 JSX로 반환
    if (FormComponent) {
      return FormComponent; // 필요한 props 전달
    }
    return null;
  };

  /**
   * 개별 필드 렌더링
   * - 필드 이름, 라벨, 필드 컴포넌트 포함
   *
   * @param item - 필드 설정 객체
   * @returns - 필드 JSX 반환
   */

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

  /**
   * 단일 필드 렌더링 (group 처리 포함)
   *
   * @param column - 필드 설정 객체
   * @param index - 필드 인덱스
   * @param totalColumns - 한 줄에 포함된 필드 수
   * @returns - 필드 JSX 반환
   */
  const renderColumn = (column: any, index: number, totalColumns: number) => {
    const className = cn(
      searchStyles.inner,
      provider.builders.length === 1 && totalColumns < 3 && searchStyles.item_auto,
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
    <form onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={rowClassName}>
            {provider.builders
              .filter((_, index) => index < 2)
              .map((columns: any, columnIndex) => (
                <div key={columnIndex} className={searchStyles.item_wrap}>
                  {columns.map((column: any, columnIndex: number) =>
                    renderColumn(column, columnIndex, columns.length),
                  )}
                </div>
              ))}
            {provider.builders.length > 1 && isExpanded && (
              <div className={searchStyles.form_display}>
                {provider.builders
                  .filter((_, index) => index > 0)
                  .map((columns: any, columnIndex) => (
                    <div key={columnIndex} className={searchStyles.item_wrap}>
                      {columns.map((column: any, columnIndex: number) =>
                        renderColumn(column, columnIndex, columns.length),
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className={searchStyles.btn_box}>
            {provider.builders.length > 1 && (
              <Button
                type="button"
                className={cn(searchStyles.btn_expand, isExpanded ? searchStyles.active : '')}
                variant="search"
                size="sm"
                onlyIcon
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <IcoArrowDownDouble className={searchStyles.ico_expand} />
              </Button>
            )}
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
              onClick={handleFormReset}
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="submit" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export const SearchBox = SearchBoxComponent;
