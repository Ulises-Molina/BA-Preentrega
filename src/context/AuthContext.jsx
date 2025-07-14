import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ usuario }) => {
    const token = `fake-token-${usuario}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', usuario);
    setUser({ nombre: usuario });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
    toast.success("Sesión cerrada con éxito");
  };

  // Verificar si ya hay un usuario logueado al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (token && storedUser) {
      setUser({ nombre: storedUser });
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={[login, logout, isAuthenticated, user]}>
      {children}
    </AuthContext.Provider>
  );
};
