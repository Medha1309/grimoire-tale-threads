import React, { useState, useEffect } from 'react';
import { retroTokens } from '../../design-system/retro-tokens';

interface TaskbarProps {
  onStartClick: () => void;
  openWindows: Array<{ id: string; title: string; isMinimized: boolean }>;
  onWindowClick: (id: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  onStartClick,
  openWindows,
  onWindowClick,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const taskbarStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '28px',
    backgroundColor: retroTokens.windows98.colors.buttonFace,
    borderTop: `2px solid ${retroTokens.windows98.colors.buttonHighlight}`,
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
    fontFamily: retroTokens.windows98.fonts.system,
    fontSize: retroTokens.windows98.fonts.size.normal,
    zIndex: 9999,
  };

  const startButtonStyle: React.CSSProperties = {
    height: '22px',
    padding: '0 16px',
    backgroundColor: retroTokens.windows98.colors.buttonFace,
    border: '2px solid',
    borderTopColor: retroTokens.windows98.colors.buttonHighlight,
    borderLeftColor: retroTokens.windows98.colors.buttonHighlight,
    borderRightColor: retroTokens.windows98.colors.buttonDarkShadow,
    borderBottomColor: retroTokens.windows98.colors.buttonDarkShadow,
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginRight: '4px',
  };

  const windowButtonStyle: React.CSSProperties = {
    height: '22px',
    padding: '0 12px',
    backgroundColor: retroTokens.windows98.colors.buttonFace,
    border: '2px solid',
    borderTopColor: retroTokens.windows98.colors.buttonHighlight,
    borderLeftColor: retroTokens.windows98.colors.buttonHighlight,
    borderRightColor: retroTokens.windows98.colors.buttonDarkShadow,
    borderBottomColor: retroTokens.windows98.colors.buttonDarkShadow,
    cursor: 'pointer',
    marginRight: '2px',
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const systemTrayStyle: React.CSSProperties = {
    marginLeft: 'auto',
    height: '22px',
    padding: '0 8px',
    backgroundColor: retroTokens.windows98.colors.buttonFace,
    border: '1px solid',
    borderTopColor: retroTokens.windows98.colors.buttonShadow,
    borderLeftColor: retroTokens.windows98.colors.buttonShadow,
    borderRightColor: retroTokens.windows98.colors.buttonHighlight,
    borderBottomColor: retroTokens.windows98.colors.buttonHighlight,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div style={taskbarStyle}>
      <button style={startButtonStyle} onClick={onStartClick}>
        <span style={{ fontSize: '16px' }}>🪟</span>
        <span>Start</span>
      </button>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {openWindows.map((window) => (
          <button
            key={window.id}
            style={{
              ...windowButtonStyle,
              borderTopColor: window.isMinimized
                ? retroTokens.windows98.colors.buttonHighlight
                : retroTokens.windows98.colors.buttonShadow,
              borderLeftColor: window.isMinimized
                ? retroTokens.windows98.colors.buttonHighlight
                : retroTokens.windows98.colors.buttonShadow,
              borderRightColor: window.isMinimized
                ? retroTokens.windows98.colors.buttonDarkShadow
                : retroTokens.windows98.colors.buttonHighlight,
              borderBottomColor: window.isMinimized
                ? retroTokens.windows98.colors.buttonDarkShadow
                : retroTokens.windows98.colors.buttonHighlight,
            }}
            onClick={() => onWindowClick(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>

      <div style={systemTrayStyle}>
        <span style={{ fontSize: '12px' }}>🔊</span>
        <span>{formatTime(currentTime)}</span>
      </div>
    </div>
  );
};
