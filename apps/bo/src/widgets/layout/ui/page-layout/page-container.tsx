import { FC, ReactNode, Children, isValidElement } from 'react';
import './page-container.css';
import PageButtons from './slot/page-buttons';
import PageLeft from './slot/page-left';
import PageRight from './slot/page-right';
const PageContainer: FC<{
  children: ReactNode;
  panel?: boolean;
}> = ({ children, panel = false }) => {
  const ButtonSlot = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === PageButtons,
  );
  const BodySlot = Children.toArray(children).filter(
    (child) => !(isValidElement(child) && child.type === PageButtons),
  );

  const LeftSlot = Children.toArray(BodySlot).filter(
    (child) => isValidElement(child) && child.type === PageLeft,
  );
  const RightSlot = Children.toArray(BodySlot).filter(
    (child) => isValidElement(child) && child.type === PageRight,
  );
  const isDivision = Children.count(LeftSlot) > 0 && Children.count(RightSlot) > 0;

  return (
    <div className={`page-container`}>
      <div className={'pc-header'}>
        <div className={'pc-title'}>title</div>
        <div className={'pc-buttons'}>{ButtonSlot}</div>
      </div>
      <div className={`pc-body ${isDivision ? 'division' : ''} ${panel ? 'panel' : ''}`}>
        {isDivision ? (
          <>
            <div className="pc-body-left">{LeftSlot}</div>
            <div className="pc-body-right">{RightSlot}</div>
          </>
        ) : (
          <>{BodySlot}</>
        )}
      </div>
    </div>
  );
};

export default PageContainer;
