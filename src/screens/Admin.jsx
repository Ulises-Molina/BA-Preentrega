import React, { useContext, useState } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import '../styles/adminProductos.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Admin = () => {
  const { productos, agregarProducto, eliminarProducto, modificarProducto } = useContext(ProductosContext);

  // estado del modal
  const [showModal, setShowModal]     = useState(false);
  const [productoAEliminar, setProd]  = useState(null);

  const [showEdit, setShowEdit] = useState(false);
const [productoAEditar, setProdEdit] = useState(null);

  //  estado del formulario
  const [nuevoProducto, setNuevoProducto] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
  });

  /* ---------- validación y alta ---------- */
  const handleSubmit = async (e) => {
  e.preventDefault();
  const { title, price, image, description } = nuevoProducto;

  if (!title.trim()) {
    toast.error("El nombre del producto es obligatorio.");
    return;
  }

  if (isNaN(price) || price <= 0) {
    toast.error("El precio debe ser mayor a 0.");
    return;
  }

  if (!description || description.trim().length <= 10) {
    toast.error("La descripción debe tener más de 10 caracteres.");
    return;
  }


  await agregarProducto({
  nombre: title,
  precio: price,
  imgurl: image,
  descripcion: description,
  category: 'audio',
  brand: 'genérico',
  model: 'modelo x',
  color: 'negro',
});

  toast.success("¡Producto agregado con éxito!");

  setNuevoProducto({
    title: '',
    price: '',
    image: '',
    description: '',
  });
};

  /* ---------- confirmación de borrado y editado ---------- */
  const pedirConfirmacion = (prod) => {
    setProd(prod);
    setShowModal(true);
  };

  const abrirEditor = (prod) => {
  setProdEdit({ ...prod });   
  setShowEdit(true);
};

const guardarEdicion = async (e) => {
  e.preventDefault();
  if (!productoAEditar.title.trim()) {
    toast.error("El nombre es obligatorio.");
    return;
  }

  await modificarProducto({
    id: productoAEditar.id,
    nombre: productoAEditar.title,
    precio: productoAEditar.price,
    imgurl: productoAEditar.image,
    descripcion: productoAEditar.description,
    category: productoAEditar.category,
    brand: productoAEditar.brand,
    model: productoAEditar.model,
    color: productoAEditar.color,
    discount: productoAEditar.discount,
  });

  toast.success("Producto actualizado.");
  setShowEdit(false);
  setProdEdit(null);
};

 const confirmarEliminar = () => {
  eliminarProducto(productoAEliminar.id);
  toast.success(`Producto "${productoAEliminar.title}" eliminado.`);
  setShowModal(false);
  setProd(null);
};

  const cancelarEliminar = () => {
    setShowModal(false);
    setProd(null);
  };

 
  const inputStyle = {
    padding: '10px 14px', fontSize: '14px',
    border: '1px solid #ccc', borderRadius: '4px',
    outline: 'none', width: '100%', boxSizing: 'border-box'
  };

