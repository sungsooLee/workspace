/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { IcoArrowDown, IcoClose02 } from '@learnway/icons';
import { Popover, Button } from '@learnway/ui';

import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import tooltipPopoverStyles from '@learnway/styles/bo/assets/styles/modules/tootip-popover.module.css';
import { NoticeBox } from '../../../../../../bo/src/shared/ui/';

export const Route = createFileRoute('/_guide/guide/popover')({
  component: RouteComponent,
});

const DropdownPopoverCompoment = () => {
  return (
    <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
      <Button>년도별 보기1</Button>
      <Button>년도별 보기2</Button>
      <Button>년도별 보기3</Button>
      <Button>년도별 보기444444444</Button>
    </div>
  );
};

function RouteComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const PopoverContent = () => {
    return (
      <div className={tooltipPopoverStyles.start}>
        <strong className={tooltipPopoverStyles.title}>{'도움말'}</strong>
        <div className={tooltipPopoverStyles.contents_wrap}>
          <NoticeBox
            iconVisible={false}
            type={'bullet'}
            description={
              '가이드 팝업은 텍스트 길이에 따라 가변적으로 노출됩니다. 가로 너비는 최대 640px으로 제한됩니다. 가이드 팝업은 텍스트 길이에 따라 가변적으로 노출됩니다. 가로 너비는 최대 640px으로 제한됩니다.'
            }
            descriptions={[
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
            ]}
          />
        </div>
        <Button
          className={tooltipPopoverStyles.btn_close}
          icon={<IcoClose02 />}
          onlyIcon
          onClick={() => setIsOpen(!isOpen)}
        />
        {/* 팝오버 내용 <Button label={'버튼'} onClick={() => setIsOpen(!isOpen)} /> */}
      </div>
    );
  };
  return (
    <div>
      <h2 className="guide_tit2">Popover Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/popover/popover.tsx</p>
      <p className="info">side: 'top' | 'right' | 'bottom' | 'left'</p>
      <p>
        클릭시 보여지는 레이어 사이즈가 애매하거나, 내용이 많을 경우는 dropdown대신 popover을
        활용한다.
      </p>

      <div className="group">
        <h3 className="guide_tit3">popover (기본)</h3>

        <div className="flex_box">
          <div className="desc w-full">
            <Popover
              popoverContent={<PopoverContent />}
              className=""
              side="bottom"
              align="start"
              sideOffset={10}
              open={isOpen}
              onOpenChange={setIsOpen}
              // onPointerDownOutside={(e) => e.preventDefault()}
              // onInteractOutside={(e) => e.preventDefault()}
            >
              {isOpen ? '팝오버 닫기' : '팝오버 열기'}
            </Popover>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// import 
import { memo } from 'react';
import { Popover } from '@learnway/ui';

const PopoverContent = () => {
  return (
    <div>
     팝오버 내용
    </div>
  );
};

const PopOverCompoment = () => {
  
  return (
    <Popover
      popoverContent={<PopoverContent />}
      className=""
      side="bottom"
      align="start"
      sideOffset={10}>
      팝오버 클릭요소
    </Popover>
  );
};

export const PopOverCompoment = memo(PopOverCompoment);`}</code>
          </pre>
        </div>
      </div>

      <div className="group">
        <h3 className="guide_tit3">popover (dropdown default 형식)</h3>

        <div className="flex_box">
          <div className="desc w-full">
            <Popover
              popoverContent={<DropdownPopoverCompoment />}
              className={dropdownPopoverStyles.btn}
              side="bottom"
              align="start"
              sideOffset={10}
            >
              <span>popover dropdown default 형식</span>
              <IcoArrowDown width={16} height={16} stroke="#131C30" />
            </Popover>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// import 
import { memo } from 'react';
import { Popover, Button } from '@learnway/ui';
import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';

const DropdownPopoverCompoment = () => {
  return (
    <div className={\`\${dropdownPopoverStyles.start} \${dropdownPopoverStyles.dropdown_wrap}\`}>
        <Button>년도별 보기1</Button>
        <Button>년도별 보기2</Button>
        <Button>년도별 보기3</Button>
        <Button>년도별 보기444444444</Button>
      </div>
  );
};

const PopOverCompoment = () => {
  
  return (
    <Popover
      popoverContent={<DropdownPopoverCompoment />}
      className={dropdownPopoverStyles.btn}
      side="bottom"
      align="start"
      sideOffset={10}>
        <span>{'popover text 형식'}</span>
        <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Popover>
  );
};

export const PopOverCompoment = memo(PopOverCompoment);`}</code>
          </pre>
        </div>
      </div>

      <div className="group">
        <h3 className="guide_tit3">popover (dropdown text 형식)</h3>

        <div className="flex_box">
          <div className="desc w-full">
            <Popover
              popoverContent={<DropdownPopoverCompoment />}
              className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text}`}
              side="bottom"
              align="end"
              sideOffset={10}
            >
              <span>popover dropdown text 형식</span>
              <IcoArrowDown width={16} height={16} stroke="#131C30" />
            </Popover>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// import 
import { memo } from 'react';
import { Popover, Button } from '@learnway/ui';
import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';

const DropdownPopoverCompoment = () => {
  return (
    <div className={\`\${dropdownPopoverStyles.start} \${dropdownPopoverStyles.dropdown_wrap}\`}>
        <Button>년도별 보기1</Button>
        <Button>년도별 보기2</Button>
        <Button>년도별 보기3</Button>
        <Button>년도별 보기444444444</Button>
      </div>
  );
};

const PopOverCompoment = () => {
  
  return (
    <Popover
      popoverContent={<DropdownPopoverCompoment />}
      className={\`\${dropdownPopoverStyles.btn} \${dropdownPopoverStyles.text}\`}
      side="bottom"
      align="end"
      sideOffset={10}>
        <span>{'popover dropdown text 형식'}</span>
        <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Popover>
  );
};

export const PopOverCompoment = memo(PopOverCompoment);`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
