import { useState, useEffect } from 'react';

export const THEME = {
  colors: {
    bg: '#f9f9f9',
    surface: '#ffffff',
    surfaceContainer: '#eeeeee',
    surfaceContainerLow: '#f3f3f4',
    surfaceContainerHigh: '#e8e8e8',
    border: '#c4c7c7',
    borderDark: '#747878',
    primary: '#000000',
    onPrimary: '#ffffff',
    secondary: '#7a581e',
    onSurface: '#1a1c1c',
    onSurfaceVariant: '#444748',
    error: '#ba1a1a',
  },
  fonts: {
    serif: "'Bodoni Moda', serif",
    sans: "'DM Sans', sans-serif",
  },
  borderRadius: '0px',
  spacing: {
    unit: '8px',
    gutter: '24px',
    containerMax: '1280px',
    marginMobile: '20px',
    marginDesktop: '64px',
  },
};

export const typography = {
  displayLg: {
    fontFamily: "'Bodoni Moda', serif",
    fontSize: '64px',
    fontWeight: 700,
    lineHeight: '72px',
    letterSpacing: '-0.02em',
  },
  headlineLg: {
    fontFamily: "'Bodoni Moda', serif",
    fontSize: '40px',
    fontWeight: 600,
    lineHeight: '48px',
  },
  headlineLgMobile: {
    fontFamily: "'Bodoni Moda', serif",
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: '38px',
  },
  headlineMd: {
    fontFamily: "'Bodoni Moda', serif",
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '32px',
  },
  bodyLg: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '28px',
  },
  bodyMd: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
  },
  labelSm: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '16px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  priceTag: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
  },
};

export const components = {
  btnPrimary: {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    padding: '14px 40px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#000000',
    border: '1px solid #000000',
    padding: '14px 40px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #c4c7c7',
    padding: '12px 0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '16px',
    color: '#1a1c1c',
    outline: 'none',
    width: '100%',
  },
};

export const styles = {
  page: {
    backgroundColor: '#f9f9f9',
    color: '#1a1c1c',
    minHeight: '100vh',
    fontFamily: "'DM Sans', sans-serif",
  },
  labelUppercase: (color = '#7a581e') => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color,
  }),
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