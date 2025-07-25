import { forwardRef, ReactNode, useState } from 'react';

import * as Primitive from '@radix-ui/react-popover';

import { List } from '../list/list';

// PopoverListProps: PopoverList 컴포넌트의 props 타입 정의
interface PopoverListProps extends Primitive.PopoverContentProps {
  children: ReactNode; // 트리거 역할을 할 자식 노드
  options: Array<any>; // 리스트에 표시할 옵션 배열
  onOptionSelect: (option: any) => void; // 옵션 선택 시 호출되는 콜백
}

// PopoverList의 실제 구현 컴포넌트
const Component = forwardRef<React.ElementRef<typeof Primitive.Popover>, PopoverListProps>(
  ({ children, options, onOptionSelect, ...props }, ref) => {
    // 팝오버 열림/닫힘 상태 관리
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // 옵션 선택 시 팝오버 닫고 콜백 실행
    const handleOptionSelect = (option: any) => {
      setIsOpen(false);
      onOptionSelect(option);
    };

    return (
      <Primitive.Root open={isOpen} onOpenChange={setIsOpen}>
        {/* 트리거 역할을 하는 자식 노드 */}
        <Primitive.Trigger asChild>{children}</Primitive.Trigger>
        {/* 팝오버 컨텐츠: 옵션 리스트 렌더링 */}
        <Primitive.Content {...props}>
          <List options={options} onOptionSelect={handleOptionSelect} />
        </Primitive.Content>
      </Primitive.Root>
    );
  },
);

// PopoverList 컴포넌트 export
export const PopoverList = Component;
