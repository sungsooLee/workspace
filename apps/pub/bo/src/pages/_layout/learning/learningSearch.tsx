import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  // Spinner,
  // Textarea,
  Button,
  // Tooltip,
  // DatePicker,
  // Switch,
  Select,
  // ThumbnailImageUpload,
  // ChipList,
  // SelectOption,
  ContentsRow,
  Input,
  // List,
  // Checkbox,
  // RadioGroup,
} from '@learnway/ui';
import { IcoArrowDownDouble, IcoRefresh02, IcoSearch } from '@learnway/icons';
import styles from './page-content.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form css
import searchStyles from './search.module.css'; // search css
import { cn } from '@/libs/shared/src';

export const Route = createFileRoute('/_layout/learning/learningSearch')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <div className={cn(searchStyles.start, searchStyles.search_contents_wrap)}>
            <div className={searchStyles.contents}>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-select1" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>테넌트</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-channel" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>채널</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-type" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>유형</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-owner" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>담당자</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input id="name-owner" type="text" placeholder="담당자명으로 조회하세요." />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-select2" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>외주여부</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-useable" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>사용가능</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-usage" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>교육활용</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-resources" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>학습자원명</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name-resources"
                      type="text"
                      placeholder="학습자원명으로 조회하세요."
                    />
                  </div>
                </div>
              </ContentsRow>
              {/* 확장영역 */}
              {isExpanded && (
                <ContentsRow>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-select1" className={formStyles.form_label}>
                      <span className={formStyles.form_text}>테넌트</span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Select
                        className={formStyles.select_option}
                        options={[
                          { value: 'type1', label: '전체' },
                          { value: 'type2', label: '항목' },
                        ]}
                      />
                    </div>
                  </div>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-channel" className={formStyles.form_label}>
                      <span className={formStyles.form_text}>채널</span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Select
                        className={formStyles.select_option}
                        options={[
                          { value: 'type1', label: '전체' },
                          { value: 'type2', label: '항목' },
                        ]}
                      />
                    </div>
                  </div>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-type" className={formStyles.form_label}>
                      <span className={formStyles.form_text}>유형</span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Select
                        className={formStyles.select_option}
                        options={[
                          { value: 'type1', label: '전체' },
                          { value: 'type2', label: '항목' },
                        ]}
                      />
                    </div>
                  </div>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-owner" className={formStyles.form_label}>
                      <span className={formStyles.form_text}>담당자</span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Input id="name-owner" type="text" placeholder="담당자명으로 조회하세요." />
                    </div>
                  </div>
                </ContentsRow>
              )}
            </div>
            <div className={searchStyles.btn_box}>
              <Button
                type="button"
                className={cn(searchStyles.btn_expand, isExpanded ? searchStyles.active : '')}
                variant="search"
                size="sm"
                onlyIcon
                onClick={() => setIsExpanded(!isExpanded)}>
                <IcoArrowDownDouble className={searchStyles.ico_expand} />
              </Button>
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
      </PageContainer>
    </form>
  );
}
