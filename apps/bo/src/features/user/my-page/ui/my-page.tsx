import { useState } from 'react';

import { cn, formatDate } from '@learnway/shared';
import { FormSubTitle } from '@shared/ui/form';
import { Avatar } from '@learnway/ui';

/* style */
// import contentsStyles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import styles from './my-page.module.css';
import { useFetchAuthUser, useUserDetail } from '@learnway/auth';
import { useFetchUser } from '@entities/users/service/users.hook';
import { useCreation } from 'ahooks';

import imgLogo from '@assets/images/temp/img_temp_company_logo.png';

export const AvataFallback = ({ name }: { name?: string }) => {
  const firstUnit = useCreation(() => {
    if (!name) {
      return '';
    }
    return name.substring(0, 1);
  }, [name]);
  return (
    <span className={styles.name}>
      <em className={styles.text}>{firstUnit}</em>
    </span>
  );
};

export function MyPage() {
  const { data: authUser } = useFetchAuthUser();
  const { data: user } = useUserDetail();

  console.log('authUser', authUser);
  console.log('user', user);
  return (
    <div className={styles.start}>
      <div className={styles.profile_wrap}>
        <div className={styles.avata_wrap}>
          <Avatar
            imageUrl={authUser?.avataImage}
            // imageUrl="https://github.com/shadcn.png"
            className={styles.info_avata}
            fallback={<AvataFallback name={authUser?.name} />}
          />
          <span className={styles.logo_wrap}>
            <img src={imgLogo} alt="" className={styles.logo_img} />
          </span>
        </div>
        <div className={styles.name_wrap}>
          <span className={styles.name}>{user?.name}</span>
          <span className={styles.eng_name}>{'Hyundae KIM'}</span>
        </div>
        <ul className={styles.list}>
          <li>
            <span className={styles.title}>{'사번'}</span>
            <p className={styles.text}>{user?.employeeNumber}</p>
          </li>
          <li>
            <span className={styles.title}>{'아이디(이메일)'}</span>
            <p className={styles.text}>{user?.email}</p>
          </li>
          <li>
            <span className={styles.title}>{'생년월일'}</span>
            <p className={styles.text}>{user?.birthday && formatDate(user?.birthday + '')}</p>
          </li>
          <li>
            <span className={styles.title}>{'성별'}</span>
            <p className={styles.text}>{'남성'}</p>
          </li>
        </ul>
      </div>
      <div className={styles.info_wrap}>
        <FormSubTitle label={'기본정보'} />
        <div className={cn(tableStyles.start, tableStyles.wrap)}>
          <table>
            <caption>{'기본정보'}</caption>
            <colgroup>
              <col style={{ width: '160px' }} />
              <col />
              <col style={{ width: '160px' }} />
              <col />
              <col style={{ width: '160px' }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope={'row'}>{'휴대폰번호'}</th>
                {/* <td>{'+82 10-1234-1234'}</td> */}
                <td>{user?.phoneNumber}</td>
                <th scope={'row'}>{'연락처(사무실)'}</th>
                {/* <td>{'+82 2-1234-1234'}</td> */}
                <td>{user?.companyTelephoneNumber}</td>
                <th scope={'row'}>{'지역'}</th>
                <td>{user?.workPlaceCode}</td>
              </tr>
              <tr>
                <th scope={'row'}>{'주소'}</th>
                <td colSpan={5}>{'(12345) 서울특별시 강남구 강남대로84길 13'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <FormSubTitle label={'회사 정보'} />
        <div className={cn(tableStyles.start, tableStyles.wrap)}>
          <table>
            <caption>{'회사 정보'}</caption>
            <colgroup>
              <col style={{ width: '160px' }} />
              <col />
              <col style={{ width: '160px' }} />
              <col />
              <col style={{ width: '160px' }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope={'row'}>{'회사'}</th>
                {/* <td>{'현대'}</td> */}
                <td>{user?.companyId}</td>
                <th scope={'row'}>{'본부/사업부'}</th>
                {/* <td>{'기업 전략실'}</td> */}
                <td>{user?.deptId}</td>
                <th scope={'row'}>{'부서'}</th>
                <td>{'경영팀'}</td>
              </tr>
              <tr>
                <th scope={'row'}>{'소속'}</th>
                <td>{'경영팀'}</td>
                <th scope={'row'}>{'직책'}</th>
                <td>{'팀장'}</td>
                <th scope={'row'}>{'직위'}</th>
                <td>{'과장'}</td>
              </tr>
              <tr>
                <th scope={'row'}>{'입사일자'}</th>
                <td>{'2020-01-02'}</td>
                <th scope={'row'}>{'재직상태'}</th>
                <td colSpan={3}>{'재직'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <FormSubTitle label={'기타 정보'} />
        <div className={cn(tableStyles.start, tableStyles.wrap)}>
          <table>
            <caption>{'기타 정보'}</caption>
            <colgroup>
              <col style={{ width: '160px' }} />
              <col />
              <col style={{ width: '160px' }} />
              <col />
              <col style={{ width: '160px' }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope={'row'}>{'업무 범위1'}</th>
                <td>{'영업 > 관리자'}</td>
                <th scope={'row'}>{'업무 범위1'}</th>
                <td>{'영업 > 관리자'}</td>
                <th scope={'row'}>{'업무 범위1'}</th>
                <td>{'영업 > 관리자'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
