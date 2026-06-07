import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { THEME, typography, components, styles, useResponsive } from '../theme';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/store/products/')
      .then(res => {
        setProducts(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ ...styles.page, paddingTop: '64px', paddingBottom: isMobile ? '72px' : '0' }}>

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: isMobile ? '600px' : '795px', overflow: 'hidden', backgroundColor: '#000' }}>
        <img
          src='https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80'
          alt='The Nairobi Collection'
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: isMobile ? '32px 24px' : '64px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ ...typography.labelSm, color: 'rgba(255,255,255,0.9)', marginBottom: '16px', letterSpacing: '0.3em' }}
          >
            SS26 COLLECTION
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: isMobile ? '48px' : '84px',
              fontWeight: 700,
              lineHeight: 1,
              color: '#fff',
              marginBottom: '32px',
              maxWidth: '600px',
            }}
          >
            The Ultimate Collection
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link to='/shop' style={{ ...components.btnPrimary, backgroundColor: '#fff', color: '#000' }}>
              EXPLORE NOW
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: isMobile ? '48px 0' : '64px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '32px' }}>
          <h3 style={{ ...typography.headlineMd, color: THEME.colors.onSurface }}>CATEGORIES</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 45vw)' : 'repeat(2, 1fr)', gap: '16px', padding: '0 24px', maxWidth: '1280px', margin: '0 auto' }}>
          {[
            {
              name: 'MEN',
              slug: 'men',
              image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
            },
            {
              name: 'WOMEN',
              slug: 'women',
              image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
            },
          ].map(cat => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ aspectRatio: '4/5', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <span style={{ ...typography.labelSm, color: THEME.colors.onSurface, display: 'block', textAlign: 'center' }}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ padding: isMobile ? '48px 24px' : '64px', backgroundColor: '#f3f3f4' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <p style={{ ...typography.labelSm, color: THEME.colors.secondary, marginBottom: '8px' }}>JUST LANDED</p>
              <h3 style={{ ...typography.headlineLgMobile, color: THEME.colors.onSurface }}>New Arrivals</h3>
            </div>
            <Link
              to='/shop'
              style={{ ...typography.labelSm, color: THEME.colors.onSurface, borderBottom: '1px solid #1a1c1c', paddingBottom: '4px' }}
            >
              VIEW ALL
            </Link>
          </div>
          {loading ? (
            <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>Loading products...</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '16px 12px' : '16px 24px',
            }}>
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Curated Section */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
            gap: '32px',
            alignItems: 'center',
          }}>
            <div style={{ order: isMobile ? 2 : 1 }}>
              <p style={{ ...typography.labelSm, color: THEME.colors.secondary, marginBottom: '16px' }}>THE EDIT</p>
              <h2 style={{ ...typography.headlineLgMobile, color: THEME.colors.onSurface, marginBottom: '24px' }}>
                Curated for Your Distinct Taste
              </h2>
              <p style={{ ...typography.bodyLg, color: THEME.colors.onSurfaceVariant, marginBottom: '32px', lineHeight: '1.8' }}>
                A hand-picked selection that bridges the gap between Kenya's street elegance and international runway precision.
              </p>
              <Link to='/shop' style={components.btnOutline}>
                VIEW CURATED SELECTION
              </Link>
            </div>
            <div style={{ order: isMobile ? 1 : 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ paddingTop: '48px' }}>
                <img
                  src='https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80'
                  alt='Curated'
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                />
              </div>
              <div style={{ paddingBottom: '48px' }}>
                <img
                  src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'
                  alt='Curated'
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = require('../context/CartContext').useCart();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '4/5', overflow: 'hidden', marginBottom: '24px', position: 'relative' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.7s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)', opacity: hovered ? 0.8 : 1 }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#c4c7c7' }}>image</span>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          style={{
            position: 'absolute', bottom: '16px', right: '16px',
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
      </div>
      <h4 style={{ ...typography.bodyMd, fontWeight: 500, marginBottom: '4px', color: THEME.colors.onSurface }}>{product.name}</h4>
      <p style={{ ...typography.priceTag, color: THEME.colors.secondary }}>KSh {Number(product.price).toLocaleString()}</p>
    </div>
  );
};

export default Home;