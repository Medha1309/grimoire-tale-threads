import React from 'react';
import { retroTokens } from '../../design-system/retro-tokens';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (item: string) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onItemClick,
}) => {
  if (!isOpen) return null;

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '30px',
    left: '2px',
    width: '200px',
    backgroundColor: retroTokens.windows98.colors.buttonFace,
    border: '2px solid',
    borderTopColor: retroTokens.windows98.colors.buttonHighlight,
    borderLeftColor: retroTokens.windows98.colors.buttonHighlight,
    borderRightColor: retroTokens.windows98.colors.buttonDarkShadow,
    borderBottomColor: retroTokens.windows98.colors.buttonDarkShadow,
    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
    fontFamily: retroTokens.windows98.fonts.system,
    fontSize: retroTokens.windows98.fonts.size.normal,
    zIndex: 10000,
  };

  const sidebarStyle: React.CSSProperties = {
    background: `linear-gradient(to bottom, ${retroTokens.windows98.colors.titleBarActive}, #000080)`,
    color: '#FFFFFF',
    padding: '8px',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    fontWeight: 'bold',
    fontSize: '18px',
    letterSpacing: '2px',
  };

  const menuItemStyle: React.CSSProperties = {
    padding: '8px 32px 8px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderBottom: '1px solid #808080',
  };

  const menuItemHoverStyle: React.CSSProperties = {
    ...menuItemStyle,
    backgroundColor: retroTokens.windows98.colors.titleBarActive,
    color: '#FFFFFF',
  };

  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const menuItems = [
    { id: 'diary', icon: '📔', label: 'My Diary' },
    { id: 'stories', icon: '📚', label: 'Stories' },
    { id: 'art', icon: '🎨', label: 'Art Studio' },
    { id: 'forum', icon: '💬', label: 'Forum' },
    { id: 'chains', icon: '⛓️', label: 'Chains' },
    { id: 'separator', icon: '', label: '' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
    { id: 'logout', icon: '🚪', label: 'Log Out' },
    { id: 'shutdown', icon: '🔌', label: 'Shut Down...' },
  ];

  const handleItemClick = (id: string) => {
    if (id !== 'separator') {
      onItemClick(id);
      onClose();
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998,
        }}
        onClick={onClose}
      />
      <div style={menuStyle}>
        <div style={{ display: 'flex' }}>
          <div style={sidebarStyle}>GRIMOIRE 98</div>
          <div style={{ flex: 1 }}>
            {menuItems.map((item) =>
              item.id === 'separator' ? (
                <div
                  key={item.id}
                  style={{
                    height: '2px',
                    backgroundColor: '#808080',
                    margin: '4px 0',
                  }}
                />
              ) : (
                <div
                  key={item.id}
                  style={
                    hoveredItem === item.id ? menuItemHoverStyle : menuItemStyle
                  }
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
