import { useState, useEffect } from 'react';

export const THEME = {
  colors: {
    bg: '#0a0a0a',
    surface: '#111111',
    border: '#1a1a1a',
    borderMedium: '#333333',
    borderLight: '#444444',
    textPrimary: '#ffffff',
    textSecondary: '#888888',
    textMuted: '#555555',
    accentGreen: '#00E676',
    warning: '#ff3d00',
  },
  fonts: {
    sans: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  borderRadius: '2px',
};

export const styles = {
  pageBg: {
    backgroundColor: THEME.colors.bg,
    color: THEME.colors.textPrimary,
    minHeight: '100vh',
    fontFamily: THEME.fonts.sans,
    position: 'relative',
    overflowX: 'hidden',
  },
  heading1: {
    fontFamily: THEME.fonts.sans,
    color: THEME.colors.textPrimary,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '4px',
  },
  heading2: {
    fontFamily: THEME.fonts.sans,
    color: THEME.colors.textPrimary,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  secondaryText: {
    color: THEME.colors.textSecondary,
    fontFamily: THEME.fonts.sans,
    fontSize: '14px',
    lineHeight: '1.6',
  },
  labelUppercase: (spacing = '4px', color = THEME.colors.textMuted) => ({
    color,
    fontFamily: THEME.fonts.mono,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: spacing,
    fontWeight: 500,
  }),
  buttonSolid: {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '1px solid #ffffff',
    borderRadius: '2px',
    padding: '12px 24px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid #ffffff',
    borderRadius: '2px',
    padding: '12px 24px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export function useResponsive() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}