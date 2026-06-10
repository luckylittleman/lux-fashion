import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { THEME, typography, components, styles, useResponsive } from '../theme';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isMobile, isTablet } = useResponsive();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [activeAccordion, setActiveAccordion] = useState('details');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    axios.get(`http://127.0.0.1:8000/api/store/products/${id}/`)
      .then(res => { setProduct(res.data); setLoading(false); })
      .catch(() => navigate('/shop'));
  }, [id, navigate]);

  const handleMouseMoveZoom = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ backgroundPosition: `${x}% ${y}%`, backgroundSize: '220%' });
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div style={{ backgroundColor: THEME.colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, letterSpacing: '2px' }}>Loading...</p>
    </div>
  );

  if (!product) return null;

  const accordionItems = [
    {
      id: 'details',
      title: 'Product Details',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Category', value: product.category.name },
            { label: 'Stock', value: `${product.stock} available` },
            { label: 'Status', value: product.is_available ? 'In Stock' : 'Out of Stock' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: `1px solid ${THEME.colors.border}`, paddingBottom: '8px' }}>
              <span style={{ color: THEME.colors.onSurfaceVariant, fontFamily: "'DM Sans', sans-serif" }}>{row.label}</span>
              <span style={{ color: THEME.colors.onSurface, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{row.value}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Delivery & Returns',
      content: (
        <div style={{ color: THEME.colors.onSurfaceVariant, fontSize: '14px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: "'DM Sans', sans-serif" }}>
          <p><strong style={{ color: THEME.colors.onSurface }}>Nairobi Delivery:</strong> Same-day delivery for orders placed before 3PM.</p>
          <p><strong style={{ color: THEME.colors.onSurface }}>Countrywide:</strong> 1-2 business days via tracked courier.</p>
          <p><strong style={{ color: THEME.colors.onSurface }}>Returns:</strong> Within 7 days of delivery in original condition.</p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <p style={{ color: THEME.colors.onSurfaceVariant, fontSize: '14px', lineHeight: '1.8', fontFamily: "'DM Sans', sans-serif" }}>
          Please refer to the care label on your garment for specific instructions. Generally, we recommend gentle washing and air drying to preserve the quality of the fabric.
        </p>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: THEME.colors.bg, color: THEME.colors.onSurface, minHeight: '100vh', paddingTop: '64px', paddingBottom: isMobile ? '72px' : '0' }}>

      {/* Top ribbon */}
      <div style={{ borderBottom: `1px solid ${THEME.colors.border}`, padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: THEME.colors.onSurfaceVariant, letterSpacing: '2px' }}>
        <span>[ LUX FASHION — NAIROBI ]</span>
        <span style={{ color: '#2ecc71' }}>● DIRECT DISPATCH ACTIVE</span>
        <span>REF: #{product.id}</span>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '24px 16px' : '48px 5%' }}>

        {/* Back button and breadcrumb */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/shop')}
            style={{ background: 'none', border: 'none', color: THEME.colors.onSurfaceVariant, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = THEME.colors.onSurface}
            onMouseLeave={e => e.currentTarget.style.color = THEME.colors.onSurfaceVariant}
          >
            <ArrowLeft size={14} /> BACK TO SHOP
          </button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: THEME.colors.onSurfaceVariant, letterSpacing: '1px' }}>
            SHOP / {product.category.name.toUpperCase()} / {product.name.toUpperCase()}
          </span>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1.2fr 0.8fr', gap: isMobile ? '32px' : '64px', alignItems: 'start', borderBottom: `1px solid ${THEME.colors.border}`, paddingBottom: '64px' }}>

          {/* LEFT: Image */}
          <div
            style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '2px', overflow: 'hidden', border: `1px solid ${THEME.colors.border}`, backgroundColor: THEME.colors.surfaceContainerLow, cursor: 'crosshair' }}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMoveZoom}
          >
            {product.image ? (
              <>
                <div style={{ width: '100%', height: '100%', display: isZooming ? 'none' : 'block' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {isZooming && (
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url(${product.image})`, backgroundRepeat: 'no-repeat', ...zoomStyle }} />
                )}
              </>
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: THEME.colors.onSurfaceVariant, fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '2px' }}>
                NO IMAGE
              </div>
            )}

            {/* Zoom hint */}
            {!isMobile && (
              <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(249,249,249,0.9)', padding: '6px 12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '1px', border: `1px solid ${THEME.colors.border}`, color: THEME.colors.onSurfaceVariant, pointerEvents: 'none', zIndex: 5 }}>
                {isZooming ? 'MAGNIFICATION MODE' : 'HOVER TO MAGNIFY'}
              </div>
            )}

            {/* Wishlist button */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(249,249,249,0.9)', border: `1px solid ${THEME.colors.border}`, borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: wishlisted ? '#ba1a1a' : THEME.colors.onSurface, zIndex: 10 }}
            >
              <Heart size={18} fill={wishlisted ? '#ba1a1a' : 'none'} />
            </button>
          </div>

          {/* RIGHT: Product Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Category & Name */}
            <div>
              <span style={{ ...typography.labelSm, color: THEME.colors.secondary, fontSize: '11px' }}>
                LUX FASHION — {product.category.name.toUpperCase()}
              </span>
              <h1 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: isMobile ? '28px' : '36px', fontWeight: 600, lineHeight: 1.1, marginTop: '8px', marginBottom: '8px', color: THEME.colors.onSurface }}>
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div style={{ backgroundColor: THEME.colors.surfaceContainerLow, border: `1px solid ${THEME.colors.border}`, padding: '16px 20px' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: THEME.colors.onSurfaceVariant, display: 'block', marginBottom: '4px', letterSpacing: '2px' }}>PRICE</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '28px', fontWeight: 700, color: THEME.colors.secondary }}>
                KSh {Number(product.price).toLocaleString()}
              </span>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${THEME.colors.border}` }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '50px', backgroundColor: product.stock > 0 ? 'rgba(46,204,113,0.1)' : 'rgba(186,26,26,0.1)', color: product.stock > 0 ? '#2ecc71' : '#ba1a1a', fontSize: '11px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: '1px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: product.stock > 0 ? '#2ecc71' : '#ba1a1a' }} />
                  {product.stock <= 0 ? 'OUT OF STOCK' : product.stock <= 5 ? `ONLY ${product.stock} LEFT` : 'IN STOCK'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', lineHeight: '1.8', color: THEME.colors.onSurfaceVariant, margin: 0 }}>
              {product.description || 'Premium quality clothing crafted for the modern wardrobe.'}
            </p>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              style={{
                ...components.btnPrimary,
                padding: '18px 24px',
                gap: '12px',
                fontSize: '13px',
                backgroundColor: added ? '#2ecc71' : product.stock <= 0 ? THEME.colors.border : '#000',
                borderColor: added ? '#2ecc71' : product.stock <= 0 ? THEME.colors.border : '#000',
                color: product.stock <= 0 ? THEME.colors.onSurfaceVariant : '#fff',
                cursor: product.stock <= 0 ? 'not-allowed' : 'pointer',
                width: '100%',
                transition: 'all 0.3s ease',
              }}
            >
              <ShoppingCart size={16} />
              {added ? 'ADDED TO BAG ✓' : product.stock <= 0 ? 'OUT OF STOCK' : 'ADD TO SHOPPING BAG'}
            </button>

            {/* Delivery info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0', borderTop: `1px solid ${THEME.colors.border}` }}>
              {[
                { icon: 'local_shipping', title: 'Home Delivery', sub: 'KSh 200 within Nairobi. Delivered in 24–48 hours.' },
                { icon: 'storefront', title: 'Store Pickup', sub: 'Free pickup from our flagship store.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: THEME.colors.secondary, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: THEME.colors.onSurface, marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: THEME.colors.onSurfaceVariant }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div>
              {accordionItems.map(item => {
                const isOpen = activeAccordion === item.id;
                return (
                  <div key={item.id} style={{ borderTop: `1px solid ${THEME.colors.border}`, padding: '16px 0' }}>
                    <button
                      onClick={() => setActiveAccordion(isOpen ? null : item.id)}
                      style={{ background: 'none', border: 'none', color: THEME.colors.onSurface, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 0, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '14px' }}
                    >
                      <span>{item.title}</span>
                      <span style={{ color: THEME.colors.onSurfaceVariant, fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && <div style={{ marginTop: '12px' }}>{item.content}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;