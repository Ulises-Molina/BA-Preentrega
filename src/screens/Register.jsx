import React from 'react';
import '../styles/register.css'

export const Register = () => {
  return (
    <div className="register-centered-container">
      <a className='register-volver' href="/">Volver al inicio</a>
      <div className="register-form-section">
        <h1 className="register-title">Crear cuenta</h1>
        <form className="register-form">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            id="name"
            placeholder="Tu nombre"
            required
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="usuario@ejemplo.com"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            required
          />

          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            required
          />

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

