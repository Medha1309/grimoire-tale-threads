import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Windows98Window } from './Windows98Window';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { useAuth } from '../../contexts/AuthContext';

interface WindowState {
  id: string;
  title: string;
  component: React.ReactNode;
  isMinimized: boolean;
  isActive: boolean;
  zIndex: number;
}

export const DesktopShell: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(1);

  // Debug logging
  React.useEffect(() => {
    console.log('DesktopShell mounted');
  }, []);

  const desktopStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #008080 0%, #004040 100%)',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'hidden',
    fontFamily: '"MS Sans Serif", "Tahoma", sans-serif',
    zIndex: 1,
  };

  const iconsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 80px)',
    gap: '16px',
    padding: '16px',
    height: 'calc(100vh - 40px)',
    alignContent: 'start',
  };

  const desktopIcons = [
    { id: 'diary', icon: '📔', label: 'My Diary', path: '/dollhouse' },
    { id: 'stories', icon: '📚', label: 'Stories', path: '/stories' },
    { id: 'art', icon: '🎨', label: 'Art Studio', path: '/dollhouse/art' },
    { id: 'forum', icon: '💬', label: 'Tea Room', path: '/forum' },
    { id: 'facebook', icon: '📘', label: 'Facebook', path: '/forum/facebook' },
    { id: 'chains', icon: '⛓️', label: 'Chains', path: '/chains' },
    { id: 'scrapbook', icon: '📸', label: 'Scrapbook', path: '/dollhouse/scrapbook' },
    { id: 'archive', icon: '🗄️', label: 'Archive', path: '/dollhouse/archive' },
  ];

  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    const existingWindow = windows.find((w) => w.id === id);
    if (existingWindow) {
      // Bring to front and restore if minimized
      setWindows((prev) =>
        prev.map((w) => ({
          ...w,
          isActive: w.id === id,
          isMinimized: w.id === id ? false : w.isMinimized,
          zIndex: w.id === id ? nextZIndex : w.zIndex,
        }))
      );
      setNextZIndex((prev) => prev + 1);
    } else {
      // Create new window
      const newWindow: WindowState = {
        id,
        title,
        component: content,
        isMinimized: false,
        isActive: true,
        zIndex: nextZIndex,
      };
      setWindows((prev) => [
        ...prev.map((w) => ({ ...w, isActive: false })),
        newWindow,
      ]);
      setNextZIndex((prev) => prev + 1);
    }
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const handleIconClick = (icon: typeof desktopIcons[0]) => {
    setSelectedIcon(icon.id);
  };

  const handleIconDoubleClick = (icon: typeof desktopIcons[0]) => {
    navigate(icon.path);
  };

  const handleStartMenuClick = (item: string) => {
    switch (item) {
      case 'diary':
        navigate('/dollhouse');
        break;
      case 'stories':
        navigate('/stories');
        break;
      case 'art':
        navigate('/dollhouse/art');
        break;
      case 'forum':
        navigate('/forum');
        break;
      case 'chains':
        navigate('/chains');
        break;
      case 'settings':
        openWindow(
          'settings',
          'Settings',
          <div style={{ padding: '20px' }}>
            <h2>Settings</h2>
            <p>Settings panel coming soon...</p>
          </div>
        );
        break;
      case 'logout':
        logout();
        navigate('/login');
        break;
      case 'shutdown':
        if (confirm('Are you sure you want to shut down?')) {
          logout();
          navigate('/');
        }
        break;
    }
  };

  const handleWindowClick = (id: string) => {
    const window = windows.find((w) => w.id === id);
    if (window?.isMinimized) {
      setWindows((prev) =>
        prev.map((w) => ({
          ...w,
          isActive: w.id === id,
          isMinimized: w.id === id ? false : w.isMinimized,
          zIndex: w.id === id ? nextZIndex : w.zIndex,
        }))
      );
      setNextZIndex((prev) => prev + 1);
    }
  };

  return (
    <div style={desktopStyle} onClick={() => setSelectedIcon(null)}>
      <div style={iconsGridStyle}>
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => handleIconClick(icon)}
            onDoubleClick={() => handleIconDoubleClick(icon)}
            isSelected={selectedIcon === icon.id}
          />
        ))}
      </div>

      {windows
        .filter((w) => !w.isMinimized)
        .map((window) => (
          <Windows98Window
            key={window.id}
            title={window.title}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            isActive={window.isActive}
            zIndex={window.zIndex}
          >
            {window.component}
          </Windows98Window>
        ))}

      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onItemClick={handleStartMenuClick}
      />

      <Taskbar
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        openWindows={windows.map((w) => ({
          id: w.id,
          title: w.title,
          isMinimized: w.isMinimized,
        }))}
        onWindowClick={handleWindowClick}
      />
    </div>
  );
};
