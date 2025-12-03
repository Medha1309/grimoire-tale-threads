import React from 'react';
import { retroTokens } from '../../design-system/retro-tokens';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  onDoubleClick: () => void;
  isSelected?: boolean;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  onClick,
  onDoubleClick,
  isSelected = false,
}) => {
  const iconStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80px',
    padding: '8px',
    cursor: 'pointer',
    backgroundColor: isSelected
      ? retroTokens.windows98.colors.selectionBlue
      : 'transparent',
    border: isSelected ? '1px dotted #FFFFFF' : 'none',
    userSelect: 'none',
  };

  const iconImageStyle: React.CSSProperties = {
    fontSize: '32px',
    marginBottom: '4px',
    filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8))',
  };

  const labelStyle: React.CSSProperties = {
    color: '#FFFFFF',
    fontSize: '11px',
    fontFamily: retroTokens.windows98.fonts.system,
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    wordWrap: 'break-word',
  };

  return (
    <div style={iconStyle} onClick={onClick} onDoubleClick={onDoubleClick}>
      <div style={iconImageStyle}>{icon}</div>
      <div style={labelStyle}>{label}</div>
    </div>
  );
};
