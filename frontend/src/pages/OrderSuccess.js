import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { THEME, typography, components, useResponsive } from '../theme';

const OrderSuccess = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const checkoutRequestId = searchParams.get('checkout_request_id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentMessage, setPaymentMessage] = useState('Waiting for M-Pesa confirmation...');
  const [polling, setPolling] = useState(true);
  const { isMobile } = useResponsive();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/orders/${id}/`)
      .then(res => { setOrder(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  // Poll for payment status
  useEffect(() => {
    if (!checkoutRequestId || !polling) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/mpesa/status/${checkoutRequestId}/`
        );
        const status = res.data.status;

        if (status === 'completed') {
          setPaymentStatus('completed');
          setPaymentMessage('Payment confirmed! Thank you.');
          setPolling(false);
        } else if (status === 'failed') {
          setPaymentStatus('failed');
          setPaymentMessage(res.data.result_description || 'Payment failed. Please try again.');
          setPolling(false);
        }
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    // Stop polling after 2 minutes
    const timeout = setTimeout(() => {
      setPolling(false);
      if (paymentStatus === 'pending') {
        setPaymentMessage('Payment confirmation is taking longer than expected. Check your M-Pesa messages.');
      }
    }, 120000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [checkoutRequestId, polling, paymentStatus]);

  if (loading) return (
    <div style={{ backgroundColor: THEME.colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>Loading...</p>
    </div>
  );

  const paymentColors = {
    pending: '#f39c12',
    completed: '#2ecc71',
    failed: '#ba1a1a',
  };

  const paymentIcons = {
    pending: 'schedule',
    completed: 'check_circle',
    failed: 'cancel',
  };

  return (
    <div style={{ backgroundColor: THEME.colors.bg, minHeight: '100vh', paddingTop: '64px', paddingBottom: isMobile ? '72px' : '0' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: isMobile ? '48px 24px' : '80px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#2ecc71',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '36px' }}>check</span>
          </motion.div>

          <p style={{ ...typography.labelSm, color: '#2ecc71', marginBottom: '12px' }}>ORDER CONFIRMED</p>
          <h1 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: isMobile ? '36px' : '48px', fontWeight: 600, color: THEME.colors.onSurface, marginBottom: '12px' }}>
            Thank you, {order?.full_name?.split(' ')[0]}!
          </h1>
          <p style={{ ...typography.bodyLg, color: THEME.colors.onSurfaceVariant, marginBottom: '48px', lineHeight: 1.8 }}>
            Your order #{order?.id} has been placed. Please complete your M-Pesa payment below.
          </p>

          {/* M-Pesa Payment Status */}
          <div style={{
            border: `1px solid ${paymentColors[paymentStatus]}`,
            padding: '24px',
            marginBottom: '32px',
            backgroundColor: `${paymentColors[paymentStatus]}10`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#2ecc71',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>M</span>
              </div>
              <div>
                <p style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurface }}>M-PESA PAYMENT</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: THEME.colors.onSurfaceVariant }}>
                  KSh {Number(order?.total_price).toLocaleString()}
                </p>
              </div>
              <span
                className="material-symbols-outlined"
                style={{ color: paymentColors[paymentStatus], fontSize: '24px', marginLeft: 'auto' }}
              >
                {paymentIcons[paymentStatus]}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {paymentStatus === 'pending' && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#f39c12',
                  animation: 'pulse 1.5s infinite',
                }} />
              )}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: paymentColors[paymentStatus], fontWeight: 500 }}>
                {paymentMessage}
              </p>
            </div>

            {paymentStatus === 'pending' && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: THEME.colors.onSurfaceVariant, marginTop: '12px' }}>
                Check your phone for the M-Pesa prompt and enter your PIN to complete payment.
              </p>
            )}

            {paymentStatus === 'completed' && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: THEME.colors.onSurfaceVariant, marginTop: '12px' }}>
                Receipt: {order?.mpesa_transactions?.[0]?.mpesa_receipt_number}
              </p>
            )}
          </div>

          {/* Order Details */}
          <div style={{ backgroundColor: THEME.colors.surfaceContainerLow, padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '24px' }}>
              Order Details
            </h3>
            {[
              { label: 'ORDER ID', value: `#${order?.id}` },
              { label: 'PHONE', value: order?.phone },
              { label: 'ADDRESS', value: `${order?.address}, ${order?.county}` },
              { label: 'TOTAL', value: `KSh ${Number(order?.total_price).toLocaleString()}` },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? `1px solid ${THEME.colors.border}` : 'none' }}>
                <span style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurfaceVariant }}>{row.label}</span>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurface, fontWeight: 500 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px' }}>
              <span style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurfaceVariant }}>STATUS</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#f39c12',
                border: '1px solid #f39c12',
                padding: '4px 12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {order?.status}
              </span>
            </div>
          </div>

          {/* Items */}
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '16px' }}>
              Items Ordered
            </h3>
            {order?.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${THEME.colors.border}` }}>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>
                  Product #{item.product} × {item.quantity}
                </span>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurface, fontWeight: 500 }}>
                  KSh {Number(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <Link to='/' style={{ ...components.btnPrimary, display: 'inline-flex' }}>
            CONTINUE SHOPPING →
          </Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;