import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { THEME, typography } from '../theme';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(249,249,249,0.95)' : 'rgba(249,249,249,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #c4c7c7' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          height: '64px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          {/* Left - Menu icon (mobile) */}
          {window.innerWidth >= 768 && (
           <button style={styles.iconBtn} onClick={() => setMenuOpen(!menuOpen)}>
              <span className="material-symbols-outlined">
                 {menuOpen ? 'close' : 'menu'}
               </span>
            </button>
          )}

          {/* Center - Logo */}
          <Link to='/' style={{
            ...typography.headlineMd,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: THEME.colors.primary,
            textTransform: 'uppercase',
          }}>
            LUX FASHION
          </Link>

          {/* Right - Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={styles.iconBtn}>
              <span className="material-symbols-outlined">search</span>
            </button>

            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                style={styles.iconBtn}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="material-symbols-outlined">person</span>
              </button>

              {dropdownOpen && (
                <div style={styles.dropdown}>
                  {user ? (
                    <>
                      <div style={styles.dropdownHeader}>
                        <p style={styles.dropdownName}>{user.full_name}</p>
                        <p style={styles.dropdownContact}>{user.email || user.phone}</p>
                      </div>
                      <div style={styles.dropdownDivider} />
                      <Link
                        to='/profile'
                        style={styles.dropdownItem}
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button style={styles.dropdownItemRed} onClick={handleLogout}>
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to='/login'
                        style={styles.dropdownItem}
                        onClick={() => setDropdownOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        to='/signup'
                        style={styles.dropdownItem}
                        onClick={() => setDropdownOpen(false)}
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to='/cart' style={{ ...styles.iconBtn, position: 'relative' }}>
              <span className="material-symbols-outlined">shopping_bag</span>
              {totalItems > 0 && (
                <span style={styles.badge}>{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Bottom Navigation - Mobile only */}
      <BottomNav location={location} />

      {/* Sidebar overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 90,
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '280px',
        backgroundColor: '#fff',
        zIndex: 100,
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        boxShadow: menuOpen ? '4px 0 20px rgba(0,0,0,0.1)' : 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '18px', fontWeight: 700, letterSpacing: '0.2em', color: THEME.colors.primary }}>
            LUX FASHION
          </span>
          <button style={styles.iconBtn} onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {[
            { label: 'Home', path: '/', icon: 'home' },
            { label: 'Shop', path: '/shop', icon: 'storefront' },
            { label: 'Men', path: '/shop?category=men', icon: 'man' },
            { label: 'Women', path: '/shop?category=women', icon: 'woman' },
            { label: 'Cart', path: '/cart', icon: 'shopping_bag' },
            { label: 'Profile', path: '/profile', icon: 'person' },
          ].map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 12px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                fontWeight: 500,
                color: THEME.colors.onSurface,
                borderBottom: `1px solid ${THEME.colors.border}`,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: THEME.colors.secondary }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${THEME.colors.border}`, paddingTop: '24px' }}>
          <p style={{ ...typography.labelSm, color: THEME.colors.onSurfaceVariant, fontSize: '10px', marginBottom: '8px' }}>
            EST. 2024 — Kisumu, KENYA
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: THEME.colors.onSurfaceVariant }}>
            info@luxfashion.co.ke
          </p>
        </div>
      </div>

    </>
  );
};


const BottomNav = ({ location }) => {
  const { totalItems } = useCart();
  const path = location.pathname;

  const tabs = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Shop', icon: 'storefront', path: '/shop' },
    { label: 'Cart', icon: 'shopping_bag', path: '/cart', badge: totalItems },
    { label: 'Profile', icon: 'person', path: '/profile' },
  ];

  return (
    <nav style={{
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 50,
  backgroundColor: 'rgba(249,249,249,0.92)',
  backdropFilter: 'blur(20px)',
  borderTop: '1px solid #c4c7c7',
  display: window.innerWidth < 768 ? 'flex' : 'none',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '72px',
  paddingBottom: '8px',
}}>
      {tabs.map(tab => {
        const isActive = path === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              color: isActive ? THEME.colors.primary : '#747878',
              position: 'relative',
              minWidth: '48px',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                fontSize: '24px',
              }}
            >
              {tab.icon}
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {tab.label}
            </span>
            {tab.badge > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: THEME.colors.secondary,
                color: '#fff',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>
                {tab.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

const styles = {
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: THEME.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: THEME.colors.secondary,
    color: '#fff',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '40px',
    backgroundColor: '#fff',
    border: '1px solid #c4c7c7',
    minWidth: '200px',
    zIndex: 200,
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  dropdownHeader: {
    padding: '14px 16px',
    backgroundColor: '#f3f3f4',
  },
  dropdownName: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#1a1c1c',
    marginBottom: '2px',
  },
  dropdownContact: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '12px',
    color: '#747878',
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: '#c4c7c7',
  },
  dropdownItem: {
    display: 'block',
    padding: '12px 16px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    color: '#1a1c1c',
    cursor: 'pointer',
    borderBottom: '1px solid #f3f3f4',
  },
  dropdownItemRed: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '12px 16px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    color: '#ba1a1a',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Navbar;