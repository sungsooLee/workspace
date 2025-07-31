import { cn } from '@learnway/shared';
import { Input } from '@learnway/ui/input';
import { createFileRoute } from '@tanstack/react-router';
import styles from './table_styles.module.css';

export const Route = createFileRoute('/_guide/guide/normal_table')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className={cn(styles.start, 'normal_table')}>
        <table>
          <caption>{'이수기준 설정'}</caption>
          <colgroup>
            <col style={{ width: '112px' }} />
            <col />
            <col />
            <col style={{ width: '220px' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope={'col'}>{'구분'}</th>
              <th scope={'col'}>{'항목별 이수 기준'}</th>
              <th scope={'col'}>{'반영 비율'}</th>
              <th scope={'col'}>{'이수기준 점수'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{'진도'}</td>
              <td>
                <Input type={'text'} placeholder={'입력'} value={''} suffixText={'점 이상'} />
              </td>
              <td>
                <Input type={'text'} placeholder={'입력'} value={''} suffixText={'%'} />
              </td>
              <td rowSpan={4} className={styles.text_center}>
                항목별 반영비율 합이
                <br /> <strong>OO점</strong>이상입니다.
              </td>
            </tr>
            <tr>
              <td>{'출석'}</td>
              <td>
                <Input type={'text'} placeholder={'입력'} value={''} suffixText={'점 이상'} />
              </td>
              <td>
                <Input type={'text'} placeholder={'입력'} value={''} suffixText={'%'} />
              </td>
            </tr>
            <tr>
              <td>{'평가'}</td>
              <td>
                <Input type={'text'} placeholder={'입력'} value={''} suffixText={'점 이상'} />
              </td>
              <td>
                <Input type={'text'} placeholder={'입력'} value={''} suffixText={'%'} />
              </td>
            </tr>
            <tr>
              <td>{'과제'}</td>
              <td>
                <Input type={'text'} placeholder={'입력'} value={''} suffixText={'점 이상'} />
              </td>
              <td>
                <Input type={'text'} placeholder={'입력'} value={''} suffixText={'%'} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
