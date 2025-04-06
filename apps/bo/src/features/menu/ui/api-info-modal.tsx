import {
  Button,
  ContentsRow,
  DynamicFormField,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Textarea,
  useModal,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { useFetchProgram } from '../../../entities/program/service/program-manage.hook';

const ApiInfoModalComponent = ({ apiId }: any) => {
  const { close } = useModal();

  const { data } = useFetchProgram(apiId);
  console.log(data);
  return (
    <ModalContainer>
      <ModalTitle>API 정보</ModalTitle>
      <ModalBody>
        <div className={styles.wrap}>
          <div className={styles.pop_contents}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="apiName" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>{'API명'}</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="apiName"
                    type="text"
                    value={data && data.apiName}
                    disabled
                    className={formStyles.input}
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="apiName" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>{'API 위치'}</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="apiName"
                    type="text"
                    value={''}
                    disabled
                    className={formStyles.input}
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="apiUrl" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>{'API URL'}</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="apiUrl"
                    type="text"
                    value={data && data.apiUrl}
                    disabled
                    className={formStyles.input}
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="apiDesc" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>{'API 설명'}</span>
                </label>
                <div className={formStyles.input_box}>
                  <Textarea
                    id="apiDesc"
                    value={data && data.apiDesc}
                    disabled
                    className={formStyles.input}
                  />
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => close()}>확인</Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const ApiInfoModal = ApiInfoModalComponent;
