import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { retroTokens } from '../../design-system/retro-tokens';

interface Windows98WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  defaultPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  isActive?: boolean;
  zIndex?: number;
}

export const Windows98Window: React.FC<Windows98WindowProps> = ({
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  defaultPosition = { x: 100, y: 100 },
  width = 600,
  height = 400,
  isActive = true,
  zIndex = 1,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize?.();
  };

  const windowStyle: React.CSSProperties = {
    width: isMaximized ? '100vw' : `${width}px`,
    height: isMaximized ? '100vh' : `${height}px`,
    position: isMaximized ? 'fixed' : 'absolute',
    top: isMaximized ? 0 : undefined,
    left: isMaximized ? 0 : undefined,
    zIndex,
    backgroundColor: retroTokens.windows98.colors.windowGray,
    border: `2px solid ${retroTokens.windows98.colors.buttonFace}`,
    borderTopColor: retroTokens.windows98.colors.buttonHighlight,
    borderLeftColor: retroTokens.windows98.colors.buttonHighlight,
    borderRightColor: retroTokens.windows98.colors.buttonDarkShadow,
    borderBottomColor: retroTokens.windows98.colors.buttonDarkShadow,
    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
    fontFamily: retroTokens.windows98.fonts.system,
    fontSize: retroTokens.windows98.fonts.size.normal,
  };

  const titleBarStyle: React.CSSProperties = {
    background: isActive
      ? `linear-gradient(to right, ${retroTokens.windows98.colors.titleBarActive}, #1084D0)`
      : retroTokens.windows98.colors.buttonFace,
    color: isActive ? '#FFFFFF' : '#000000',
    padding: '2px 4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'move',
    fontWeight: 'bold',
    userSelect: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    width: '16px',
    height: '14px',
    backgroundColor: retroTokens.windows98.colors.buttonFace,
    border: '1px solid',
    borderTopColor: retroTokens.windows98.colors.buttonHighlight,
    borderLeftColor: retroTokens.windows98.colors.buttonHighlight,
    borderRightColor: retroTokens.windows98.colors.buttonDarkShadow,
    borderBottomColor: retroTokens.windows98.colors.buttonDarkShadow,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    marginLeft: '2px',
  };

  const contentStyle: React.CSSProperties = {
    padding: '8px',
    height: 'calc(100% - 30px)',
    overflow: 'auto',
    backgroundColor: '#FFFFFF',
    border: '2px solid',
    borderTopColor: retroTokens.windows98.colors.buttonShadow,
    borderLeftColor: retroTokens.windows98.colors.buttonShadow,
    borderRightColor: retroTokens.windows98.colors.buttonHighlight,
    borderBottomColor: retroTokens.windows98.colors.buttonHighlight,
    margin: '2px',
  };

  return (
    <Draggable
      handle=".title-bar"
      defaultPosition={defaultPosition}
      disabled={isMaximized}
      bounds="parent"
    >
      <div style={windowStyle}>
        <div className="title-bar" style={titleBarStyle}>
          <span>{title}</span>
          <div style={{ display: 'flex' }}>
            {onMinimize && (
              <button
                style={buttonStyle}
                onClick={onMinimize}
                title="Minimize"
              >
                _
              </button>
            )}
            {onMaximize && (
              <button
                style={buttonStyle}
                onClick={handleMaximize}
                title={isMaximized ? 'Restore' : 'Maximize'}
              >
                {isMaximized ? '❐' : '□'}
              </button>
            )}
            {onClose && (
              <button
                style={{ ...buttonStyle, fontWeight: 'normal' }}
                onClick={onClose}
                title="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div style={contentStyle}>{children}</div>
      </div>
    </Draggable>
  );
};
