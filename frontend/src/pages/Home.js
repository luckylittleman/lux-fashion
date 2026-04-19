import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Fresh styles, every season</h1>
        <p style={styles.heroText}>Shop men's and women's clothing — quality pieces at great prices.</p>
        <Link to='/shop' style={styles.heroBtn}>Shop now</Link>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Featured products</h2>
          <Link to='/shop' style={styles.viewAll}>View all →</Link>
        </div>
        {loading
          ? <p style={styles.loading}>Loading products...</p>
          : <div style={styles.grid}>
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        }
      </div>

      <div style={styles.categories}>
        <Link to='/shop?category=men' style={styles.catCard}>
          <h3>Men</h3>
          <p>Shop men's collection</p>
        </Link>
        <Link to='/shop?category=women' style={styles.catCard}>
          <h3>Women</h3>
          <p>Shop women's collection</p>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '80px 40px',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  heroText: {
    fontSize: '16px',
    color: '#ccc',
    marginBottom: '28px',
  },
  heroBtn: {
    backgroundColor: '#fff',
    color: '#333',
    padding: '12px 28px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  section: {
    padding: '40px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: '14px',
    color: '#555',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  },
  loading: {
    color: '#999',
    fontSize: '14px',
  },
  categories: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    padding: '0 40px 40px',
  },
  catCard: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '10px',
    padding: '32px',
    textAlign: 'center',
    color: '#333',
  },
};

export default Home;