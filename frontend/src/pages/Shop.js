import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useResponsive } from '../theme';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const { isMobile } = useResponsive();
  const location = useLocation();

  const styles = {
  page: {
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
  },
  header: {
    padding: isMobile ? '40px 24px 24px' : '60px 80px 40px',
    borderBottom: '1px solid #1a1a1a',
  },
  headerTag: {
    fontSize: '11px',
    letterSpacing: '4px',
    color: '#555',
    marginBottom: '12px',
  },
  headerTitle: {
    fontSize: isMobile ? '32px' : '48px',
    fontWeight: '900',
    color: '#fff',
    letterSpacing: '-1px',
  },
  container: {
    padding: isMobile ? '24px' : '40px 80px 80px',
  },
  filters: {
    display: 'flex',
    gap: '8px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: isMobile ? '8px 16px' : '10px 24px',
    border: '1px solid #222',
    backgroundColor: 'transparent',
    color: '#666',
    fontSize: '12px',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
    transition: 'all 0.2s',
  },
  filterActive: {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #fff',
    fontWeight: '700',
  },
  count: {
    fontSize: '12px',
    color: '#555',
    letterSpacing: '1px',
    marginBottom: '24px',
  },
   grid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: isMobile ? '16px' : '24px',
  },
  loadingContainer: {
    padding: '80px 0',
    textAlign: 'center',
  },
  loading: {
    color: '#555',
    fontSize: '14px',
    letterSpacing: '1px',
  },
};

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
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div style={styles.page}>

      {/* Page Header */}
      <div style={styles.header}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.headerTag}
        >
          EXPLORE OUR COLLECTION
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={styles.headerTitle}
        >
          All Products
        </motion.h1>
      </div>

      <div style={styles.container}>
        {/* Filters */}
        <div style={styles.filters}>
          {['all', 'men', 'women'].map(cat => (
            <button
              key={cat}
              style={{
                ...styles.filterBtn,
                ...(activeCategory === cat ? styles.filterActive : {}),
              }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'ALL' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <p style={styles.loading}>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={styles.loadingContainer}>
            <p style={styles.loading}>No products found.</p>
          </div>
        ) : (
          <>
            <p style={styles.count}>{products.length} products</p>
            <div style={styles.grid}>
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};



export default Shop;