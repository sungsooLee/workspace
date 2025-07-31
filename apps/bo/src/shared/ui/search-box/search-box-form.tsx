import { IcoArrowDownDouble, IcoRefresh02, IcoSearch } from '@learnway/icons';
import { cn } from '@learnway/shared';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { t } from 'i18next';
import React, { FC, FormEvent, KeyboardEvent, useState } from 'react';
import { Button } from '@learnway/ui/button';

/**
 * 검색 박스 안에 DynamicForm 을 넣어 구성 하는 경우 사용 할 수 있음.
 * 미완성 된 검색 박스
 * @param onSearch - 검색 실행 시 호출될 함수
 * @param onSubmit - 폼 제출 시 호출될 함수 (검증 포함)
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
      onSearch?.(event);
    }
  };

  /**
   * 폼 제출 핸들러
   * - 폼 제출 시 실행되는 함수입니다.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(event);
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={cn(searchStyles.item_row)}>{children}</div>
          <div className={searchStyles.btn_box}>
            {onShowFields && (
              <Button
                type="button"
                className={cn(searchStyles.btn_expand, isExpanded ? searchStyles.active : '')}
                variant="search"
                size="sm"
                onlyIcon
                icon={<IcoArrowDownDouble className={searchStyles.ico_expand} />}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            )}
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
              icon={<IcoRefresh02 className={searchStyles.icon_refresh} />}
              onClick={handleFormReset}
            />
            <Button
              type="submit"
              variant="search"
              size="sm"
              className={searchStyles.btn_search}
              icon={<IcoSearch className={searchStyles.icon_sm_search} />}
              label={t('LABEL.button.search')}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export const SearchBoxForm = SearchBoxFormComponent;
