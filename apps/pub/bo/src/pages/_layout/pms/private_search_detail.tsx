/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Input, RadioGroup, ContentsRow, PhoneNumber, Textarea, ChipList } from '@learnway/ui';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';

export const Route = createFileRoute('/_layout/pms/private_search_detail')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <FormSubTitle label={'과정 소개'} lineType={'dark'} />
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-1'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'아이디(이메일)'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-1'}
                  readOnly
                  value={'mail@mail.com'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-2'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'사번'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-2'}
                  readOnly
                  value={'mail@mail.com'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-3'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'이름'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} id={'name-3'} readOnly value={'홍길동'} placeholder={'입력'} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-4'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'회사'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-4'}
                  readOnly
                  value={'기아자동차'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-5'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'소속'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-5'}
                  readOnly
                  value={'인사지원1팀'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-6'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'직위'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} id={'name-6'} readOnly value={'차장'} placeholder={'입력'} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-7'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'휴대폰 번호'}</span>
              </label>
              <div className={formStyles.input_box}>
                <PhoneNumber
                  options={[
                    { value: 'type1', label: '010' },
                    { value: 'type2', label: '016' },
                    { value: 'type3', label: '017' },
                  ]}
                  readOnly
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-8'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'연락처(사무실)'}</span>
              </label>
              <div className={formStyles.input_box}>
                <PhoneNumber
                  options={[
                    { value: 'type1', label: '010' },
                    { value: 'type2', label: '016' },
                    { value: 'type3', label: '017' },
                  ]}
                  disabled
                />
              </div>
            </div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
          <FormSubTitle label={'조회 정보'} lineType={'dark'} />
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-path'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'메뉴 경로'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-path'}
                  readOnly
                  value={'플랫폼 관리 > 테넌트 관리 > 테넌트 - 유저 관리'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}></div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-condition'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'검색 조건'}</span>
              </label>
              <div className={formStyles.input_box}>
                <ChipList
                  options={[
                    { label: '현대자동차 A', value: 'A' },
                    { label: '현대자동차 B', value: 'B' },
                    { label: '현대자동차 C', value: 'C' },
                    { label: '현대자동차 D', value: 'E' },
                    { label: '현대자동차 F', value: 'F' },
                  ]}
                  hideCloseButton={true}
                  readOnly={true}
                />
              </div>
            </div>
          </ContentsRow>
          <FormSubTitle label={'다운로드 사유'} lineType={'dark'} />
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-download'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'다운로드 사유'}</span>
              </label>
              <div className={formStyles.input_box}>
                <RadioGroup
                  options={[
                    { value: 'type1', label: '업무 목적' },
                    { value: 'type2', label: '법적·행정적 요구' },
                    { value: 'type3', label: '외부 제출 및 협업 ' },
                    { value: 'type4', label: '연구 및 개발' },
                    { value: 'type5', label: '기타(직접 입력)' },
                  ]}
                  defaultValue={'type1'}
                  className={formStyles.radio_box}
                  disabled
                  cols={5}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-detail'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'상세 사유'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id={'name-detail'}
                  rows={5}
                  cols={5}
                  maxLength={500}
                  resize={'none'}
                  placeholder={'입력'}
                  readOnly
                />
              </div>
            </div>
          </ContentsRow>
          <FormSubTitle label={'기타 시스템 정보'} lineType={'dark'} />
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-systemName'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'접속 시스템명'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} readOnly value={'차세대 학습 플랫폼'} placeholder={'입력'} />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-sort'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'접속 구분'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} readOnly value={'사내망'} placeholder={'입력'} />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-ip'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'접속 IP 주소'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} readOnly value={'192.168.123.132'} placeholder={'입력'} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-device'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'접속 단말기 정보'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} readOnly value={'PC'} placeholder={'입력'} />
              </div>
            </div>
            <div className={formStyles.form_item}></div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
          <ContentsHistoryInfoFormField />
        </div>
      </PageContainer>
    </form>
  );
}