console.log(productos)
  return (
    <>
      <a className="admin-volver" href="/">Volver al inicio</a>
      <h1 className="admin-title">Administración de Productos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{
        margin: '0 auto 50px', padding: 20, borderRadius: 8, background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,.1)', maxWidth: 600,
        display: 'flex', flexDirection: 'column', gap: 12
      }}>
        <h3 style={{ margin: 0, color: '#333' }}>Agregar nuevo producto</h3>

        <input type="text"   placeholder="Nombre del producto"
               value={nuevoProducto.title}
               onChange={e => setNuevoProducto({ ...nuevoProducto, title: e.target.value })}
               style={inputStyle} required />

        <input type="number" placeholder="Precio"
               value={nuevoProducto.price}
               onChange={e => setNuevoProducto({ ...nuevoProducto, price: e.target.value })}
               style={inputStyle} required />

        <input type="text"   placeholder="URL de imagen"
               value={nuevoProducto.image}
               onChange={e => setNuevoProducto({ ...nuevoProducto, image: e.target.value })}
               style={inputStyle} />

        <textarea placeholder="Descripción"
                  value={nuevoProducto.description}
                  onChange={e => setNuevoProducto({ ...nuevoProducto, description: e.target.value })}
                  rows={3} style={{ ...inputStyle, resize: 'vertical' }} />

        <button type="submit" style={{
          background: '#444f9f', color: '#fff', padding: '10px 16px',
          border: 'none', borderRadius: 5, cursor: 'pointer'
        }}
          onMouseOver={e => e.target.style.background = '#3a4588'}
          onMouseOut ={e => e.target.style.background = '#444f9f'}
        >
          Agregar producto
        </button>
      </form>

      {/* ------- Tabla ------- */}
      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Producto</th><th>Precio</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td className="admin-nombre">{p.title}</td>
              <td>${p.price}</td>
              <td>
  <button className="admin-btn edit"   onClick={() => abrirEditor(p)}>Editar</button>
  <button className="admin-btn delete" onClick={() => pedirConfirmacion(p)}>Eliminar</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ------- Modal de confirmación ------- */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{
            width: '90%', maxWidth: 400, background: '#fff', borderRadius: 8,
            padding: 24, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,.15)'
          }}>
            <h3 style={{ marginTop: 0 }}>¿Eliminar producto?</h3>
            <p style={{ color: '#555' }}>
              Se eliminará <strong>{productoAEliminar?.title}</strong> de la lista.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
              <button
                onClick={confirmarEliminar}
                style={{ padding: '8px 16px', border: 'none',
                         background: '#cc3333', color: '#fff', borderRadius: 4, cursor: 'pointer' }}>
                Sí, eliminar
              </button>
              <button
                onClick={cancelarEliminar}
                style={{ padding: '8px 16px', border: '1px solid #888',
                         background: '#fff', color: '#333', borderRadius: 4, cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
        
      )}

      {showEdit && (
  <div style={{
    position:'fixed', inset:0, background:'rgba(0,0,0,.4)',
    display:'flex', alignItems:'center', justifyContent:'center', zIndex:999
  }}>
    <form onSubmit={guardarEdicion} style={{
      width:'90%', maxWidth:450, background:'#fff', borderRadius:8,
      padding:24, boxShadow:'0 4px 12px rgba(0,0,0,.15)', display:'flex',
      flexDirection:'column', gap:12
    }}>
      <h3 style={{margin:0}}>Editar producto #{productoAEditar.id}</h3>

      <input style={inputStyle} type="text" placeholder="Nombre"
             value={productoAEditar.title}
             onChange={e=>setProdEdit({...productoAEditar, title:e.target.value})}/>

      <input style={inputStyle} type="number" placeholder="Precio"
             value={productoAEditar.price}
             onChange={e=>setProdEdit({...productoAEditar, price:e.target.value})}/>

      <input style={inputStyle} type="text" placeholder="URL imagen"
             value={productoAEditar.image}
             onChange={e=>setProdEdit({...productoAEditar, image:e.target.value})}/>

      <textarea style={{...inputStyle, resize:'vertical'}} rows={3}
                placeholder="Descripción"
                value={productoAEditar.description}
                onChange={e=>setProdEdit({...productoAEditar, description:e.target.value})}/>

      <div style={{display:'flex', gap:12, justifyContent:'flex-end'}}>
        <button type="button" onClick={()=>setShowEdit(false)}
                style={{padding:'8px 14px', border:'1px solid #888',
                        background:'#fff', borderRadius:4, cursor:'pointer'}}>
          Cancelar
        </button>
        <button type="submit"
                style={{padding:'8px 14px', border:'none',
                        background:'#2d8f6f', color:'#fff', borderRadius:4,
                        cursor:'pointer'}}>
          Guardar
        </button>
      </div>
    </form>
  </div>
)}
    </>
  );
};

