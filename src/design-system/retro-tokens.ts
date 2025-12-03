/**
 * Retro Design Tokens
 * Windows 98 and Facebook 2007-2010 aesthetics
 */

export const retroTokens = {
  // Windows 98 Design System
  windows98: {
    colors: {
      // Window chrome
      titleBar: '#000080',
      titleBarActive: '#1084D0',
      titleBarInactive: '#808080',
      titleBarText: '#FFFFFF',
      
      // Window body
      windowGray: '#C0C0C8',
      windowBackground: '#FFFFFF',
      
      // Buttons
      buttonFace: '#D4D0C8',
      buttonShadow: '#808080',
      buttonHighlight: '#FFFFFF',
      buttonDarkShadow: '#000000',
      buttonText: '#000000',
      
      // Desktop
      desktopBackground: '#008080', // Teal
      desktopIconText: '#FFFFFF',
      desktopIconShadow: '#000000',
      
      // Selection
      selectionBlue: '#0078D7',
      selectionText: '#FFFFFF',
    },
    
    fonts: {
      system: '"MS Sans Serif", "Tahoma", "Arial", sans-serif',
      systemBold: '"MS Sans Serif", "Tahoma", "Arial", sans-serif',
      size: {
        small: '11px',
        normal: '12px',
        large: '14px',
      },
    },
    
    borders: {
      raised: '2px solid #FFFFFF, 2px solid #808080',
      sunken: '2px solid #808080, 2px solid #FFFFFF',
      window: '2px solid #D4D0C8',
    },
    
    shadows: {
      window: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      button: 'inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #808080',
      buttonPressed: 'inset -1px -1px 0 #FFFFFF, inset 1px 1px 0 #808080',
    },
  },

  // Facebook 2007-2010 Design System
  facebook2007: {
    colors: {
      // Primary blue
      blue: '#3B5998',
      blueLight: '#6D84B4',
      blueDark: '#2B4170',
      blueHover: '#5B7AB8',
      
      // Backgrounds
      white: '#FFFFFF',
      gray: '#F7F7F7',
      grayLight: '#FAFAFA',
      grayDark: '#E9EBEE',
      
      // Borders
      border: '#D8DFEA',
      borderLight: '#E5E5E5',
      borderDark: '#CCCCCC',
      
      // Text
      text: '#333333',
      textLight: '#666666',
      textMuted: '#999999',
      link: '#3B5998',
      linkHover: '#2B4170',
      
      // Actions
      like: '#3B5998',
      comment: '#666666',
      share: '#666666',
      
      // Status
      online: '#42B72A',
      offline: '#999999',
      
      // Notifications
      notificationRed: '#FA3E3E',
      notificationBadge: '#FF0000',
    },
    
    fonts: {
      main: '"Lucida Grande", "Tahoma", "Verdana", "Arial", sans-serif',
      size: {
        tiny: '10px',
        small: '11px',
        normal: '12px',
        medium: '13px',
        large: '14px',
      },
      weight: {
        normal: 400,
        semibold: 600,
        bold: 700,
      },
    },
    
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    
    borderRadius: {
      none: '0',
      small: '2px',
      medium: '3px',
      large: '5px',
      round: '50%',
    },
    
    shadows: {
      card: '0 1px 2px rgba(0, 0, 0, 0.1)',
      dropdown: '0 3px 8px rgba(0, 0, 0, 0.3)',
      modal: '0 2px 26px rgba(0, 0, 0, 0.3)',
    },
  },

  // Spooky/Horror additions for both themes
  haunted: {
    colors: {
      bloodRed: '#8B0000',
      darkRed: '#5C0000',
      ghostWhite: '#F8F8FF',
      shadowBlack: '#1A1A1A',
      decayBrown: '#4A3728',
      eerieGreen: '#00FF00',
      mysticalPurple: '#6A0DAD',
      hauntedGray: '#2C2C2C',
    },
    
    effects: {
      glitch: 'hue-rotate(180deg) saturate(3)',
      ghostly: 'opacity(0.7) blur(1px)',
      decay: 'sepia(0.5) contrast(0.8)',
      cursed: 'invert(0.1) hue-rotate(45deg)',
    },
  },
};

// Helper function to create Windows 98 button style
export const createWin98ButtonStyle = (pressed = false) => ({
  backgroundColor: retroTokens.windows98.colors.buttonFace,
  border: pressed
    ? `2px solid ${retroTokens.windows98.colors.buttonDarkShadow}`
    : `2px solid ${retroTokens.windows98.colors.buttonHighlight}`,
  borderRightColor: pressed
    ? retroTokens.windows98.colors.buttonHighlight
    : retroTokens.windows98.colors.buttonDarkShadow,
  borderBottomColor: pressed
    ? retroTokens.windows98.colors.buttonHighlight
    : retroTokens.windows98.colors.buttonDarkShadow,
  fontFamily: retroTokens.windows98.fonts.system,
  fontSize: retroTokens.windows98.fonts.size.normal,
  padding: '4px 12px',
  cursor: 'pointer',
});

// Helper function to create Facebook button style
export const createFacebookButtonStyle = (variant: 'primary' | 'secondary' = 'secondary') => ({
  backgroundColor: variant === 'primary' 
    ? retroTokens.facebook2007.colors.blue 
    : retroTokens.facebook2007.colors.gray,
  color: variant === 'primary' 
    ? retroTokens.facebook2007.colors.white 
    : retroTokens.facebook2007.colors.text,
  border: `1px solid ${retroTokens.facebook2007.colors.border}`,
  borderRadius: retroTokens.facebook2007.borderRadius.small,
  fontFamily: retroTokens.facebook2007.fonts.main,
  fontSize: retroTokens.facebook2007.fonts.size.small,
  fontWeight: retroTokens.facebook2007.fonts.weight.semibold,
  padding: '4px 12px',
  cursor: 'pointer',
});

export default retroTokens;
