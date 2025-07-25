import { forwardRef } from 'react';
import { CourseDetailTabBaseProps } from '../../../../types/type';

const CommunityComponent = forwardRef<HTMLElement, CourseDetailTabBaseProps>((_, ref) => {
  // 부모 컴포넌트에서 호출할 수 있는 메서드
  return <>Community</>;
});

export const Community = CommunityComponent;
