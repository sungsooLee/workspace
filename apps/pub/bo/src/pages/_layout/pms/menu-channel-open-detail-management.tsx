/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute, Link } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import { Textarea, Button, Tooltip } from '@/libs/ui/src';

export const Route = createFileRoute('/_layout/pms/menu-channel-open-detail-management')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <FormSubTitle label={'신청정보'} />
          <div className={cn(tableStyles.start, tableStyles.wrap)}>
            <table>
              <caption>{'신청정보'}</caption>
              <colgroup>
                <col style={{ width: '240px' }} />
                <col />
                <col style={{ width: '240px' }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope={'row'}>{'신청 ID'}</th>
                  <td>{'dd147852223'}</td>
                  <th scope={'row'}>{'채널명'}</th>
                  <td>{'채널명채널명채널명채널명'}</td>
                </tr>
                <tr>
                  <th scope={'row'}>{'테넌트 설정'}</th>
                  <td>{'테넌트명'}</td>
                  <th scope={'row'}>{'채널주소'}</th>
                  <td>{'http:/ddddd.ddddd.ddddddd'}</td>
                </tr>
                <tr>
                  <th scope={'row'}>{'채널 구분'}</th>
                  <td colSpan={3}>{'공개채널'}</td>
                </tr>
                <tr>
                  <th scope={'row'} className={tableStyles.align_top}>
                    {'채널 학습대상'}
                  </th>
                  <td colSpan={3}>
                    <Textarea
                      rows={5}
                      cols={10}
                      maxLength={2000}
                      resize={'none'}
                      placeholder={'입력'}
                      readOnly
                      size={'xs'}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={'row'} className={tableStyles.align_top}>
                    {'채널 운영목적'}
                  </th>
                  <td colSpan={3}>
                    <Textarea
                      rows={5}
                      cols={10}
                      maxLength={2000}
                      resize={'none'}
                      placeholder={'입력'}
                      readOnly
                      size={'xs'}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={'row'}>{'신청자명(사번)'}</th>
                  <td>
                    <Link to={'/'} className={tableStyles.link}>
                      {'홍길동(00000000)'}
                    </Link>
                  </td>
                  <th scope={'row'}>{'회사명/조직명'}</th>
                  <td>{'회사명00000/ 조직명000000'}</td>
                </tr>
                <tr>
                  <th scope={'row'}>{'신청일시'}</th>
                  <td>{'2025-01-05 15:15:00'}</td>
                  <th scope={'row'}>{'신청상태'}</th>
                  <td>
                    {'대기'} <span className={tableStyles.text_point}>{'접수'}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <FormSubTitle label={'접수정보'} />
          <div className={cn(tableStyles.start, tableStyles.wrap)}>
            <table>
              <caption>{'접수정보'}</caption>
              <colgroup>
                <col style={{ width: '240px' }} />
                <col />
                <col style={{ width: '240px' }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope={'row'}>{'접수 ID'}</th>
                  <td>
                    <div className={tableStyles.box}>
                      {'dd147852223'}

                      <Tooltip side="bottom" align="start" content={'tooltip content'}>
                        <Button variant={'gray2'} size={'sm'}>
                          {'채널등록'}
                        </Button>
                      </Tooltip>
                    </div>
                  </td>
                  <th scope={'row'}>{'채널 ID'}</th>
                  <td>
                    <Link to={'/'} className={tableStyles.link}>
                      {'IDkkkkkk'}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope={'row'}>{'채널 상태'}</th>
                  <td>{'등록전'}</td>
                  <th scope={'row'}>{'신청자 메일 발송'}</th>
                  <td>{'미발송'}</td>
                </tr>
                <tr>
                  <th scope={'row'}>{'결재자(사번)'}</th>
                  <td>
                    <Link to={'/'} className={tableStyles.link}>
                      {'김현대(00000000)'}
                    </Link>
                  </td>
                  <th scope={'row'}>{'접수일자'}</th>
                  <td>{'2025-01-05 15:15:00'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
