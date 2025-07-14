import React from 'react';
import "../styles/login.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login] = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(usuario === "admin" && password === "1234") {
        login({usuario});
        navigate("/");
    }else{
        toast.error("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <a className='login-volver' href="/">Volver al inicio</a>
      <div className="login-image-section">
        <img
          src="/globe-earth.png"
          alt="Login visual"
          className="login-image"
        />
      </div>

      <div className="login-form-section">
        <h1 className="login-title">Iniciar sesión</h1>
        <form className="login-form"
        onSubmit={handleSubmit}
        >
          <label htmlFor="email">Nombre de usuario</label>
          <input
            type="text"
            id="usuario"
            placeholder="Nombre de usuario"
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            required
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>Credenciales de prueba: admin / 1234</p>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
