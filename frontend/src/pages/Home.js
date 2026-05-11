import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/store/products/')
      .then(res => {
        setFeatured(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.heroTag}
          >
            NEW COLLECTION 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={styles.heroTitle}
          >
            DEFINE YOUR <br />STYLE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={styles.heroSubtitle}
          >
            Discover premium clothing for men and women, 
            Quality pieces crafted for the modern wardrobe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={styles.heroBtns}
          >
            <Link to='/shop' style={styles.btnPrimary}>Shop Now →</Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={styles.heroRight}
        >
          <img
            src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
            alt='Fashion'
            style={styles.heroImg}
          />
          <div style={styles.heroImgBadge}>
            <p style={styles.badgeNum}>50%</p>
            <p style={styles.badgeText}>OFF SALE</p>
          </div>
        </motion.div>

        <div style={styles.verticalText}></div>
      </div>

      {/* Categories Section */}
      <div style={styles.section}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={styles.sectionTag}
        >
          SHOP BY CATEGORY
        </motion.p>
        <div style={styles.catGrid}>
          <Link to='/shop?category=men' style={styles.catCard}>
            <img
              src='https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80'
              alt='Men'
              style={styles.catImg}
            />
            <div style={styles.catOverlay}>
              <h3 style={styles.catTitle}>MEN</h3>
              <p style={styles.catLink}>Shop Now →</p>
            </div>
          </Link>
          <Link to='/shop?category=women' style={styles.catCard}>
            <img
              src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80'
              alt='Women'
              style={styles.catImg}
            />
            <div style={styles.catOverlay}>
              <h3 style={styles.catTitle}>WOMEN</h3>
              <p style={styles.catLink}>Shop Now →</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <p style={styles.sectionTag}>HANDPICKED FOR YOU</p>
            <h2 style={styles.sectionTitle}>Featured Products</h2>
          </div>
          <Link to='/shop' style={styles.viewAll}>View all →</Link>
        </div>
        {loading
          ? <p style={styles.loading}>Loading products...</p>
          : <div style={styles.productsGrid}>
              {featured.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
        }
      </div>

      {/* Banner */}
      <div style={styles.banner}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.bannerContent}
        >
          <p style={styles.bannerTag}>LIMITED TIME OFFER</p>
          <h2 style={styles.bannerTitle}>Get 20% off your first order</h2>
          <p style={styles.bannerSubtitle}>Sign up today and use code LUXFIRST at checkout</p>
          <Link to='/signup' style={styles.bannerBtn}>Create Account →</Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '90vh',
    position: 'relative',
    overflow: 'hidden',
    padding: '60px 60px 60px 80px',
    gap: '40px',
    alignItems: 'center',
  },
  heroLeft: {
    zIndex: 2,
  },
  heroTag: {
    fontSize: '12px',
    letterSpacing: '4px',
    color: '#888',
    marginBottom: '24px',
  },
  heroTitle: {
    fontSize: '72px',
    fontWeight: '900',
    color: '#fff',
    lineHeight: 1,
    marginBottom: '24px',
    letterSpacing: '-2px',
  },
  heroSubtitle: {
    fontSize: '15px',
    color: '#888',
    lineHeight: 1.8,
    marginBottom: '36px',
    maxWidth: '360px',
  },
  heroBtns: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '14px 28px',
    borderRadius: '2px',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '14px 28px',
    borderRadius: '2px',
    fontSize: '13px',
    fontWeight: '500',
    border: '1px solid #444',
    letterSpacing: '1px',
  },
  heroRight: {
    position: 'relative',
    height: '70vh',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  heroImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroImgBadge: {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    backgroundColor: '#fff',
    padding: '16px 20px',
    borderRadius: '2px',
  },
  badgeNum: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#000',
    lineHeight: 1,
  },
  badgeText: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#555',
  },
  verticalText: {
    position: 'absolute',
    left: '24px',
    top: '50%',
    transform: 'translateY(-50%) rotate(-90deg)',
    fontSize: '10px',
    letterSpacing: '4px',
    color: '#444',
    transformOrigin: 'center',
  },
  section: {
    padding: '80px 80px',
  },
  sectionTag: {
    fontSize: '11px',
    letterSpacing: '4px',
    color: '#888',
    marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '40px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '40px',
  },
  viewAll: {
    fontSize: '13px',
    color: '#888',
    letterSpacing: '1px',
  },
  catGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    height: '500px',
  },
  catCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  catImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  catOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '32px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  },
  catTitle: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#fff',
    letterSpacing: '4px',
    marginBottom: '8px',
  },
  catLink: {
    fontSize: '13px',
    color: '#ccc',
    letterSpacing: '1px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
  },
  loading: {
    color: '#555',
    fontSize: '14px',
  },
  banner: {
    margin: '0 80px 80px',
    backgroundColor: '#111',
    borderRadius: '4px',
    padding: '80px',
    border: '1px solid #222',
    textAlign: 'center',
  },
  bannerContent: {},
  bannerTag: {
    fontSize: '11px',
    letterSpacing: '4px',
    color: '#888',
    marginBottom: '16px',
  },
  bannerTitle: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#fff',
    marginBottom: '12px',
  },
  bannerSubtitle: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '32px',
  },
  bannerBtn: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '14px 32px',
    borderRadius: '2px',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
};
const Footer = () => (
  <footer style={footer.wrapper}>
    <div style={footer.top}>
      <div style={footer.brand}>
        <p style={footer.logo}>LUX FASHION</p>
        <p style={footer.tagline}>Premium clothing for the modern wardrobe.</p>
      </div>
      <div style={footer.links}>
        <div style={footer.col}>
          <p style={footer.colTitle}>SHOP</p>
          <a href='/shop' style={footer.link}>All Products</a>
          <a href='/shop?category=men' style={footer.link}>Men</a>
          <a href='/shop?category=women' style={footer.link}>Women</a>
        </div>
        <div style={footer.col}>
          <p style={footer.colTitle}>ACCOUNT</p>
          <a href='/login' style={footer.link}>Sign In</a>
          <a href='/signup' style={footer.link}>Create Account</a>
          <a href='/profile' style={footer.link}>My Profile</a>
        </div>
        <div style={footer.col}>
          <p style={footer.colTitle}>CONTACT</p>
          <p style={footer.link}>Kisumu, Kenya</p>
          <p style={footer.link}>luxfashion@email.com</p>
          <p style={footer.link}>+254 7XX XXX XXX</p>
        </div>
      </div>
    </div>

    <div style={footer.divider} />

    <div style={footer.bottom}>
      <p style={footer.copy}>© 2026 LUX FASHION. ALL RIGHTS RESERVED.</p>
      <div style={footer.socials}>
        {[
          {
            name: 'FACEBOOK',
            href: '#',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            ),
          },
          {
            name: 'INSTAGRAM',
            href: '#',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            ),
          },
          {
            name: 'TIKTOK',
            href: '#',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
            ),
          },
          {
            name: 'X',
            href: '#',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            ),
          },
        ].map(social => (
          <a key={social.name} href={social.href} style={footer.socialLink}>
            {social.icon}
            <span style={footer.socialName}>{social.name}</span>
          </a>
        ))}
      </div>
    </div>
  </footer>
);

const footer = {
  wrapper: {
    backgroundColor: '#080808',
    borderTop: '1px solid #1a1a1a',
    padding: '60px 80px 40px',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '80px',
    marginBottom: '48px',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '900',
    color: '#fff',
    letterSpacing: '4px',
  },
  tagline: {
    fontSize: '13px',
    color: '#444',
    lineHeight: 1.8,
    maxWidth: '220px',
  },
  links: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  colTitle: {
    fontSize: '11px',
    letterSpacing: '3px',
    color: '#fff',
    marginBottom: '4px',
  },
  link: {
    fontSize: '13px',
    color: '#444',
    cursor: 'pointer',
  },
  divider: {
    height: '1px',
    backgroundColor: '#1a1a1a',
    marginBottom: '32px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copy: {
    fontSize: '10px',
    letterSpacing: '2px',
    color: '#333',
  },
  socials: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#444',
    fontSize: '11px',
    letterSpacing: '1px',
    cursor: 'pointer',
  },
  socialName: {
    fontSize: '10px',
    letterSpacing: '2px',
  },
};

export default Home;