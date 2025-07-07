import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import styles from '../tooltip/tooltip.module.css';

interface TooltipState {
  content: string | null;
  position: { x: number; y: number };
}

interface TooltipContextType {
  tooltip: TooltipState;
  showTooltip: (content: string, position: { x: number; y: number }) => void;
  hideTooltip: () => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    content: null,
    position: { x: 0, y: 0 },
  });

  const showTooltip = (content: string, position: { x: number; y: number }) => {
    setTooltip({ content, position });
  };

  const hideTooltip = () => {
    setTooltip({ content: null, position: { x: 0, y: 0 } });
  };

  return (
    <TooltipContext.Provider value={{ tooltip, showTooltip, hideTooltip }}>
      {children}
      {tooltip.content && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.position.x,
            top: tooltip.position.y,
            transform: 'translateX(-50%) translateY(-100%)',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          className={cn(styles.start, styles.tooltip_content)}
        >
          {tooltip.content}
        </div>
      )}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (context === undefined) {
    throw new Error('툴팁 프로바이더가 있어야 합니다.');
  }
  return context;
};
