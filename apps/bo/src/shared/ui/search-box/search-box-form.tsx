import React, {
  FC,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import { Button, DynamicFormField } from '@learnway/ui';
import { IcoArrowDownDouble, IcoFormRequired, IcoRefresh02, IcoSearch } from '@learnway/icons';
import { searchFieldConfig } from './search-field-config';
import { SearchBoxProps } from './type';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { SelectOption } from '@learnway/hooks';

/**
 * 검색 박스 안에 DynamicForm 을 넣어 구성 하는 경우 사용 할 수 있음.
 * 미완성 된 검색 박스
 * @param onSearch - 검색 실행 시 호출될 함수
 */
const SearchBoxFormComponent: FC<any> = ({ onReset, onSearch, onShowFields, children }) => {
  // expand 버튼 상태 관리 (접기/펼치기)
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * 폼 리셋 핸들러
   * - 리셋 버튼 클릭 시 실행되는 함수입니다.
   * - 폼의 상태를 초기화하거나 관련 로직을 트리거할 수 있습니다.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - 버튼 클릭 이벤트 객체입니다. 현재 함수 본문에서는 사용되지 않고 있습니다.
   */
  const handleFormReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    onReset();
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
      onSearch();
    }
  };

  return (
    <form onSubmit={handleKeyDown} onKeyDown={handleKeyDown}>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={cn(searchStyles.item_row)}> {children}</div>
          <div className={searchStyles.btn_box}>
            {onShowFields && (
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
            <Button
              type="button"
              variant="search"
              size="sm"
              className={searchStyles.btn_search}
              onClick={() => onSearch()}
            >
              <IcoSearch className={searchStyles.icon_sm_search} />
              {t('LABEL.button.search')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export const SearchFormBox = SearchBoxFormComponent;
