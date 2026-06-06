import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { THEME, typography, components, useResponsive } from '../theme';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { isMobile } = useResponsive();

  if (cart.length === 0) {
    return (
      <div style={{
        backgroundColor: THEME.colors.bg,
        minHeight: '100vh',
        paddingTop: '64px',
        paddingBottom: isMobile ? '72px' : '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '24px',
        textAlign: 'center',
        padding: '64px 24px',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#c4c7c7' }}>shopping_bag</span>
        <h2 style={{ ...typography.headlineMd, color: THEME.colors.onSurface }}>Your Shopping Bag is Empty</h2>
        <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>
          Looks like you haven't added anything yet.
        </p>
        <Link to='/shop' style={components.btnPrimary}>BROWSE COLLECTION</Link>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: THEME.colors.bg,
      minHeight: '100vh',
      paddingTop: '64px',
      paddingBottom: isMobile ? '72px' : '0',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '40px 24px' : '64px 64px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '48px' }}
        >
          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: isMobile ? '40px' : '56px',
            fontWeight: 600,
            lineHeight: 1.1,
            color: THEME.colors.onSurface,
            marginBottom: '8px',
          }}>
            Your Shopping Bag
          </h1>
          <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>
            Refined selections for the modern silhouette.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
          gap: isMobile ? '40px' : '64px',
          alignItems: 'start',
        }}>

          {/* Cart Items */}
          <div>
            {cart.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '20px',
                  paddingBottom: '32px',
                  marginBottom: '32px',
                  borderBottom: `1px solid ${THEME.colors.border}`,
                }}
              >
                {/* Image */}
                <div style={{ aspectRatio: '4/5', overflow: 'hidden', backgroundColor: '#e8e8e8' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ color: '#c4c7c7' }}>image</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ ...typography.labelSm, color: THEME.colors.secondary, marginBottom: '4px' }}>
                      {item.category.name.toUpperCase()}
                    </p>
                    <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '4px' }}>
                      {item.name}
                    </h3>
                    <p style={{ ...typography.priceTag, color: THEME.colors.secondary, fontSize: '16px' }}>
                      KSh {Number(item.price).toLocaleString()}.00
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Quantity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', border: `1px solid ${THEME.colors.border}`, padding: '8px 16px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: THEME.colors.onSurface, lineHeight: 1 }}
                      >
                        −
                      </button>
                      <span style={{ ...typography.bodyMd, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: THEME.colors.onSurface, lineHeight: 1 }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <p style={{ ...typography.priceTag, color: THEME.colors.onSurface }}>
                        KSh {Number(item.price * item.quantity).toLocaleString()}.00
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', ...typography.labelSm, color: THEME.colors.onSurfaceVariant, fontSize: '11px' }}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: THEME.colors.surfaceContainerLow,
              padding: '32px',
              position: isMobile ? 'static' : 'sticky',
              top: '80px',
            }}
          >
            <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '24px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '32px' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>Subtotal</span>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurface }}>KSh {Number(totalPrice).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>Delivery Fee</span>
                <span style={{ ...typography.bodyMd, color: '#2ecc71', fontWeight: 600 }}>FREE</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${THEME.colors.border}`, paddingTop: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontWeight: 500 }}>Total</span>
                <span style={{ ...typography.priceTag, color: THEME.colors.secondary, fontSize: '22px' }}>
                  KSh {Number(totalPrice).toLocaleString()}
                </span>
              </div>
            </div>

            <Link to='/checkout' style={{ ...components.btnPrimary, width: '100%', display: 'flex' }}>
              PROCEED TO CHECKOUT
            </Link>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#2ecc71' }}>lock</span>
              <span style={{ ...typography.labelSm, fontSize: '10px', color: THEME.colors.onSurfaceVariant }}>
                SECURE CHECKOUT POWERED BY SAFARICOM
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;