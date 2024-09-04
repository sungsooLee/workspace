import { cn } from '@/shared/utils/utils';
import { ReactNode } from 'react';

interface CommonCardTitleProps {
  children: ReactNode;
  className?: string;
}

const CommonCardTitle = ({ children, className }: CommonCardTitleProps) => {
  return <div className={cn('text-xl font-bold', className)}>{children}</div>;
};

interface CommonCardContentsProps {
  children: ReactNode;
  className?: string;
}

const CommonCardContents = ({
  children,
  className,
}: CommonCardContentsProps) => {
  return (
    <div className={cn('bg-slate-500 p-4', className)}>
      <p>이 영역은 공통 영역</p>
      {children}
    </div>
  );
};

interface CommonCardButtonsProps {
  children: ReactNode;
  className?: string;
}

const CommonCardButtons = ({ children, className }: CommonCardButtonsProps) => {
  return (
    <div className={cn('mt-4 flex justify-end', className)}>{children}</div>
  );
};

interface CommonCardProps {
  children: ReactNode;
  className?: string;
}

const CommonCard = ({ children, className }: CommonCardProps) => {
  return (
    <div className={cn('rounded-lg bg-white shadow-md', className)}>
      {children}
    </div>
  );
};

CommonCard.Title = CommonCardTitle;
CommonCard.Contents = CommonCardContents;
CommonCard.Buttons = CommonCardButtons;

export default CommonCard;
