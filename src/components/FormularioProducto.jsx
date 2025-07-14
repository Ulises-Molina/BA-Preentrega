import React, { useState } from 'react';

function FormularioProducto({ onAgregar }) {
  const [producto, setProducto] = useState({
    id: Date.now(),
    title: '',
    price: '',
    description: '',
    image: '',
    brand: '',
    model: '',
    color: '',
    category: '',
    discount: 0,
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!producto.title.trim()) {
      nuevosErrores.title = 'El nombre es obligatorio';
    }
    if (!producto.price || parseFloat(producto.price) <= 0) {
      nuevosErrores.price = 'El precio debe ser mayor que cero';
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario() && typeof onAgregar === 'function') {
      const productoFinal = {
        ...producto,
        price: parseFloat(producto.price),
        discount: parseFloat(producto.discount) || 0,
        id: Date.now(), // Regeneramos ID único al confirmar
      };
      onAgregar(productoFinal);

      setProducto({
        id: Date.now(),
        title: '',
        price: '',
        description: '',
        image: '',
        brand: '',
        model: '',
        color: '',
        category: '',
        discount: 0,
      });
      setErrores({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '320px',
        margin: '25px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <input name="title" value={producto.title} onChange={handleChange} placeholder="Nombre" />
      {errores.title && <p style={{ color: 'red', fontSize: '13px' }}>{errores.title}</p>}

      <input type="number" name="price" value={producto.price} onChange={handleChange} placeholder="Precio" />
      {errores.price && <p style={{ color: 'red', fontSize: '13px' }}>{errores.price}</p>}

      <input name="description" value={producto.description} onChange={handleChange} placeholder="Descripción" />
      {errores.description && <p style={{ color: 'red', fontSize: '13px' }}>{errores.description}</p>}

      <input name="brand" value={producto.brand} onChange={handleChange} placeholder="Marca" />
      <input name="model" value={producto.model} onChange={handleChange} placeholder="Modelo" />
      <input name="color" value={producto.color} onChange={handleChange} placeholder="Color" />
      <input name="category" value={producto.category} onChange={handleChange} placeholder="Categoría" />
      <input name="image" value={producto.image} onChange={handleChange} placeholder="URL de imagen" />
      <input type="number" name="discount" value={producto.discount} onChange={handleChange} placeholder="Descuento (%)" />

      <button
        type="submit"
        style={{
          padding: '10px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        Agregar producto
      </button>
    </form>
  );
}

export default FormularioProducto;
