import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useResponsive } from '../theme';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { isMobile } = useResponsive();

  const styles = {
  page: { backgroundColor: '#0a0a0a', minHeight: '100vh' },
  header: {
    padding: isMobile ? '40px 24px 24px' : '60px 80px 40px',
    borderBottom: '1px solid #1a1a1a',
  },
  headerTag: {
    fontSize: '11px', letterSpacing: '4px', color: '#555', marginBottom: '12px',
  },
   headerTitle: {
    fontSize: isMobile ? '32px' : '48px',
    fontWeight: '900', color: '#fff', letterSpacing: '-1px',
  },
  container: {
    padding: isMobile ? '24px' : '40px 80px 80px',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
    gap: isMobile ? '24px' : '48px',
    alignItems: 'start',
  },
  items: { 
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #1a1a1a' 
  },
   item: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '80px 1fr' : '100px 1fr auto',
    gap: isMobile ? '12px' : '24px',
    alignItems: 'center',
    padding: isMobile ? '16px' : '24px',
    backgroundColor: '#0a0a0a',
  },
   itemImg: {
    width: isMobile ? '80px' : '100px',
    height: isMobile ? '96px' : '120px',
    backgroundColor: '#1a1a1a',
    borderRadius: '2px',
    overflow: 'hidden',
  },
   img: { 
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  noImg: { 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '11px', 
    color: '#444', 
    letterSpacing: '1px' 
  },
  itemInfo: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '6px' 
  },
  itemCat: { 
    fontSize: '10px', 
    letterSpacing: '3px', 
    color: '#555' 
  },
  itemName: { 
    fontSize: isMobile ? '13px' : '15px', 
    fontWeight: '600', 
    color: '#fff' 
  },
  itemPrice: { 
    fontSize: '13px', 
    color: '#888' 
  },
  itemActions: {
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    alignItems: isMobile ? 'center' : 'flex-end',
    gap: '12px',
    gridColumn: isMobile ? '1 / -1' : 'auto',
  },
  quantity: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    border: '1px solid #222', 
    padding: '6px 12px' 
  },
  qtyBtn: { 
    background: 'none', 
    border: 'none', 
    color: '#fff', 
    fontSize: '16px', 
    cursor: 'pointer', 
    padding: '0 4px' 
  },
  qtyNum: { 
    fontSize: '14px', 
    color: '#fff', 
    minWidth: '20px', 
    textAlign: 'center' 
  },
  itemTotal: { 
    fontSize: '15px', 
    fontWeight: '700', 
    color: '#fff' 
  },
  removeBtn: { 
    background: 'none', 
    border: 'none', 
    color: '#444', 
    fontSize: '10px', 
    letterSpacing: '2px', 
    cursor: 'pointer', 
    padding: '0' 
  },
  summary: { 
    backgroundColor: '#111', 
    border: '1px solid #1a1a1a', 
    padding: isMobile ? '24px' : '32px' 
  },
  summaryTag: { 
    fontSize: '11px', 
    letterSpacing: '4px', 
    color: '#555', 
    marginBottom: '24px' 
  },
  summaryRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    fontSize: '13px', 
    color: '#666', 
    marginBottom: '12px' 
  },
  summaryDivider: { 
    height: '1px', 
    backgroundColor: '#1a1a1a', 
    margin: '16px 0' 
  },
  summaryTotal: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    fontSize: '16px', 
    fontWeight: '700', 
    color: '#fff', 
    marginBottom: '28px' 
  },
  checkoutBtn: { 
    display: 'block', 
    textAlign: 'center', 
    backgroundColor: '#fff', 
    color: '#000', 
    padding: '14px', 
    fontSize: '12px', 
    fontWeight: '700', 
    letterSpacing: '2px', 
    marginBottom: '12px', 
    borderRadius: '2px' 
  },
  continueBtn: { 
    display: 'block', 
    textAlign: 'center', 
    backgroundColor: 'transparent', 
    color: '#555', 
    padding: '14px', 
    fontSize: '12px', 
    letterSpacing: '1px', 
    border: '1px solid #222', 
    borderRadius: '2px' 
  },
  empty: { 
    backgroundColor: '#0a0a0a', 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    textAlign: 'center', 
    padding: '40px' 
  },
  emptyTag: { 
    fontSize: '11px', 
    letterSpacing: '4px', 
    color: '#555', 
    marginBottom: '16px' 
  },
  emptyTitle: { 
    fontSize: isMobile ? '28px' : '36px', 
    fontWeight: '900', 
    color: '#fff', 
    marginBottom: '12px' 
  },
  emptyText: { 
    fontSize: '14px', 
    color: '#555', 
    marginBottom: '32px' 
  },
  shopBtn: { 
    backgroundColor: '#fff', 
    color: '#000', 
    padding: '14px 32px', 
    fontSize: '12px', 
    fontWeight: '700', 
    letterSpacing: '2px', 
    borderRadius: '2px' 
  },
};

  if (cart.length === 0) {
    return (
      <div style={styles.empty}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p style={styles.emptyTag}>YOUR CART</p>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
          <Link to='/shop' style={styles.shopBtn}>Browse Products →</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.headerTag}>YOUR CART</p>
        <h1 style={styles.headerTitle}>Shopping Cart</h1>
      </div>

      <div style={styles.container}>
        <div style={styles.items}>
          {cart.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={styles.item}
            >
              <div style={styles.itemImg}>
                {item.image
                  ? <img src={item.image} alt={item.name} style={styles.img} />
                  : <div style={styles.noImg}>No image</div>
                }
              </div>
              <div style={styles.itemInfo}>
                <p style={styles.itemCat}>{item.category.name.toUpperCase()}</p>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>KSh {Number(item.price).toLocaleString()}</p>
              </div>
              <div style={styles.itemActions}>
                <div style={styles.quantity}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >−</button>
                  <span style={styles.qtyNum}>{item.quantity}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >+</button>
                </div>
                <p style={styles.itemTotal}>
                  KSh {Number(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  REMOVE
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.summary}
        >
          <p style={styles.summaryTag}>ORDER SUMMARY</p>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>KSh {Number(totalPrice).toLocaleString()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Delivery</span>
            <span>KSh 200</span>
          </div>
          <div style={styles.summaryDivider} />
          <div style={styles.summaryTotal}>
            <span>Total</span>
            <span>KSh {Number(totalPrice + 200).toLocaleString()}</span>
          </div>
          <Link to='/checkout' style={styles.checkoutBtn}>
            Proceed to Checkout →
          </Link>
          <Link to='/shop' style={styles.continueBtn}>
            ← Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
};



export default Cart;