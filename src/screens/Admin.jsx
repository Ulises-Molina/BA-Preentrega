import React, { useContext, useState } from 'react';
import '../styles/adminProductos.css';
import { ProductosContext } from '../context/ProductosContext';
import FormularioProducto from '../components/FormularioProducto';

export const Admin = () => {
  const { productos, setProductos } = useContext(ProductosContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarProducto = async (producto) => {
    try {
      const res = await fetch('https://fakestoreapi.in/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
      const data = await res.json();
      if (!res.ok) throw new Error('POST falló');

      const nuevoProducto = { ...producto, id: data.id || producto.id || Date.now() };
      setProductos((prev) => [...prev, nuevoProducto]);
      setMostrarFormulario(false);
      alert('Producto agregado correctamente');
    } catch (err) {
      console.error(err);
      alert('No se pudo agregar');
    }
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="admin-container">
      <a className="admin-volver" href="/">Volver al inicio</a>
      <h1 className="admin-title">Administración de Productos</h1>

      <button className="admin-add-btn" onClick={() => setMostrarFormulario(true)}>
        Agregar producto
      </button>

      {mostrarFormulario && <FormularioProducto onAgregar={agregarProducto} />}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Precio</th><th>Marca</th>
            <th>Modelo</th><th>Color</th><th>Categoría</th><th>Desc.</th><th>Acciones</th>
          </tr>
        </thead>

        <tbody>
  {Array.isArray(productos) && productos.length ? (
    productos.map((p, i) => (
      <tr key={p.id ?? `tmp-${i}`}>
        <td>{p.id}</td>
        <td className="admin-nombre">{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand || '-'}</td>
        <td>{p.model || '-'}</td>
        <td>{p.color || '-'}</td>
        <td>{p.category || '-'}</td>
        <td>{p.discount ? `${p.discount}%` : '0%'}</td>
        <td>
          <button className="admin-btn delete" onClick={() => eliminarProducto(p.id)}>
            Eliminar
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" style={{ textAlign: 'center' }}>
        No hay productos disponibles.
      </td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
};

