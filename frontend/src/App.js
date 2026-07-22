import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import { ToastContainer } from './components/Toast';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const { toast, hideToast } = useCart();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ToastContainer toast={toast} hideToast={hideToast} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-success/:id' element={<OrderSuccess />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
             <Dashboard />  {/* this is the actual page */}
          </ProtectedRoute>
        } />
        
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;