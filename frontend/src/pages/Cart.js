import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div style={styles.empty}>
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
        <Link to='/shop' style={styles.shopBtn}>Browse products</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your cart</h2>
      <div style={styles.layout}>
        <div style={styles.items}>
          {cart.map(item => (
            <div key={item.id} style={styles.item}>
              <div style={styles.itemInfo}>
                <p style={styles.itemName}>{item.name}</p>
                <p style={styles.itemCategory}>{item.category.name}</p>
                <p style={styles.itemPrice}>KSh {Number(item.price).toLocaleString()}</p>
              </div>
              <div style={styles.itemActions}>
                <div style={styles.quantity}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >-</button>
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
                >Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>Order summary</h3>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>KSh {Number(totalPrice).toLocaleString()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Delivery</span>
            <span>KSh 200</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Total</span>
            <span>KSh {Number(totalPrice + 200).toLocaleString()}</span>
          </div>
          <Link to='/checkout' style={styles.checkoutBtn}>
            Proceed to checkout →
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px' },
  title: { fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '28px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' },
  items: { display: 'flex', flexDirection: 'column', gap: '16px' },
  item: {
    backgroundColor: '#fff', border: '1px solid #eee',
    borderRadius: '10px', padding: '16px 20px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  itemInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
  itemName: { fontSize: '15px', fontWeight: '600', color: '#333' },
  itemCategory: { fontSize: '12px', color: '#999', textTransform: 'uppercase' },
  itemPrice: { fontSize: '14px', color: '#555' },
  itemActions: { display: 'flex', alignItems: 'center', gap: '16px' },
  quantity: { display: 'flex', alignItems: 'center', gap: '10px' },
  qtyBtn: {
    width: '28px', height: '28px', borderRadius: '50%',
    border: '1px solid #ddd', backgroundColor: '#fff',
    cursor: 'pointer', fontSize: '16px',
  },
  qtyNum: { fontSize: '15px', fontWeight: '500', minWidth: '20px', textAlign: 'center' },
  itemTotal: { fontSize: '15px', fontWeight: 'bold', color: '#333', minWidth: '80px', textAlign: 'right' },
  removeBtn: {
    backgroundColor: 'transparent', border: 'none',
    color: '#e74c3c', fontSize: '13px', cursor: 'pointer',
  },
  summary: {
    backgroundColor: '#fff', border: '1px solid #eee',
    borderRadius: '10px', padding: '24px',
    height: 'fit-content',
  },
  summaryTitle: { fontSize: '17px', fontWeight: 'bold', color: '#333', marginBottom: '20px' },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '14px', color: '#555', marginBottom: '12px',
  },
  summaryTotal: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '16px', fontWeight: 'bold', color: '#333',
    borderTop: '1px solid #eee', paddingTop: '12px', marginTop: '8px', marginBottom: '20px',
  },
  checkoutBtn: {
    display: 'block', textAlign: 'center',
    backgroundColor: '#333', color: '#fff',
    padding: '12px', borderRadius: '6px',
    fontSize: '14px', fontWeight: '500',
  },
  empty: { padding: '80px 40px', textAlign: 'center' },
  emptyTitle: { fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '8px' },
  emptyText: { fontSize: '14px', color: '#999', marginBottom: '24px' },
  shopBtn: {
    backgroundColor: '#333', color: '#fff',
    padding: '10px 24px', borderRadius: '6px', fontSize: '14px',
  },
};

export default Cart;