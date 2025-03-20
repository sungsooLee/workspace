import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Input, DropdownList, DropdownOption, Button, RadioGroup } from '@learnway/ui';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import styles from './table.module.css'; // table css

export const Route = createFileRoute('/_guide/guide/table')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const options = [
    { value: 'type1', label: '전체' },
    { value: 'type2', label: '항목' },
    { value: 'type3', label: '항목3' },
  ];
  return (
    <div>
      <h2 className="guide_tit2">Table Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/table/table.tsx</p>
      <p className="info">table 컴포넌트로 변경 예정</p>
      <div className={cn(styles.start, styles.table_wrap)}>
        <table className={styles.table}>
          <caption>{'테이블 정보'}</caption>
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '16.6%' }} />
            <col style={{ width: '16.6%' }} />
            <col style={{ width: '16.6%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{'타이틀'}</th>
              <th scope="col">{'타이틀'}</th>
              <th scope="col">{'타이틀'}</th>
              <th scope="col">{'타이틀'}</th>
              <th scope="col">{'타이틀'}</th>
              <th scope="col">{'타이틀'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{'타이틀'}</th>
              <td>
                <RadioGroup
                  options={[
                    { value: 'type1', label: 'option1' },
                    { value: 'type1-2', label: 'option2' },
                    { value: 'type1-3', label: 'option3' },
                  ]}
                />
              </td>
              <td>
                <div className={formStyles.form_item}>
                  <div className={formStyles.input_box}>
                    <Input placeholder="입력" value={'텍스트'} />
                  </div>
                </div>
              </td>
              <td>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'sm'}
                />
              </td>
              <td>
                <div className={formStyles.form_item}>
                  <div className={formStyles.input_box}>
                    <Input showSearchIcon placeholder="입력" />
                    <Button variant={'gray'} size={'sm'}>
                      선택
                    </Button>
                  </div>
                  <p className={cn(formStyles.guide_text)}>기본 메시지</p>
                </div>
              </td>
              <td>
                <Button variant={'gray'} size={'sm'}>
                  버튼
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">{'타이틀'}</th>
              <td>{'데이터'}</td>
              <td>{'데이터'}</td>
              <td>{'데이터'}</td>
              <td>{'데이터'}</td>
              <td>{'데이터'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
