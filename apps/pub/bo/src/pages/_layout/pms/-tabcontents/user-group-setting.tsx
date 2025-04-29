import { FC } from 'react';
import { cn } from '@learnway/shared';
import { ChipList, SelectOption } from '@learnway/ui';
// eslint-disable-next-line no-empty-pattern
const UserGroupSettingComponent: FC<{}> = ({}) => {
  const options: SelectOption[] = [
    { label: '채널 - 채널1 > 유저그룹명1', value: 'A' },
    { label: '조직 - 테넌트A > 현대자동차 >  경영지원본부 > 경영지원1팀', value: 'B' },
  ];
  return (
    <div>
      <ChipList options={options} size="xs" />
    </div>
  );
};

UserGroupSettingComponent.displayName = 'UserGroupSetting';
export const UserGroupSetting = UserGroupSettingComponent;
