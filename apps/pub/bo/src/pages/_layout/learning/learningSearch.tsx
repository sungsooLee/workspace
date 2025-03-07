import { createFileRoute } from '@tanstack/react-router';
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
import { IcoArrowDownDouble, IcoRefresh } from '@learnway/icons';
import styles from './page-content.module.css';
import formStyles from '../../../assets/styles/modules/form.module.css'; // form css

export const Route = createFileRoute('/_layout/learning/learningSearch')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
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
                <Input id="name-resources" type="text" placeholder="학습자원명으로 조회하세요." />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <div className={formStyles.input_box}>
                <Button onlyIcon>
                  <IcoArrowDownDouble width={16} height={16} fill="none" stroke="#131c30" />
                </Button>
                <Button onlyIcon>
                  <IcoRefresh width={16} height={16} fill="none" stroke="#131c30" />
                </Button>
                <Button className={formStyles.btn_search}></Button>
              </div>
            </div>
          </ContentsRow>
        </div>
      </PageContainer>
    </form>
  );
}
