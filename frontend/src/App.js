import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

const AppContent = () => {
  const { toast, hideToast } = useCart();

  return (
    <>
      <Navbar />
      {toast && <Toast message={toast} onClose={hideToast} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-success/:id' element={<OrderSuccess />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
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