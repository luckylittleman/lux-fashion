import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const register = async (data) => {
    const res = await axios.post('http://127.0.0.1:8000/api/accounts/register/', data);
    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
    return res.data;
  };

  const login = async (identifier, password) => {
    const res = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
      identifier,
      password,
    });
    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
    return res.data;
  };

  const logout = async () => {
    try {
      const refresh = localStorage.getItem('refresh');
      await axios.post('http://127.0.0.1:8000/api/accounts/logout/', { refresh });
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);