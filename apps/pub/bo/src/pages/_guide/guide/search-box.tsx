import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { useState } from 'react';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import {
  Button,
  // Tooltip,
  DatePicker,
  // Switch,
  // ThumbnailImageUpload,
  // ChipList,
  // SelectOption,
  Input,
  Dropdown,
} from '@learnway/ui';
import { IcoRefresh02, IcoSearch, IcoArrowDownDouble, IcoFormRequired } from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/search-box')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  // Date picker
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (value: any) => {
    setDate(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate2 = (value: any) => {
    setDate2(value);
  };
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  return (
    <>
      <h3 className="guide_tit3">Search-box Case</h3>
      {/* 1개인 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정, full 아닌 경우 item_auto 클래스 추가 */}
          <div className={cn(searchStyles.item_row, searchStyles.item_auto)}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                    {/* 필수 케이스 */}
                    <span
                      className={cn(searchStyles.status, searchStyles.required, searchStyles.error)}
                    >
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                      className="error"
                    />
                  </div>
                  <p className={cn(searchStyles.guide_text, searchStyles.error)}>기본 메시지</p>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>

      {/* 2개인 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정, full 아닌 경우 item_auto 클래스 추가 */}
          <div className={cn(searchStyles.item_row, searchStyles.item_auto)}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label2" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label2-2" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>

      {/* 3개인 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 */}
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label3" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label3-2" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label3-3" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>

      {/* 3개인데 다른 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 S */}
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label_3" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label_3-2" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label_3-3" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label_3-4" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>

      {/* 4개인 CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 S */}
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label4" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label4-2" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label4-3" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label4-4" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>

      {/* half CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 S */}
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label5" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label5-2" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>

      {/* half CASE */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 S */}
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label6" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label6-2" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label6-3" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>

      {/* half CASE2 */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 S */}
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label6" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label6-2" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label6-3" className={searchStyles.label}>
                    <span className={searchStyles.text}>타이틀</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>

      {/* open type */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 S */}
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select1" className={searchStyles.label}>
                    <span className={searchStyles.text}>테넌트</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-channel" className={searchStyles.label}>
                    <span className={searchStyles.text}>채널</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      className={searchStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-type" className={searchStyles.label}>
                    <span className={searchStyles.text}>유형</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-owner" className={searchStyles.label}>
                    <span className={searchStyles.text}>담당자</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-owner" type="text" placeholder="담당자명으로 조회하세요." />
                  </div>
                </div>
              </div>
            </div>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select2" className={searchStyles.label}>
                    <span className={searchStyles.text}>테넌트</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-channel2" className={searchStyles.label}>
                    <span className={searchStyles.text}>채널</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      className={searchStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-type2" className={searchStyles.label}>
                    <span className={searchStyles.text}>유형</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-owner2" className={searchStyles.label}>
                    <span className={searchStyles.text}>담당자</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-owner2" type="text" placeholder="담당자명으로 조회하세요." />
                  </div>
                </div>
              </div>
            </div>
            {/* 확장영역 */}
            {isExpanded && (
              <div className={cn(searchStyles.form_display, searchStyles.item_wrap)}>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-term" className={searchStyles.label}>
                      <span className={searchStyles.text}>공유기간</span>
                    </label>
                    <div className={searchStyles.box}>
                      <DatePicker
                        onChange={handleDate}
                        value={date}
                        className={searchStyles.datepicker_item}
                      />
                      <span className={searchStyles.dash}></span>
                      <DatePicker
                        onChange={handleDate2}
                        value={date2}
                        className={searchStyles.datepicker_item}
                      />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-owner2" className={searchStyles.label}>
                      <span className={searchStyles.text}>담당자</span>
                    </label>
                    <div className={searchStyles.box}>
                      <div className={searchStyles.half}>
                        <Input id="name-owner2" type="text" placeholder="담당자명을 입력하세요." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={searchStyles.btn_box}>
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
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>
    </>
  );
}
