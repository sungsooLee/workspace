import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  Spinner,
  Input,
  Textarea,
  Button,
  Tooltip,
  DatePicker,
  Switch,
  Select,
  ThumbnailImageUpload,
  ChipList,
  SelectOption,
  ContentsRow,
  List,
  Checkbox,
  RadioGroup,
} from '@learnway/ui';
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
              <label htmlFor="name-channel" className={formStyles.form_label}>
                <span className={formStyles.form_text}>테넌트</span>
              </label>
              <div className={formStyles.input_box}></div>
            </div>
          </ContentsRow>
        </div>
      </PageContainer>
    </form>
  );
}
