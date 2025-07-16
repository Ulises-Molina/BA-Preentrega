import React, { useState, useEffect } from 'react';
import { ProductosContext } from './ProductosContext';

export const ProductosProvider = ({ children }) => {
  const [filtros, setFiltros] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 100000,
  });

  const cambiarFiltro = (categoria, minPrice = 0, maxPrice = 100000) => {
    setFiltros({ category: categoria, minPrice, maxPrice });
  };

  const filtrarProductos = (productos) => {
    if (!Array.isArray(productos)) return [];
    return productos.filter((producto) => {
      const cumplePrecio = producto.price >= filtros.minPrice && producto.price <= filtros.maxPrice;
      const cumpleCategoria = filtros.category === 'all' || producto.category === filtros.category;
      return cumplePrecio && cumpleCategoria;
    });
  };

  const [productosOriginales, setProductosOriginales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  const upsertPersonalizado = (productoActualizado) => {
    const guardados = JSON.parse(localStorage.getItem('productosPersonalizados') || '[]');
    const filtrados = guardados.filter(p => p.id !== productoActualizado.id);
    const actualizados = [...filtrados, productoActualizado];
    localStorage.setItem('productosPersonalizados', JSON.stringify(actualizados));
  };

  const fetchProductos = async () => {
    try {
      const res = await fetch('https://fakestoreapi.in/api/products');
      const data = await res.json();

      const productosAPI = Array.isArray(data.products) ? data.products : [];
      const personalizadosGuardados = JSON.parse(localStorage.getItem('productosPersonalizados') || '[]');

      const combinados = productosAPI.map(api => {
        const per = personalizadosGuardados.find(p => p.id === api.id);
        return per || api;
      });

      const extras = personalizadosGuardados.filter(p => !productosAPI.some(api => api.id === p.id));
      const final = [...combinados, ...extras];

      setProductos(final);
      setProductosOriginales(final);
      setLoading(false);
    } catch (error) {
      alert('Error al cargar productos: ' + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const [valorMinInput, setValorMinInput] = useState(0);
  const [valorMaxInput, setValorMaxInput] = useState(100000);

  const manejarValorMinInput = (e) => {
    const val = e.target.value;
    setValorMinInput(val === '' || val === undefined ? 0 : Number(val));
  };

  const manejarValorMaxInput = (e) => {
    const val = e.target.value;
    setValorMaxInput(val === '' || val === undefined ? 100000 : Number(val));
  };

  const [busqueda, setBusqueda] = useState('');
  const manejarInput = (e) => setBusqueda(e.target.value);

  const generarIdUnico = () => Date.now();

  const agregarProducto = async (nuevoProducto) => {
    try {
      const payload = {
        title: nuevoProducto.nombre,
        price: String(nuevoProducto.precio),
        description: nuevoProducto.descripcion,
        image: nuevoProducto.imgurl,
        category: nuevoProducto.category || 'otros',
        brand: nuevoProducto.brand || 'sin marca',
        model: nuevoProducto.model || 'modelo genérico',
        color: nuevoProducto.color || 'sin color',
        discount: String(nuevoProducto.discount || 0),
      };

      const res = await fetch('https://fakestoreapi.in/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      const creado = data.product ?? data;

      if (!creado.id) creado.id = generarIdUnico();

      setProductos(prev => [...prev, creado]);
      upsertPersonalizado(creado);

    } catch (err) {
      console.error('Error creando producto:', err);
      alert('No se pudo crear el producto. Intenta de nuevo.\n' + err.message);
    }
  };

  const eliminarProducto = (id) => {
    const productoEliminado = productos.find(p => p.id === id);
    if (!productoEliminado) return;

    const nuevosProductos = productos.filter(p => p.id !== id);
    setProductos(nuevosProductos);

    const guardados = JSON.parse(localStorage.getItem('productosPersonalizados') || '[]');
    const personalizadosActualizados = guardados.filter(p => p.id !== id);
    localStorage.setItem('productosPersonalizados', JSON.stringify(personalizadosActualizados));
  };

  const modificarProducto = async (productoEditado) => {
    try {
      const payload = {
        title: productoEditado.nombre,
        price: String(productoEditado.precio),
        description: productoEditado.descripcion,
        image: productoEditado.imgurl,
        category: productoEditado.category || 'otros',
        brand: productoEditado.brand || 'sin marca',
        model: productoEditado.model || 'modelo genérico',
        color: productoEditado.color || 'sin color',
        discount: String(productoEditado.discount || 0),
      };

      const res = await fetch(`https://fakestoreapi.in/api/products/${productoEditado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const actualizado = data.product ?? data;
      actualizado.id = productoEditado.id; 

      setProductos(prev => prev.map(p => p.id === actualizado.id ? actualizado : p));
      setProductosOriginales(prev => prev.map(p => p.id === actualizado.id ? actualizado : p));

      upsertPersonalizado(actualizado);

    } catch (err) {
      alert('No se pudo actualizar: ' + err.message);
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        setProductos,
        loading,
        productosOriginales,
        cambiarFiltro,
        filtros,
        filtrarProductos,
        valorMinInput,
        valorMaxInput,
        manejarValorMinInput,
        manejarValorMaxInput,
        manejarInput,
        busqueda,
        setBusqueda,
        agregarProducto,
        eliminarProducto,
        modificarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
