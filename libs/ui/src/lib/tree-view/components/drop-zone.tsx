import React from 'react';
import { DropZoneGuide, DropZoneIndicatorLine } from './drop-zone-guide';
import {
  getDropZoneBackground,
  getDropZoneBorder,
  getDropZoneTransform,
  getDropZoneBoxShadow,
  DROP_ZONE_HEIGHTS,
  TRANSITIONS,
  ANIMATION_CLASSES,
} from '../dnd-tree-utils';

interface DropZoneProps {
  isHovered: boolean;
  isValid: boolean;
  isDragging: boolean;
  position: 'BEFORE' | 'AFTER';
  level: number;
  marginTop?: string;
  dropRef: (el: HTMLDivElement | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  isHovered,
  isValid,
  isDragging,
  position,
  level,
  marginTop = '4px',
  dropRef,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getHeight = () => {
    if (!isDragging) return DROP_ZONE_HEIGHTS.hidden;
    if (!isValid) return DROP_ZONE_HEIGHTS.hidden;
    if (isHovered) return DROP_ZONE_HEIGHTS.hovered;
    return DROP_ZONE_HEIGHTS.default;
  };

  const getMargin = () => {
    if (!isValid) return '0px';
    return marginTop;
  };

  return (
    <div
      ref={dropRef}
      className={`${isHovered && !isValid ? ANIMATION_CLASSES.invalidDropZone : ''}`}
      style={{
        position: 'relative',
        height: getHeight(),
        background: getDropZoneBackground(isHovered, isValid),
        marginTop: position === 'AFTER' ? getMargin() : undefined,
        marginBottom: position === 'BEFORE' ? '0px' : undefined,
        marginLeft: `${level * 28}px`,
        borderRadius: '8px',
        transition: TRANSITIONS.dropZone,
        border: getDropZoneBorder(isHovered, isValid),
        cursor: isHovered && isValid ? 'copy' : 'default',
        opacity: isDragging ? (isValid ? 1 : 0) : 0,
        transform: getDropZoneTransform(isHovered, isValid),
        zIndex: 20,
        boxShadow: getDropZoneBoxShadow(isHovered, isValid),
        willChange: 'transform, opacity, background, height',
        overflow: 'hidden',
        pointerEvents: isValid ? 'auto' : 'none',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <DropZoneGuide isHovered={isHovered} isValid={isValid} position={position} />
      <DropZoneIndicatorLine isHovered={isHovered} isValid={isValid} />
    </div>
  );
};
