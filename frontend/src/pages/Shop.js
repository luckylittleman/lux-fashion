import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();

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
    <div style={styles.container}>
      <h2 style={styles.title}>All products</h2>
      <div style={styles.filters}>
        {['all', 'men', 'women'].map(cat => (
          <button
            key={cat}
            style={{
              ...styles.filterBtn,
              ...(activeCategory === cat ? styles.activeFilter : {})
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      {loading
        ? <p style={styles.loading}>Loading products...</p>
        : products.length === 0
          ? <p style={styles.loading}>No products found.</p>
          : <div style={styles.grid}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
      }
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '28px',
  },
  filterBtn: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#555',
    fontSize: '14px',
    cursor: 'pointer',
  },
  activeFilter: {
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #333',
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
};

export default Shop;