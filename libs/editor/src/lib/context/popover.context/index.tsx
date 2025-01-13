import React, {
  createContext,
  FC,
  RefObject,
  useRef,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  ReactNode,
  FunctionComponent,
  SVGProps,
} from 'react';
import { createPortal } from 'react-dom';
import { isDOMNode } from 'lexical';
import ChevronDown from '../../assets/images/icons/chevron-down.svg?react';
type PopoverContext = {
  registerItem: (ref: RefObject<HTMLButtonElement>) => void;
};

const Context = createContext<PopoverContext | null>(null);

const dropDownPadding = 4;

interface PopoverItemProps {
  children: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}
export const PopoverItem: FC<PopoverItemProps> = ({ children, className = '', onClick, title }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const dropDownContext = useContext(Context);

  if (dropDownContext === null) {
    throw new Error('DropDownItem must be used within a DropDown');
  }

  const { registerItem } = dropDownContext;

  useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);

  return (
    <button className={className} onClick={onClick} ref={ref} title={title} type="button">
      {children}
    </button>
  );
};

interface PopoverItemsProps {
  children: React.ReactNode;
  dropDownRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
}
const PopoverItems: FC<PopoverItemsProps> = ({ children, dropDownRef, onClose }) => {
  const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>();
  const [highlightedItem, setHighlightedItem] = useState<React.RefObject<HTMLButtonElement>>();

  const registerItem = useCallback(
    (itemRef: React.RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
    },
    [setItems],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items) {
      return;
    }

    const key = event.key;

    if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
      event.preventDefault();
    }

    if (key === 'Escape' || key === 'Tab') {
      onClose();
    } else if (key === 'ArrowUp') {
      setHighlightedItem((prev) => {
        if (!prev) {
          return items[0];
        }
        const index = items.indexOf(prev) - 1;
        return items[index === -1 ? items.length - 1 : index];
      });
    } else if (key === 'ArrowDown') {
      setHighlightedItem((prev) => {
        if (!prev) {
          return items[0];
        }
        return items[items.indexOf(prev) + 1];
      });
    }
  };

  const contextValue = useMemo(
    () => ({
      registerItem,
    }),
    [registerItem],
  );

  useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0]);
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus();
    }
  }, [items, highlightedItem]);

  return (
    <Context.Provider value={contextValue}>
      <div className="nlp--editor-popover-items" ref={dropDownRef} onKeyDown={handleKeyDown}>
        {children}
      </div>
    </Context.Provider>
  );
};

interface PopoverProps {
  disabled?: boolean;
  label?: string;
  className?: string;
  icon?: ReactNode | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children: ReactNode;
  stopCloseOnClickSelf?: boolean;
}
const Popover: FC<PopoverProps> = ({
  disabled = false,
  label,
  className,
  icon,
  children,
  stopCloseOnClickSelf,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleClose = () => {
    setShowDropDown(false);
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    const dropDown = dropDownRef.current;

    if (showDropDown && button !== null && dropDown !== null) {
      const { top, left } = button.getBoundingClientRect();
      dropDown.style.top = `${top + button.offsetHeight + dropDownPadding}px`;
      dropDown.style.left = `${Math.min(left, window.innerWidth - dropDown.offsetWidth - 20)}px`;
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target;
        if (!isDOMNode(target)) {
          return;
        }
        if (stopCloseOnClickSelf) {
          if (dropDownRef.current && dropDownRef.current.contains(target)) {
            return;
          }
        }
        if (!button.contains(target)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);

  useEffect(() => {
    const handleButtonPositionUpdate = () => {
      if (showDropDown) {
        const button = buttonRef.current;
        const dropDown = dropDownRef.current;
        if (button !== null && dropDown !== null) {
          const { top } = button.getBoundingClientRect();
          const newPosition = top + button.offsetHeight + dropDownPadding;
          if (newPosition !== dropDown.getBoundingClientRect().top) {
            dropDown.style.top = `${newPosition}px`;
          }
        }
      }
    };

    document.addEventListener('scroll', handleButtonPositionUpdate);

    return () => {
      document.removeEventListener('scroll', handleButtonPositionUpdate);
    };
  }, [buttonRef, dropDownRef, showDropDown]);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={`hover:bg-gray-3 flex h-[36px] items-center justify-center gap-1 rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent ${className}`}
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        ref={buttonRef}>
        <IconRenderer icon={icon} />
        {label && <span className="text dropdown-button-text">{label}</span>}
        <ChevronDown />
      </button>
      {showDropDown &&
        createPortal(
          <PopoverItems dropDownRef={dropDownRef} onClose={handleClose}>
            {children}
          </PopoverItems>,
          document.body,
        )}
    </>
  );
};

export default Popover;

type IconProps = {
  icon?: ReactNode | FunctionComponent<SVGProps<SVGSVGElement>>;
};

const IconRenderer: React.FC<IconProps> = ({ icon }) => {
  if (!icon) {
    return null; // 아이콘이 없을 경우 null 반환
  }

  // icon이 ReactNode일 경우 그대로 렌더링
  if (React.isValidElement(icon)) {
    return <>{icon}</>;
  }

  // icon이 FunctionComponent일 경우 컴포넌트를 호출하여 렌더링
  if (typeof icon === 'function') {
    const SvgIcon = icon; // TypeScript가 타입 추론 가능
    return (
      <SvgIcon
        width={24}
        height={24}
        fill="currentColor"
        // SVGProps에 필요한 prop 전달 가능
      />
    );
  }
  // icon이 예상과 다른 경우 null 반환
  return null;
};
