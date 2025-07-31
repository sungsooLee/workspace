import { useCreateSingleCourseApplicationQueue } from '@entities/enroll';
import { PreLevelTest, TextbookDeliveryAddress } from '@features/course';
import { AddressConfirmationPopup } from '@features/layout';
import { IcoCaution } from '@learnway/icons';
import { cn } from '@learnway/shared';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import styles from '@learnway/styles/fo/pages/_layout/course/registration.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { Address } from '@types';
import { useMemo, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';
import { useCourseRegistrationStore } from './store/use-course-registration';

type COURSE_REGISTRATION_FORMAT = 'ALL' | 'LEVEL_TEST' | 'TEXTBOOK';

interface Props {
  courseSequenceId: string;
  currentCourseRegistrationFormat: COURSE_REGISTRATION_FORMAT;
}

const FormSectionComponent = ({ courseSequenceId, currentCourseRegistrationFormat }: Props) => {
  const { langLevelTest, bookDeliveryInfo } = useCourseRegistrationStore();
  const { openModal, confirm: openConfirm } = useModal();

  const isShowLevelTest = useMemo(
    () => ['ALL', 'LEVEL_TEST'].includes(currentCourseRegistrationFormat),
    [currentCourseRegistrationFormat],
  );

  const isShowTextbook = useMemo(
    () => ['ALL', 'TEXTBOOK'].includes(currentCourseRegistrationFormat),
    [currentCourseRegistrationFormat],
  );

  const [addressResult, setAddressResult] = useState<Address>();

  const onAddressSearchResult = (value: Address) => {
    setAddressResult(value);
  };

  const { mutateAsync: createSingleCourseApplicationQueue } = useCreateSingleCourseApplicationQueue(
    { courseSequenceId, additionalInfo: { langLevelTest, bookDeliveryInfo } },
  );
  const submit = async () => {
    if (addressResult) {
      const isConfirm = await openModal({
        width: isMobile ? 'm_full' : 'md',
        content: (
          <AddressConfirmationPopup
            address={{
              roadAddress: addressResult.roadAddress,
              postalCode: addressResult.postalCode,
              detail: addressResult.detail,
            }}
            name="김현대"
            phoneNumber="01012341234"
          />
        ),
      });
      if (isConfirm) {
        await createSingleCourseApplicationQueue();
        // router.navigate({
        //   to: '/course/registration-complete',
        // });
      }
    }
  };

  const cancel = () => {
    openConfirm({
      title: <>수강 신청을 취소하시겠습니까?</>,
      content: (
        <p className="whitespace-pre">{`지금 취소하실 경우\n입력한 내용은 저장되지 않습니다.`}</p>
      ),
      cancelButtonLabel: '아니요',
    });
  };

  return (
    <>
      {/* 입력정보 */}
      <div className={styles.input_wrap}>
        {/* 사전 레벨테스트 */}
        {isShowLevelTest && <PreLevelTest />}
        {currentCourseRegistrationFormat === 'ALL' && (
          <div className="my-12 h-1 w-full bg-[#EFF0F1]" />
        )}
        {/* 교재 배송지 */}
        {isShowTextbook && (
          <TextbookDeliveryAddress onAddressSearchResult={onAddressSearchResult} />
        )}
      </div>
      {/* 안내사항 */}
      <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
        <dl className={noticeBoxStyles.check_point}>
          <dt>
            <IcoCaution width={24} height={24} stroke="#4d525c" />
            안내사항
          </dt>
          <dd>강사배정은 상황에 따라 변동될 수 있습니다.</dd>
          <dd>동일과정을 연속 신청하실 경우 레벨테스트가 없습니다.</dd>
        </dl>
      </div>

      {/* button */}
      <BrowserView>
        <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl" className="min" onClick={cancel}>
            취소
          </Button>
          <Button variant="primary" size="xl" onClick={submit}>
            신청
          </Button>
        </div>
      </BrowserView>

      <MobileView>
        <MobileContainerFooter>
          <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" className="min" onClick={cancel}>
              취소
            </Button>
            <Button variant="primary" size="xl" onClick={submit}>
              신청
            </Button>
          </div>
        </MobileContainerFooter>
      </MobileView>
    </>
  );
};

export const FormSection = FormSectionComponent;
