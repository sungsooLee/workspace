import React, { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button, ContentsRow, DatePicker, DropdownList, Input, Select } from '@learnway/ui';
import { searchDialogConfig } from './search-field-config';
import { SearchBoxProps } from './type';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { IcoArrowDownDouble, IcoRefresh02, IcoSearch } from '@learnway/icons';
import style from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
/**
 * 퍼블 완료 되면 주석 및 코드 리팩터링 추가 예정
 * @param config
 * @param onSearch
 * @constructor
 */
const SearchBoxComponent: FC<SearchBoxProps> = ({ config, onSearch }) => {
  const { builders: initBuilders, control, formSubmit, reset } = config;
  // expand btn
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('on form submit?');
    onSearch && formSubmit(onSearch);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className={cn(style.start, style.wrap)}>
        <div className={style.contents}>
          <ContentsRow>
            {initBuilders.map((builder: any) => {
              return (
                <div className={formStyles.form_item}>
                  <label htmlFor={builder.name} className={formStyles.form_label}>
                    <span className={formStyles.form_text}>테넌트</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <DropdownList
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                      defaultValue={{ value: 'type1', label: '전체' }}
                      // value={{ value: 'type1' }}
                    />
                  </div>
                </div>
              );
            })}
          </ContentsRow>
          {/* 확장영역 */}
          {isExpanded && (
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-term" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>공유기간</span>
                </label>
                <div className={formStyles.input_box}></div>
              </div>
              <div className={formStyles.form_item}>
                <label htmlFor="name-owner2" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>담당자</span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={style.half}>
                    <Input id="name-owner2" type="text" placeholder="담당자명을 입력하세요." />
                  </div>
                </div>
              </div>
            </ContentsRow>
          )}
        </div>
        <div className={style.btn_box}>
          <Button
            type="button"
            className={cn(style.btn_expand, isExpanded ? style.active : '')}
            variant="search"
            size="sm"
            onlyIcon
            onClick={() => setIsExpanded(!isExpanded)}>
            <IcoArrowDownDouble className={style.ico_expand} />
          </Button>
          <Button type="button" className={style.btn_refresh} variant="search" size="sm" onlyIcon>
            <IcoRefresh02 className={style.icon_refresh} />
          </Button>
          <Button type="button" variant="search" size="sm" className={style.btn_search}>
            <IcoSearch className={style.icon_sm_search} />
            조회
          </Button>
        </div>
      </div>
    </form>
  );
};
export const SearchBox = SearchBoxComponent;
