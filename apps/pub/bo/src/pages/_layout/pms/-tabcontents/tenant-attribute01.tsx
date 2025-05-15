import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { ContentsHistoryInfoFormField } from '../../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
/* css */
import styles from './tenant-attribute01.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
import { ContentsRow, Input, Switch, Tooltip, Button } from '@learnway/ui';
// eslint-disable-next-line no-empty-pattern
const TenantAttribute01Component: FC<{}> = ({}) => {
  // switch
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className="title_wrap">
        <strong className="title">{'테넌트 속성 관리'}</strong>
      </div>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-tenantName" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'테넌트명'}</span>
            {/* 필수 케이스 */}
            <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-tenantName"
              type="text"
              placeholder="입력"
              value="완성차 테넌트"
              readOnly
              className={formStyles.input}
            />
          </div>
        </div>
      </ContentsRow>
      <div className="title_wrap no_line">
        <strong className="title">{'과정 등록 연관 설정'}</strong>
      </div>
      <ContentsRow type="horizontal">
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle01" className={formStyles.form_label}>
            <span className={formStyles.form_text}>과정 댓글 작성</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use"
              className={dynamicFormStyles.btn_switch}
              label={checked[1] ? '사용' : '미사용'}
              checked={checked[1]}
              onCheckedChange={handleCheckedChange(1)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 댓글 작성 여부를 설정할 수 {checked[1] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle02" className={formStyles.form_label}>
            <span className={formStyles.form_text}>과정 외부 공유</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use2"
              className={dynamicFormStyles.btn_switch}
              label={checked[2] ? '사용' : '미사용'}
              checked={checked[2]}
              onCheckedChange={handleCheckedChange(2)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 해당 과정의 사용자간 공유 여부를 설정할 수
            {checked[2] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
      </ContentsRow>
      <ContentsRow type="horizontal">
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle03" className={formStyles.form_label}>
            <span className={formStyles.form_text}>수강신청 설정 여부</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use"
              className={dynamicFormStyles.btn_switch}
              label={checked[3] ? '사용' : '미사용'}
              checked={checked[3]}
              onCheckedChange={handleCheckedChange(3)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 수강 신청 기능 사용 여부를 설정할 수
            {checked[3] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle04" className={formStyles.form_label}>
            <span className={formStyles.form_text}>수강신청 승인자</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use2"
              className={dynamicFormStyles.btn_switch}
              label={checked[4] ? '사용' : '미사용'}
              checked={checked[4]}
              onCheckedChange={handleCheckedChange(4)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 수강신청 승인 결재 기능 사용 여부를 설정할 수
            {checked[4] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
      </ContentsRow>
      <ContentsRow type="horizontal">
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle05" className={formStyles.form_label}>
            <span className={formStyles.form_text}>학습 지연 제한</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use"
              className={dynamicFormStyles.btn_switch}
              label={checked[5] ? '사용' : '미사용'}
              checked={checked[5]}
              onCheckedChange={handleCheckedChange(5)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 학습 지역 제한 기능 사용 여부를 설정할 수
            {checked[5] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle06" className={formStyles.form_label}>
            <span className={formStyles.form_text}>학습 시간 제한</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use2"
              className={dynamicFormStyles.btn_switch}
              label={checked[6] ? '사용' : '미사용'}
              checked={checked[6]}
              onCheckedChange={handleCheckedChange(6)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 학습시간 제한 기능 사용 여부를 설정할 수
            {checked[6] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
      </ContentsRow>
      <ContentsRow type="horizontal">
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle07" className={formStyles.form_label}>
            <span className={formStyles.form_text}>학습 기기 제한</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use7"
              className={dynamicFormStyles.btn_switch}
              label={checked[7] ? '사용' : '미사용'}
              checked={checked[7]}
              onCheckedChange={handleCheckedChange(7)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 학습 기기 제한 기능 사용 여부를 설정할 수
            {checked[7] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle08" className={formStyles.form_label}>
            <span className={formStyles.form_text}>콘텐츠 보안 적용</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use8"
              className={dynamicFormStyles.btn_switch}
              label={checked[8] ? '사용' : '미사용'}
              checked={checked[8]}
              onCheckedChange={handleCheckedChange(8)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 콘텐츠 보안 적용 여부를 설정할 수{checked[8] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
      </ContentsRow>
      <ContentsRow type="horizontal">
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle09" className={formStyles.form_label}>
            <span className={formStyles.form_text}>과정 예산 사용</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use"
              className={dynamicFormStyles.btn_switch}
              label={checked[9] ? '사용' : '미사용'}
              checked={checked[9]}
              onCheckedChange={handleCheckedChange(9)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 에산 사용 여부를 설정할 수 {checked[9] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle10" className={formStyles.form_label}>
            <span className={formStyles.form_text}>과정 고용보험 환급</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use2"
              className={dynamicFormStyles.btn_switch}
              label={checked[10] ? '사용' : '미사용'}
              checked={checked[10]}
              onCheckedChange={handleCheckedChange(10)}
            />
          </div>
          <p className={formStyles.guide_text}>
            과정 등록 시 고융보험 환급 사용 여부를 설정할 수
            {checked[10] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
      </ContentsRow>
      <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
        <ContentsHistoryInfoFormField />
      </ContentsRow>
    </div>
  );
};

TenantAttribute01Component.displayName = 'TenantAttribute01';
export const TenantAttribute01 = TenantAttribute01Component;
