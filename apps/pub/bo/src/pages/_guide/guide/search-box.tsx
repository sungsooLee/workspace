import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@/libs/shared/src';
import { useState } from 'react';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import {
  Button,
  // Tooltip,
  DatePicker,
  // Switch,
  Select,
  // ThumbnailImageUpload,
  // ChipList,
  // SelectOption,
  Input,
  DropdownList,
  DropdownOption,
} from '@learnway/ui';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/search-box')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  return (
    <>
      {/* 1개인 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={cn(searchStyles.item_wrap)}>
            <div className={searchStyles.item}>
              <label htmlFor="name-label" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
          </div>
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

      {/* 2개인 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_wrap}>
            <div className={searchStyles.item}>
              <label htmlFor="name-label2" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label2-2" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
          </div>
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

      {/* 3개인 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_wrap}>
            <div className={searchStyles.item}>
              <label htmlFor="name-label3" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label3-2" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label3-3" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
          </div>
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

      {/* 4개인 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_wrap}>
            <div className={searchStyles.item}>
              <label htmlFor="name-label4" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label4-2" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label4-3" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label4-4" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
          </div>
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

      {/* half CASE */}
      <div
        className={cn(
          `${searchStyles.start} ${searchStyles.wrap} ${searchStyles[`cols_${'half'}`]}`,
        )}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_wrap}>
            <div className={searchStyles.item}>
              <label htmlFor="name-label5" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label5-2" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
          </div>
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

      {/* half CASE2 */}
      <div
        className={cn(
          `${searchStyles.start} ${searchStyles.wrap} ${searchStyles[`cols_${'half2'}`]}`,
        )}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_wrap}>
            <div className={searchStyles.item}>
              <label htmlFor="name-label5" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label5-2" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label5-3" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
          </div>
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

      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_wrap}>
            <div className={searchStyles.item}>
              <label htmlFor="name-label5" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label5-2" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
            <div className={searchStyles.item}>
              <label htmlFor="name-label5-3" className={searchStyles.label}>
                <span className={searchStyles.text}>타이틀</span>
              </label>
              <div className={searchStyles.box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </div>
            </div>
          </div>
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
    </>
  );
}
