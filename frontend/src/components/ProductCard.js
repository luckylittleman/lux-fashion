import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      style={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div style={styles.imgContainer}>
        {product.image
          ? <img src={product.image} alt={product.name} style={styles.img} />
          : <div style={styles.noImg}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
        }
        <motion.div
          style={styles.overlay}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            style={styles.overlayBtn}
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
        </motion.div>

        <div style={styles.categoryTag}>{product.category.name.toUpperCase()}</div>
      </div>

      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <div style={styles.footer}>
          <span style={styles.price}>KSh {Number(product.price).toLocaleString()}</span>
          {product.stock <= 5 && product.stock > 0 && (
            <span style={styles.lowStock}>Only {product.stock} left</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  card: {
    backgroundColor: '#111',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid #1a1a1a',
    cursor: 'pointer',
  },
  imgContainer: {
    height: '280px',
    backgroundColor: '#1a1a1a',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  noImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayBtn: {
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    padding: '12px 24px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
  },
  categoryTag: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '10px',
    letterSpacing: '2px',
    padding: '4px 10px',
    borderRadius: '2px',
  },
  info: {
    padding: '16px',
  },
  name: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '8px',
    letterSpacing: '0.5px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#fff',
  },
  lowStock: {
    fontSize: '11px',
    color: '#e74c3c',
    letterSpacing: '0.5px',
  },
};

export default ProductCard;