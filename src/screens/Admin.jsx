import React, { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext'
import '../styles/adminProductos.css'

export const Admin = () => {
    const { productos, eliminarProducto} = useContext(ProductosContext);

   console.log(productos)
return (
  <>
  <a className='admin-volver' href="/">Volver al inicio</a>
        <h1 className="admin-title">Administración de Productos</h1>
  <table className="admin-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Producto</th>
      <th>Precio</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
  {productos.map((producto) => (
    <tr key={producto.id}>
      <td>{producto.id}</td>
      <td className="admin-nombre">{producto.title}</td>
      <td>{producto.price}</td>
      <td>
        <button
          className="admin-btn delete"
          onClick={() => eliminarProducto(producto.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>

</>
  );
};
