import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/orders/${id}/`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✓</div>
        <h2 style={styles.title}>Order placed successfully!</h2>
        <p style={styles.subtitle}>
          Thank you {order?.full_name}, your order has been received.
        </p>
        <div style={styles.details}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Order ID</span>
            <span style={styles.detailValue}>#{order?.id}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Phone</span>
            <span style={styles.detailValue}>{order?.phone}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Delivery address</span>
            <span style={styles.detailValue}>{order?.address}, {order?.county}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Total paid</span>
            <span style={styles.detailValue}>
              KSh {Number(order?.total_price).toLocaleString()}
            </span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Status</span>
            <span style={styles.badge}>{order?.status}</span>
          </div>
        </div>
        <div style={styles.items}>
          <h3 style={styles.itemsTitle}>Items ordered</h3>
          {order?.items.map((item, index) => (
            <div key={index} style={styles.item}>
              <span>Product #{item.product} x{item.quantity}</span>
              <span>KSh {Number(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <Link to='/' style={styles.homeBtn}>Continue shopping</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 40px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '520px',
    width: '100%',
    textAlign: 'center',
  },
  icon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#2ecc71',
    color: '#fff',
    fontSize: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '28px',
  },
  details: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '16px 20px',
    marginBottom: '24px',
    textAlign: 'left',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    padding: '6px 0',
    borderBottom: '1px solid #eee',
  },
  detailLabel: { color: '#999' },
  detailValue: { color: '#333', fontWeight: '500' },
  badge: {
    backgroundColor: '#f0f9f4',
    color: '#2ecc71',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  items: {
    textAlign: 'left',
    marginBottom: '28px',
  },
  itemsTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#555',
    padding: '6px 0',
    borderBottom: '1px solid #eee',
  },
  loading: { padding: '40px', textAlign: 'center', color: '#999' },
  homeBtn: {
    display: 'inline-block',
    backgroundColor: '#333',
    color: '#fff',
    padding: '12px 28px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default OrderSuccess;