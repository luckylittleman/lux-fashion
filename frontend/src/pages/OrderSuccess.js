import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  if (loading) return (
    <div style={styles.loading}>
      <p style={styles.loadingText}>Loading...</p>
    </div>
  );

  return (
    <div style={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.iconWrapper}
        >
          <span style={styles.icon}>✓</span>
        </motion.div>

        <p style={styles.tag}>ORDER CONFIRMED</p>
        <h1 style={styles.title}>Thank you, {order?.full_name?.split(' ')[0]}!</h1>
        <p style={styles.subtitle}>
          Your order #{order?.id} has been placed successfully.
          We'll be in touch shortly.
        </p>

        <div style={styles.details}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>ORDER ID</span>
            <span style={styles.detailValue}>#{order?.id}</span>
          </div>
          <div style={styles.detailDivider} />
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>PHONE</span>
            <span style={styles.detailValue}>{order?.phone}</span>
          </div>
          <div style={styles.detailDivider} />
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>ADDRESS</span>
            <span style={styles.detailValue}>{order?.address}, {order?.county}</span>
          </div>
          <div style={styles.detailDivider} />
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>STATUS</span>
            <span style={styles.statusBadge}>{order?.status?.toUpperCase()}</span>
          </div>
          <div style={styles.detailDivider} />
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>TOTAL PAID</span>
            <span style={styles.detailValue}>
              KSh {Number(order?.total_price).toLocaleString()}
            </span>
          </div>
        </div>

        <div style={styles.items}>
          <p style={styles.itemsTag}>ITEMS ORDERED</p>
          {order?.items.map((item, index) => (
            <div key={index} style={styles.item}>
              <span style={styles.itemName}>Product #{item.product} x{item.quantity}</span>
              <span style={styles.itemPrice}>
                KSh {Number(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <Link to='/' style={styles.homeBtn}>CONTINUE SHOPPING →</Link>
      </motion.div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 40px',
  },
  loading: {
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#555',
    fontSize: '14px',
    letterSpacing: '2px',
  },
  card: {
    backgroundColor: '#111',
    border: '1px solid #1a1a1a',
    padding: '60px',
    maxWidth: '560px',
    width: '100%',
    textAlign: 'center',
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#2ecc71',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 28px',
  },
  icon: {
    fontSize: '28px',
    color: '#fff',
    fontWeight: '700',
  },
  tag: {
    fontSize: '11px',
    letterSpacing: '4px',
    color: '#2ecc71',
    marginBottom: '16px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#fff',
    marginBottom: '12px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.8,
    marginBottom: '40px',
  },
  details: {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    padding: '24px',
    marginBottom: '32px',
    textAlign: 'left',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
  detailDivider: {
    height: '1px',
    backgroundColor: '#1a1a1a',
  },
  detailLabel: {
    fontSize: '10px',
    letterSpacing: '3px',
    color: '#555',
  },
  detailValue: {
    fontSize: '13px',
    color: '#fff',
    fontWeight: '500',
  },
  statusBadge: {
    fontSize: '10px',
    letterSpacing: '2px',
    color: '#f39c12',
    border: '1px solid #f39c12',
    padding: '3px 10px',
  },
  items: {
    textAlign: 'left',
    marginBottom: '40px',
  },
  itemsTag: {
    fontSize: '11px',
    letterSpacing: '4px',
    color: '#555',
    marginBottom: '16px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#888',
    padding: '10px 0',
    borderBottom: '1px solid #1a1a1a',
  },
  itemName: {
    color: '#ccc',
  },
  itemPrice: {
    color: '#fff',
    fontWeight: '500',
  },
  homeBtn: {
    display: 'inline-block',
    backgroundColor: '#fff',
    color: '#000',
    padding: '14px 40px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2px',
    borderRadius: '2px',
  },
};

export default OrderSuccess;