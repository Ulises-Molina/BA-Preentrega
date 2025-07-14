import React, { useState, useEffect } from 'react';
import { ProductosContext } from './ProductosContext'; // asegúrate que el path sea correcto

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
    const productosGuardados = localStorage.getItem('productosSave');
    const parsed = productosGuardados ? JSON.parse(productosGuardados) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Error al parsear productos guardados", err);
    return [];
  }
});

  const fetchProductos = async () => {
  try {
    const res = await fetch('https://fakestoreapi.in/api/products');
    const data = await res.json();

    if (Array.isArray(data.products)) {
      setProductos(data.products);
      setProductosOriginales(data.products);
    } else {
      console.error("La API devolvió un formato no esperado:", data);
      setProductos([]);
    }

    setLoading(false);
  } catch (error) {
    alert('Ha ocurrido un error al cargar los productos: ' + error.message);
  }
};


  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    localStorage.setItem('productosSave', JSON.stringify(productos));
  }, [productos]);

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

  const manejarInput = (e) => {
    setBusqueda(e.target.value);
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
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
