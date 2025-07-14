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

  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('productosSave');
      const parsed = guardados ? JSON.parse(guardados) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("Error al parsear productos guardados:", err);
      return [];
    }
  });

  const fetchProductos = async () => {
  try {
    const res = await fetch('https://fakestoreapi.in/api/products');
    const data = await res.json();

    const productosAPI = Array.isArray(data.products) ? data.products : [];

    // Leer productos personalizados previos desde localStorage
    const personalizadosGuardados = JSON.parse(localStorage.getItem('productosPersonalizados') || '[]');

    const combinados = [...productosAPI, ...personalizadosGuardados];

    setProductos(combinados);
    setProductosOriginales(combinados);
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


  const agregarProducto = (nuevoProducto) => {
  const idUnico = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  const productoConID = { ...nuevoProducto, id: idUnico };

  const nuevosProductos = [...productos, productoConID];
  setProductos(nuevosProductos);

  
  const guardados = JSON.parse(localStorage.getItem('productosPersonalizados') || '[]');
  const actualizados = [...guardados, productoConID];
  localStorage.setItem('productosPersonalizados', JSON.stringify(actualizados));
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
        eliminarProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
