/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    console.log("Token recuperado:", storedToken);  // Verifique se o token foi realmente recuperado
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("Token não encontrado");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;  // Mostra um carregamento enquanto o token é recuperado
  }
  
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
