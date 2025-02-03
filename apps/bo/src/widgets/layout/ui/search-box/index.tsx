import { FC, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { searchDialogConfig } from './config';
import { CODE_GROUP } from '@learnway/config';
import { useTranslation } from 'react-i18next';
import { useFetchCodeGroups } from '../../../../entities/system';
import { Button, Input } from '@learnway/ui';

const SearchBox: FC<{ config: any; onSearch: any }> = ({ config, onSearch }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const { builders: initBuilders, control, formSubmit, reset } = config;
  const { data } = useFetchCodeGroups();
  const [builders, setBuilders] = useState<any>();
  const dependencies = initBuilders
    .filter((builder: any) => builder.dependency)
    .map((builder: any) => ({
      name: builder.name,
      dependency: builder.dependency,
    }));
  const { t } = useTranslation();

  /*const watchedFields = config.watch(dependencies.map((dp: any) => dp.dependency));*/
  const calculateGridHeight = () => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const gridStyles = getComputedStyle(grid);
    // 1. grid-template-rows에서 각 Row의 높이 계산
    const rows = gridStyles.gridTemplateRows.split(' '); // 각 행(Row)의 높이 배열

    if (rows.length < 2) {
      // 2줄 이하인 경우, 초기 값 설정
      setIsOverflowing(false);
      return;
    }

    // 2. Row 높이와 Row Gap 계산
    const firstRowHeight = parseFloat(rows[0]); // 첫 번째 행 높이
    const secondRowHeight = parseFloat(rows[1]); // 두 번째 행 높이
    const rowGap = parseFloat(gridStyles.rowGap || '0'); // Row 간격 계산

    // 3. 두 줄 높이 합산 (Row Gap 포함)
    const totalHeight = firstRowHeight + secondRowHeight + rowGap;

    // 4. 초기 줄 높이로 설정하고, overflow 여부 확인
    setCollapsedHeight(totalHeight);
    setIsOverflowing(grid.scrollHeight > totalHeight);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('on form submit?');
    onSearch && formSubmit(onSearch);
  };

  const loadDropdownItems = () => {
    console.log('loadDropDownItems [] => z');
    const newBuilders = initBuilders.map((builder: any) => {
      if ((builder.type === 'dropdown' || builder.type === 'multi-dropdown') && builder.codeGroup) {
        const codes = (data as any)[builder.codeGroup].codes;
        if (codes) {
          return {
            ...builder,
            items: [...builder.items, ...codes].map((lang) => ({
              ...lang,
              name: t(lang.name),
            })),
          };
        }
      }

      return { ...builder };
    });
    setBuilders(newBuilders);
  };

  // 초기 렌더링 및 화면 리사이즈 시 다시 높이 계산
  useLayoutEffect(() => {
    console.log(dependencies.map((dp: any) => dp.dependency));
    loadDropdownItems();
    calculateGridHeight();
    window.addEventListener('resize', calculateGridHeight);
    return () => {
      window.removeEventListener('resize', calculateGridHeight);
    };
  }, [data]);

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={'search-container'}>
        <div
          ref={gridRef}
          className="condition-container"
          style={{
            overflow: 'hidden',
            maxHeight: !isExpanded && isOverflowing ? `${collapsedHeight}px` : 'none',
            transition: 'max-height 0.3s ease', // 부드러운 확장/축소
          }}>
          {builders &&
            builders.map((property: any) => {
              const Component = searchDialogConfig[property.type]; // 해당 타입의 컴포넌트
              return Component ? (
                <div key={property.name}>
                  <Component control={control} {...property} key={property.key} config={config} />
                </div>
              ) : null; // props 전달
            })}
        </div>
        <div className="submit-container">
          {isOverflowing && (
            <button className={'btn'} onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? '축소' : '확장'}
            </button>
          )}
          <button className={'btn'} type={'button'} onClick={handleReset}>
            reload
          </button>
          <button className={'btn'} type={'submit'}>
            검색
          </button>
        </div>
      </div>
    </form>
  );
};
export default SearchBox;
