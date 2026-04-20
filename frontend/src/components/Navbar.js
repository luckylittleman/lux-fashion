import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to='/' style={styles.logo}>Lux Fashion</Link>
      <div style={styles.links}>
        <Link to='/' style={styles.link}>Home</Link>
        <Link to='/shop' style={styles.link}>Shop</Link>
        {user ? (
          <>
            <Link to='/profile' style={styles.link}>{user.full_name?.split(' ')[0]}</Link>
            <button style={styles.logoutBtn} onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to='/login' style={styles.link}>Log in</Link>
            <Link to='/signup' style={styles.signupBtn}>Sign up</Link>
          </>
        )}
        <Link to='/cart' style={styles.cartBtn}>
          Cart {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 40px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
  },
  links: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  link: {
    fontSize: '15px',
    color: '#555',
  },
  signupBtn: {
    fontSize: '15px',
    color: '#fff',
    backgroundColor: '#333',
    padding: '8px 16px',
    borderRadius: '6px',
  },
  logoutBtn: {
    fontSize: '15px',
    color: '#e74c3c',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
  },
  cartBtn: {
    fontSize: '15px',
    color: '#fff',
    backgroundColor: '#333',
    padding: '8px 16px',
    borderRadius: '6px',
    position: 'relative',
  },
  badge: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '11px',
    marginLeft: '6px',
  },
};

export default Navbar;