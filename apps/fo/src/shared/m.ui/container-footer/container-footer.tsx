import { memo, ReactNode } from 'react';

interface ContainerFooterComponentProps {
  children: ReactNode;
}

function ContainerFooterComponent({ children }: ContainerFooterComponentProps) {
  return <div>{children}</div>;
}

export const MobileContainerFooter = memo(ContainerFooterComponent);
