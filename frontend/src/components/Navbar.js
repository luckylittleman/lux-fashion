import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const dropdownRef = useRef(null);

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
    <nav style={styles.nav}>
      <Link to='/' style={styles.logo}>LUX FASHION</Link>

      <ul
        style={styles.navLinks}
        onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
      >
        <NavTab to='/' setPosition={setPosition}>Home</NavTab>
        <NavTab to='/shop' setPosition={setPosition}>Shop</NavTab>
        <NavTab to='/shop?category=men' setPosition={setPosition}>Men</NavTab>
        <NavTab to='/shop?category=women' setPosition={setPosition}>Women</NavTab>
        <motion.li animate={position} style={styles.cursor} />
      </ul>

      <div style={styles.rightSection}>
        <div style={styles.accountWrapper} ref={dropdownRef}>
          <button
            style={styles.iconBtn}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
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
                    My profile
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

        <Link to='/cart' style={styles.cartBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
};

const NavTab = ({ children, to, setPosition }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      style={styles.navTab}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
    >
      <Link to={to} style={styles.navTabLink}>{children}</Link>
    </li>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 80px',
    backgroundColor: '#0a0a0a',
    borderBottom: '1px solid #1a1a1a',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#fff',
    letterSpacing: '4px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    listStyle: 'none',
    position: 'relative',
    border: '1px solid #333',
    borderRadius: '999px',
    padding: '4px',
    gap: '0',
  },
  navTab: {
    position: 'relative',
    zIndex: 10,
    cursor: 'pointer',
    padding: '8px 20px',
    borderRadius: '999px',
  },
  navTabLink: {
    fontSize: '13px',
    color: '#fff',
    fontWeight: '500',
    letterSpacing: '1px',
  },
  cursor: {
    position: 'absolute',
    zIndex: 0,
    height: '38px',
    borderRadius: '999px',
    backgroundColor: '#1a1f19',
    top: '4px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  accountWrapper: {
    position: 'relative',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '40px',
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    minWidth: '200px',
    zIndex: 200,
    overflow: 'hidden',
  },
  dropdownHeader: {
    padding: '14px 16px',
    backgroundColor: '#1a1a1a',
  },
  dropdownName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '2px',
  },
  dropdownContact: {
    fontSize: '12px',
    color: '#666',
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: '#222',
  },
  dropdownItem: {
    display: 'block',
    padding: '12px 16px',
    fontSize: '13px',
    color: '#ccc',
    cursor: 'pointer',
    borderBottom: '1px solid #1a1a1a',
    letterSpacing: '0.5px',
  },
  dropdownItemRed: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '13px',
    color: '#e74c3c',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  cartBtn: {
    position: 'relative',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
  },
  badge: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },
};

export default Navbar;