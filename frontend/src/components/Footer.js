import { Link } from 'react-router-dom';
import { THEME, typography } from '../theme';
import { useResponsive } from '../theme';

const Footer = () => {
  const { isMobile } = useResponsive();

  return (
    <footer style={{
      backgroundColor: THEME.colors.onSurface,
      color: '#fff',
      padding: isMobile ? '64px 24px 96px' : '80px 64px 64px',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Quote */}
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '0 0 48px' : '0 0 64px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: isMobile ? '48px' : '64px',
        }}>
          <p style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: isMobile ? '18px' : '22px',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            maxWidth: '560px',
            margin: '0 auto 20px',
          }}>
            "Style is a silent language. At Lux Fashion, we speak Kenya's most elegant dialect."
          </p>
          <p style={{ ...typography.labelSm, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.4em' }}>
            EST. 2024 — KISUMU
          </p>
        </div>

        {/* Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? '40px' : '48px',
          marginBottom: isMobile ? '48px' : '64px',
        }}>
          {/* Brand */}
          <div>
            <h3 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#fff',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}>
              LUX FASHION
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: '240px' }}>
              Premium Afro-chic clothing for the modern wardrobe. Rooted in Kisumu, worn worldwide.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ ...typography.labelSm, color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>SHOP</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'All Products', to: '/shop' },
                { label: "Men's Collection", to: '/shop?category=men' },
                { label: "Women's Collection", to: '/shop?category=women' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 style={{ ...typography.labelSm, color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>ACCOUNT</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Log In', to: '/login' },
                { label: 'Sign Up', to: '/signup' },
                { label: 'My Cart', to: '/cart' },
                { label: 'My Profile', to: '/profile' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ ...typography.labelSm, color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>CONTACT</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Kisumu, Kenya',
                '+254 700 000 000',
                'info@luxfashion.co.ke',
                '09:00 – 18:00 EAT',
              ].map((item, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '32px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: '16px',
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} LUX FASHION. ALL RIGHTS RESERVED.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['FACEBOOK', 'INSTAGRAM', 'TIKTOK', 'X'].map(social => (
              <a
                key={social}
                href='#'
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;