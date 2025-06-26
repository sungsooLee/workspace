import { createFileRoute } from '@tanstack/react-router';
import { Badge } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/badge')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Badge Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/badge/badge.tsx</p>
      <p className="info">
        variant: 'dot' | 'number' | 'flag' | 'outline';
        <br />
        status: 'primary' | 'disabled' | 'success' | 'warning' | 'caution' | 'new' | 'error' |
        'gray';
        <br />
        rounded: boolean; // 라운드 여부
        <br />
        labelType : 'bold' | 'normal'; // 라벨 폰트 bold / normal
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Badge } from '@learnway/ui';

// 적용방법(예시)
<Badge option={{ label: 'html', value: 'html' }} />;`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">Badge dot 타입</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge option={{ label: '', value: '' }} variant="dot" status="primary" />
            <Badge option={{ label: '', value: '' }} variant="dot" status="disabled" />
            <Badge option={{ label: '', value: '' }} variant="dot" status="warning" />
            <Badge option={{ label: '', value: '' }} variant="dot" status="error" />
          </div>
        </div>
        <h3 className="guide_tit3">Badge dot 타입(size : sm)</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge option={{ label: '', value: '' }} variant="dot" status="primary" size="sm" />
            <Badge option={{ label: '', value: '' }} variant="dot" status="disabled" size="sm" />
            <Badge option={{ label: '', value: '' }} variant="dot" status="warning" size="sm" />
            <Badge option={{ label: '', value: '' }} variant="dot" status="error" size="sm" />
          </div>
        </div>
        <h3 className="guide_tit3">Badge gray 타입</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge option={{ label: '태그 라벨', value: 'a' }} status="gray" size="xs" />
            <Badge
              option={{ label: '태그 라벨', value: 'a' }}
              status="gray"
              size="sm"
              labelType={'bold'}
            />
            <Badge option={{ label: '태그 라벨', value: 'a' }} status="gray" size="md" rounded />
            <Badge
              option={{ label: '태그 라벨', value: 'a' }}
              status="gray"
              size="lg"
              rounded
              labelType={'bold'}
            />
          </div>
        </div>
        <h3 className="guide_tit3">Badge gray outline 타입</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge
              option={{ label: '태그 라벨', value: 'a' }}
              variant="outline"
              status="gray"
              size="xs"
            />
            <Badge
              option={{ label: '태그 라벨', value: 'a' }}
              variant="outline"
              status="gray"
              size="sm"
              labelType={'bold'}
            />
            <Badge
              option={{ label: '태그 라벨', value: 'a' }}
              variant="outline"
              status="gray"
              size="md"
              rounded
            />
            <Badge
              option={{ label: '태그 라벨', value: 'a' }}
              variant="outline"
              status="gray"
              size="lg"
              rounded
              labelType={'bold'}
            />
          </div>
        </div>
        <h3 className="guide_tit3">Badge primary 타입</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge option={{ label: '태그 라벨', value: 'a' }} status="primary" size="xs" />
            <Badge
              option={{ label: '태그 라벨', value: 'a' }}
              status="primary"
              size="sm"
              labelType={'bold'}
            />
            <Badge option={{ label: '태그 라벨', value: 'a' }} status="primary" size="md" rounded />
            <Badge
              option={{ label: '태그 라벨', value: 'a' }}
              status="primary"
              size="lg"
              rounded
              labelType={'bold'}
            />
          </div>
        </div>
        {/* <h3 className="guide_tit3">Badge number 타입</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge option={{ label: '1', value: 'A' }} variant="number" status="primary" />
            <Badge option={{ label: '2', value: 'B' }} variant="number" status="primary" />
            <Badge option={{ label: '3', value: 'C' }} variant="number" status="primary" />
            <Badge option={{ label: '99', value: 'D' }} variant="number" status="primary" />
            <Badge option={{ label: '999+', value: 'D' }} variant="number" status="primary" />
          </div>
        </div>
        <h3 className="guide_tit3">Badge number 타입(size : sm)</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge
              option={{ label: '1', value: 'A' }}
              variant="number"
              status="primary"
              size="sm"
            />
            <Badge
              option={{ label: '2', value: 'B' }}
              variant="number"
              status="primary"
              size="sm"
            />
            <Badge
              option={{ label: '3', value: 'C' }}
              variant="number"
              status="primary"
              size="sm"
            />
            <Badge
              option={{ label: '99', value: 'D' }}
              variant="number"
              status="primary"
              size="sm"
            />
            <Badge
              option={{ label: '999+', value: 'D' }}
              variant="number"
              status="primary"
              size="sm"
            />
          </div>
        </div>
        <h3 className="guide_tit3">Badge new 타입</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge option={{ label: '1', value: 'A' }} variant="number" status="new" />
            <Badge option={{ label: '2', value: 'B' }} variant="number" status="new" />
            <Badge option={{ label: '3', value: 'C' }} variant="number" status="new" />
            <Badge option={{ label: '99', value: 'D' }} variant="number" status="new" />
            <Badge option={{ label: '999+', value: 'D' }} variant="number" status="new" />
          </div>
        </div>
        <h3 className="guide_tit3">Badge new 타입(size : sm)</h3>
        <div className="flex_box">
          <div className="desc">
            <Badge option={{ label: '1', value: 'A' }} variant="number" status="new" size="sm" />
            <Badge option={{ label: '2', value: 'B' }} variant="number" status="new" size="sm" />
            <Badge option={{ label: '3', value: 'C' }} variant="number" status="new" size="sm" />
            <Badge option={{ label: '99', value: 'D' }} variant="number" status="new" size="sm" />
            <Badge option={{ label: '999+', value: 'D' }} variant="number" status="new" size="sm" />
          </div>
        </div> */}
      </div>
    </div>
  );
}
