import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { THEME, styles, useResponsive } from '../theme';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isMobile, isTablet } = useResponsive();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [activeAccordion, setActiveAccordion] = useState('details');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    axios.get(`http://127.0.0.1:8000/api/store/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        navigate('/shop');
      });
  }, [id, navigate]);

  const handleMouseMoveZoom = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '220%',
    });
  };

  if (loading) return (
    <div style={{ backgroundColor: THEME.colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: THEME.colors.textSecondary, fontFamily: THEME.fonts.mono, letterSpacing: '2px' }}>LOADING...</p>
    </div>
  );

  if (!product) return null;

  const images = product.image ? [product.image] : [];

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
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: `1px solid ${THEME.colors.border}`, paddingBottom: '8px' }}>
              <span style={{ color: THEME.colors.textSecondary, fontFamily: THEME.fonts.mono }}>{row.label}</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Delivery & Returns',
      content: (
        <div style={{ color: THEME.colors.textSecondary, fontSize: '13px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p><strong style={{ color: '#fff' }}>Kisumu Delivery:</strong> Same-day delivery for orders placed before 3PM.</p>
          <p><strong style={{ color: '#fff' }}>Countrywide:</strong> 1-2 business days via tracked courier.</p>
          <p><strong style={{ color: '#fff' }}>Returns:</strong> Within 7 days of delivery in original condition.</p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <div style={{ color: THEME.colors.textSecondary, fontSize: '13px', lineHeight: '1.8' }}>
          <p>Please refer to the care label on your garment for specific instructions. Generally, we recommend gentle washing and air drying to preserve the quality of the fabric.</p>
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: THEME.colors.bg, color: THEME.colors.textPrimary, minHeight: '100vh' }}>

      {/* Top ribbon */}
      <div style={{ borderBottom: `1px solid ${THEME.colors.border}`, padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: THEME.fonts.mono, fontSize: '9px', color: THEME.colors.textSecondary, letterSpacing: '3px' }}>
        <span>[ LUX FASHION — KISUMU ]</span>
        <span style={{ color: THEME.colors.accentGreen }}>● DIRECT DISPATCH ACTIVE</span>
        <span>REF: #{product.id}</span>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '24px 16px' : '48px 5%' }}>

        {/* Back button and breadcrumb */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/shop')}
            style={{ background: 'none', border: 'none', color: THEME.colors.textSecondary, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: THEME.fonts.mono, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', padding: 0 }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = THEME.colors.textSecondary}
          >
            <ArrowLeft size={14} /> BACK TO SHOP
          </button>
          <span style={{ fontFamily: THEME.fonts.mono, fontSize: '11px', color: THEME.colors.textMuted, letterSpacing: '1px' }}>
            SHOP / {product.category.name.toUpperCase()} / {product.name.toUpperCase()}
          </span>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1.2fr 0.8fr', gap: isMobile ? '32px' : '64px', alignItems: 'start', borderBottom: `1px solid ${THEME.colors.border}`, paddingBottom: '64px' }}>

          {/* LEFT: Image Gallery */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>

            {/* Thumbnail rail */}
            {!isMobile && images.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '80px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    style={{ width: '80px', height: '100px', border: activeImage === idx ? '1px solid #fff' : `1px solid ${THEME.colors.border}`, backgroundColor: THEME.colors.surface, padding: '2px', cursor: 'pointer', overflow: 'hidden', borderRadius: THEME.borderRadius }}
                  >
                    <img src={img} alt={`View ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: activeImage === idx ? 1 : 0.45 }} />
                  </button>
                ))}
              </div>
            )}

            {/* Main image viewer */}
            <div
              style={{ position: 'relative', flexGrow: 1, aspectRatio: '3/4', borderRadius: THEME.borderRadius, overflow: 'hidden', border: `1px solid ${THEME.colors.border}`, backgroundColor: THEME.colors.surface, cursor: 'crosshair' }}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMoveZoom}
            >
              {images.length > 0 ? (
                <>
                  <div style={{ width: '100%', height: '100%', display: isZooming ? 'none' : 'block' }}>
                    <motion.img
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={images[activeImage]}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  {isZooming && (
                    <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images[activeImage]})`, backgroundRepeat: 'no-repeat', ...zoomStyle }} />
                  )}
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: THEME.colors.textMuted, fontFamily: THEME.fonts.mono, fontSize: '11px', letterSpacing: '2px' }}>NO IMAGE</div>
              )}

              {/* Corner marks */}
              {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                <div key={pos} style={{ position: 'absolute', ...(pos.includes('top') ? { top: '12px' } : { bottom: '12px' }), ...(pos.includes('Left') ? { left: '12px' } : { right: '12px' }), borderTop: pos.includes('top') ? '1px solid rgba(255,255,255,0.4)' : 'none', borderBottom: pos.includes('bottom') ? '1px solid rgba(255,255,255,0.4)' : 'none', borderLeft: pos.includes('Left') ? '1px solid rgba(255,255,255,0.4)' : 'none', borderRight: pos.includes('Right') ? '1px solid rgba(255,255,255,0.4)' : 'none', width: '16px', height: '16px', pointerEvents: 'none' }} />
              ))}

              {/* Zoom hint */}
              {!isMobile && (
                <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(10,10,10,0.85)', padding: '6px 12px', fontFamily: THEME.fonts.mono, fontSize: '8.5px', letterSpacing: '1px', border: `1px solid ${THEME.colors.border}`, color: 'rgba(255,255,255,0.8)', pointerEvents: 'none', zIndex: 5 }}>
                  {isZooming ? 'MAGNIFICATION MODE: 2.2X' : 'HOVER TO MAGNIFY'}
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(10,10,10,0.85)', border: `1px solid ${THEME.colors.border}`, borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: wishlisted ? THEME.colors.warning : '#fff', zIndex: 10 }}
              >
                <Heart size={18} fill={wishlisted ? THEME.colors.warning : 'none'} />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div>
              <span style={styles.labelUppercase('4px', THEME.colors.textSecondary)}>
                LUX FASHION — {product.category.name.toUpperCase()}
              </span>
              <h1 style={{ ...styles.heading1, fontSize: isMobile ? '28px' : '36px', lineHeight: '1.1', marginTop: '8px', marginBottom: '8px' }}>
                {product.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', color: '#cfac62' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill='#cfac62' />)}
                </div>
                <span style={{ fontFamily: THEME.fonts.mono, fontSize: '11px', color: THEME.colors.textSecondary }}>5.0 VERIFIED REVIEWS</span>
              </div>
            </div>

            {/* Price */}
            <div style={{ backgroundColor: '#0d0d0d', border: `1px solid ${THEME.colors.border}`, padding: '16px 20px' }}>
              <span style={{ fontSize: '10px', color: THEME.colors.textSecondary, fontFamily: THEME.fonts.mono, display: 'block', marginBottom: '4px' }}>PRICE</span>
              <span style={{ fontFamily: THEME.fonts.mono, fontSize: '28px', fontWeight: 900, color: '#fff' }}>
                KSh {Number(product.price).toLocaleString()}
              </span>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${THEME.colors.border}` }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '50px', backgroundColor: product.stock > 0 ? 'rgba(0,230,118,0.1)' : 'rgba(255,61,0,0.1)', color: product.stock > 0 ? THEME.colors.accentGreen : THEME.colors.warning, fontSize: '10px', fontFamily: THEME.fonts.mono, fontWeight: 700, letterSpacing: '1px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: product.stock > 0 ? THEME.colors.accentGreen : THEME.colors.warning }} />
                  {product.stock <= 0 ? 'OUT OF STOCK' : product.stock <= 5 ? `ONLY ${product.stock} LEFT` : 'IN STOCK'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ ...styles.secondaryText, fontSize: '14px', lineHeight: '1.8', color: '#d0d0d0', margin: 0 }}>
              {product.description || 'Premium quality clothing crafted for the modern wardrobe.'}
            </p>

            {/* Size selector */}
            <div style={{ borderTop: `1px solid ${THEME.colors.border}`, paddingTop: '20px' }}>
              <span style={{ ...styles.labelUppercase('2px', THEME.colors.textSecondary), display: 'block', marginBottom: '12px' }}>
                SELECT SIZE {selectedSize && `— ${selectedSize}`}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{ backgroundColor: selectedSize === size ? '#fff' : 'transparent', color: selectedSize === size ? '#000' : '#fff', border: selectedSize === size ? '1px solid #fff' : `1px solid ${THEME.colors.borderMedium}`, borderRadius: THEME.borderRadius, width: '52px', height: '44px', fontFamily: THEME.fonts.mono, fontWeight: selectedSize === size ? 800 : 500, fontSize: '12px', cursor: 'pointer', transition: 'all 0.15s ease' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              style={{ ...styles.buttonSolid, padding: '18px 24px', gap: '12px', fontSize: '13px', backgroundColor: product.stock <= 0 ? THEME.colors.borderMedium : '#fff', borderColor: product.stock <= 0 ? THEME.colors.borderMedium : '#fff', color: product.stock <= 0 ? THEME.colors.textSecondary : '#000', cursor: product.stock <= 0 ? 'not-allowed' : 'pointer', width: '100%' }}
              onMouseEnter={(e) => { if (product.stock > 0) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; } }}
              onMouseLeave={(e) => { if (product.stock > 0) { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; } }}
            >
              <ShoppingCart size={16} />
              {product.stock <= 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
            </button>

            {/* Accordions */}
            <div style={{ marginTop: '12px' }}>
              {accordionItems.map(item => {
                const isOpen = activeAccordion === item.id;
                return (
                  <div key={item.id} style={{ borderTop: `1px solid ${THEME.colors.border}`, padding: '16px 0' }}>
                    <button
                      onClick={() => setActiveAccordion(isOpen ? null : item.id)}
                      style={{ background: 'none', border: 'none', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 0, cursor: 'pointer', fontFamily: THEME.fonts.sans, fontWeight: 600, fontSize: '14px' }}
                    >
                      <span>{item.title}</span>
                      <span style={{ color: THEME.colors.textSecondary, fontFamily: THEME.fonts.mono, fontSize: '11px' }}>{isOpen ? '[-]' : '[+]'}</span>
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