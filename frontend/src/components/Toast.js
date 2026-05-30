import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../theme';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 150, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{
        backgroundColor: '#111111',
        color: '#ffffff',
        border: '1px solid #ffffff',
        borderRadius: THEME.borderRadius,
        padding: '14px 24px',
        minWidth: '260px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        fontFamily: THEME.fonts.mono,
        fontSize: '11px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: THEME.colors.accentGreen, flexShrink: 0 }} />
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px', padding: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
      >
        ✕
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toast, hideToast }) => {
  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
      <AnimatePresence>
        {toast && (
          <div style={{ pointerEvents: 'auto' }}>
            <Toast message={toast} onClose={hideToast} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toast;