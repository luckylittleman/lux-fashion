import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { THEME, typography, components, useResponsive } from '../theme';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const { addToCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) setActiveCategory(category);
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === 'all'
      ? 'http://127.0.0.1:8000/api/store/products/'
      : `http://127.0.0.1:8000/api/store/products/?category=${activeCategory}`;
    axios.get(url)
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const filters = ['all', 'men', 'women'];

  return (
    <div style={{ backgroundColor: THEME.colors.bg, minHeight: '100vh', paddingTop: '64px', paddingBottom: isMobile ? '72px' : '0' }}>

      {/* Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '48px 24px 32px' : '64px 64px 48px' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...typography.labelSm, color: THEME.colors.secondary, marginBottom: '8px' }}
        >
          KENYA COLLECTIONS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: isMobile ? '36px' : '56px',
            fontWeight: 600,
            lineHeight: 1.1,
            color: THEME.colors.onSurface,
            maxWidth: '480px',
          }}
        >
          Elevated Essentials for the Modern Afropolitan.
        </motion.h1>
      </div>

      {/* Filters */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 24px 24px' : '0 64px 32px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveCategory(f)}
              style={{
                padding: '8px 20px',
                border: '1px solid',
                borderColor: activeCategory === f ? '#000' : '#c4c7c7',
                backgroundColor: activeCategory === f ? '#000' : 'transparent',
                color: activeCategory === f ? '#fff' : THEME.colors.onSurfaceVariant,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'ALL' : f.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ ...typography.labelSm, color: THEME.colors.onSurfaceVariant }}>
            SORT BY
          </p>
          <p style={{ ...typography.labelSm, color: THEME.colors.onSurfaceVariant }}>
            {loading ? '...' : `${products.length} PIECES`}
          </p>
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 24px 48px' : '0 64px 80px' }}>
        {loading ? (
          <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, padding: '48px 0' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, padding: '48px 0' }}>No products found.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '40px 12px' : '48px 24px',
          }}>
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <ProductCard
                  product={product}
                  onNavigate={() => navigate(`/product/${product.id}`)}
                  onAddToCart={() => addToCart(product)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Discover More */}
        {!loading && products.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <button style={{ ...components.btnOutline, gap: '8px' }}>
              DISCOVER MORE ↓
            </button>
            <p style={{ ...typography.labelSm, color: '#2ecc71', marginTop: '24px' }}>
              ● LIPA NA M-PESA SECURE CHECKOUT
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product, onNavigate, onAddToCart }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{ aspectRatio: '4/5', overflow: 'hidden', marginBottom: '16px', position: 'relative', backgroundColor: '#e8e8e8' }}
        onClick={onNavigate}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.7s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)', opacity: hovered ? 0.8 : 1 }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#c4c7c7' }}>image</span>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
          style={{
            position: 'absolute', bottom: '12px', right: '12px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            border: 'none', borderRadius: '50%',
            width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#000' }}>add_shopping_cart</span>
        </button>

        {/* Tag */}
        {product.stock <= 5 && product.stock > 0 && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#fff', padding: '4px 10px' }}>
            <span style={{ ...typography.labelSm, fontSize: '10px', color: THEME.colors.secondary }}>LIMITED</span>
          </div>
        )}
      </div>

      <div onClick={onNavigate}>
        <p style={{ ...typography.labelSm, color: THEME.colors.secondary, fontSize: '10px', marginBottom: '4px' }}>
          {product.category.name.toUpperCase()}
        </p>
        <h4 style={{ ...typography.bodyMd, fontWeight: 500, marginBottom: '4px', color: THEME.colors.onSurface }}>
          {product.name}
        </h4>
        <p style={{ ...typography.priceTag, color: THEME.colors.secondary }}>
          KSh {Number(product.price).toLocaleString()}.00
        </p>
      </div>
    </div>
  );
};

export default Shop;