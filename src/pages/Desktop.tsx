import React from 'react';

export const Desktop: React.FC = () => {
  console.log('Desktop rendering');
  
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #008080 0%, #004040 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"MS Sans Serif", "Tahoma", sans-serif',
      }}
    >
      {/* Desktop Icons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 80px)',
          gap: '16px',
          padding: '16px',
          flex: 1,
        }}
      >
        {[
          { icon: '📔', label: 'My Diary', path: '/dollhouse' },
          { icon: '📚', label: 'Stories', path: '/stories' },
          { icon: '🎨', label: 'Art Studio', path: '/dollhouse/art' },
          { icon: '💬', label: 'Tea Room', path: '/forum' },
          { icon: '📘', label: 'Facebook', path: '/forum/facebook' },
          { icon: '⛓️', label: 'Chains', path: '/chains' },
        ].map((item) => (
          <a
            key={item.path}
            href={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80px',
              padding: '8px',
              cursor: 'pointer',
              textDecoration: 'none',
              color: '#FFFFFF',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>
              {item.icon}
            </div>
            <div
              style={{
                fontSize: '11px',
                textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
              }}
            >
              {item.label}
            </div>
          </a>
        ))}
      </div>

      {/* Taskbar */}
      <div
        style={{
          height: '28px',
          backgroundColor: '#D4D0C8',
          borderTop: '2px solid #FFFFFF',
          display: 'flex',
          alignItems: 'center',
          padding: '2px',
          gap: '4px',
        }}
      >
        <button
          style={{
            height: '22px',
            padding: '0 16px',
            backgroundColor: '#D4D0C8',
            border: '2px outset #D4D0C8',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '16px' }}>🪟</span>
          <span>Start</span>
        </button>

        <div style={{ marginLeft: 'auto', padding: '0 8px' }}>
          {new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
};
