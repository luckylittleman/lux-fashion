import { Link } from 'react-router-dom';
import { THEME, styles } from '../theme';

const Footer = () => {
  const socialLinks = [
    { name: 'FACEBOOK', url: '#' },
    { name: 'INSTAGRAM', url: '#' },
    { name: 'TIKTOK', url: '#' },
    { name: 'X', url: '#' },
  ];

  return (
    <footer style={{ backgroundColor: '#080808', borderTop: `1px solid ${THEME.colors.border}`, padding: '64px 5% 32px 5%', color: THEME.colors.textSecondary, fontFamily: THEME.fonts.sans }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'space-between', marginBottom: '64px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>LUX FASHION</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.8', color: THEME.colors.textSecondary, maxWidth: '280px' }}>
            DEFINING ELITE SARTORIAL EXPRESSIONS FROM KISUMU TO THE WORLD.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', flex: '2 1 600px', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ ...styles.labelUppercase('2px', '#fff'), marginBottom: '20px' }}>Shop</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to='/shop' style={linkStyle}>ALL PRODUCTS</Link>
              <Link to='/shop?category=men' style={linkStyle}>MEN'S COLLECTION</Link>
              <Link to='/shop?category=women' style={linkStyle}>WOMEN'S COLLECTION</Link>
            </div>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ ...styles.labelUppercase('2px', '#fff'), marginBottom: '20px' }}>Account</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to='/login' style={linkStyle}>LOG IN</Link>
              <Link to='/signup' style={linkStyle}>SIGN UP</Link>
              <Link to='/cart' style={linkStyle}>MY CART</Link>
            </div>
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ ...styles.labelUppercase('2px', '#fff'), marginBottom: '20px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <p style={{ color: THEME.colors.textSecondary }}>HQ: <span style={{ color: '#fff' }}>KISUMU, KENYA</span></p>
              <p style={{ color: THEME.colors.textSecondary }}>PHONE: <span style={{ color: '#fff' }}>+254 725267768</span></p>
              <p style={{ color: THEME.colors.textSecondary }}>EMAIL: <span style={{ color: '#fff' }}>info@luxfashion.co.ke</span></p>
              <p style={{ color: THEME.colors.textSecondary }}>HOURS: <span style={{ color: '#fff' }}>09:00 - 18:00 (EAT)</span></p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', borderTop: `1px solid ${THEME.colors.border}`, paddingTop: '32px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '11px', fontFamily: THEME.fonts.mono, color: THEME.colors.textMuted }}>
          © {new Date().getFullYear()} LUX FASHION. ALL RIGHTS RESERVED.
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {socialLinks.map(social => (
            <a key={social.name} href={social.url} style={{ fontFamily: THEME.fonts.mono, fontSize: '11px', color: THEME.colors.textMuted, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '2px', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = THEME.colors.textMuted}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

const linkStyle = {
  fontFamily: 'sans-serif',
  fontSize: '13px',
  color: '#888888',
  textDecoration: 'none',
};

export default Footer;