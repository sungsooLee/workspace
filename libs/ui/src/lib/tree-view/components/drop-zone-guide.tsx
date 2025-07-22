import React from 'react';
import { getDropZoneGuideText, getDropZoneGuideTextColor, ANIMATION_CLASSES } from '../dnd-tree-utils';

interface DropZoneGuideProps {
  isHovered: boolean;
  isValid: boolean;
  position: 'BEFORE' | 'AFTER' | 'INSIDE';
}

export const DropZoneGuide: React.FC<DropZoneGuideProps> = ({ isHovered, isValid, position }) => {
  if (!isHovered) return null;

  const guideText = getDropZoneGuideText(position, isValid);
  const textColor = getDropZoneGuideTextColor(isValid);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '10px',
        fontWeight: '600',
        color: textColor,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
        animation: `${ANIMATION_CLASSES.guideHintFloat} 0.3s ease`,
      }}
    >
      {guideText}
    </div>
  );
};

export const DropZoneIndicatorLine: React.FC<{ isHovered: boolean; isValid: boolean }> = ({ 
  isHovered, 
  isValid 
}) => {
  if (!isHovered || !isValid) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        right: '10%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
        borderRadius: '1px',
        animation: `${ANIMATION_CLASSES.dropLinePulse} 1s ease-in-out infinite`,
        transform: 'translateY(-50%)',
      }}
    />
  );
};

export const InsideDropGuide: React.FC<DropZoneGuideProps> = ({ isHovered, isValid, position }) => {
  if (!isHovered) return null;

  const guideText = getDropZoneGuideText(position, isValid);
  const textColor = getDropZoneGuideTextColor(isValid);
  const backgroundColor = isValid ? 'rgba(33, 150, 243, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  const borderColor = isValid ? '#2196f3' : '#ef4444';

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        right: '8px',
        transform: 'translateY(-50%)',
        fontSize: '11px',
        fontWeight: '600',
        color: textColor,
        background: backgroundColor,
        padding: '4px 8px',
        borderRadius: '6px',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 1000,
        animation: `${ANIMATION_CLASSES.guideHintFloat} 0.3s ease`,
        backdropFilter: 'blur(4px)',
        border: `1px solid ${borderColor}`,
      }}
    >
      {guideText}
    </div>
  );
};