import { useContext, useEffect } from 'react';
import '../styles/inicio.css';
import React from 'react';

import { ProductosContext } from '../context/ProductosContext';
import { PaginationContext } from '../context/PaginationContext';

import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Loading } from '../components/Loading';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Inicio = () => {
  const {
    productos,
    productosOriginales,
    loading,
    filtrarProductos,
    cambiarFiltro,
    filtros,
    valorMinInput,
    valorMaxInput,
    manejarValorMinInput,
    manejarValorMaxInput,
    busqueda,
    setProductos,
  } = useContext(ProductosContext);

  const {
    currentPage,
    pageSize,
    totalPages,
    next,
    prev,
    goToPage,
    setTotalItems,
    reset,
  } = useContext(PaginationContext);

  // Buscar y filtrar productos
  const buscarProductos = (lista) => {
    if (busqueda.length > 2) {
      return lista.filter((producto) =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    return lista;
  };

  const productosFiltrados = Array.isArray(productos)
    ? buscarProductos(filtrarProductos(productos))
    : [];

  
  useEffect(() => {
  setTotalItems(productosFiltrados.length);
}, [productosFiltrados]);

useEffect(() => {
  reset(); 
}, [filtros, busqueda]);

  // Productos a mostrar en la página actual
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const productosPagina = productosFiltrados.slice(start, end);

  // Ordenamiento
  const manejarOrdenamiento = (e) => {
    const valor = e.target.value;
    if (valor === 'Menor precio') ordenarMenorPrecio();
    else if (valor === 'Mayor precio') ordenarMayorPrecio();
    else if (valor === 'Por nombre') ordenarNombre();
    else setProductos(productosOriginales);
  };

  const ordenarMenorPrecio = () => {
    const ordenados = [...productos].sort((a, b) => a.price - b.price);
    setProductos(ordenados);
  };

  const ordenarMayorPrecio = () => {
    const ordenados = [...productos].sort((a, b) => b.price - a.price);
    setProductos(ordenados);
  };

  const ordenarNombre = () => {
    const ordenados = [...productos].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setProductos(ordenados);
  };
console.log({ currentPage, pageSize, totalPages, productosFiltrados });
  return (
    <>
      <Navbar />

      {loading ? (
        <Loading />
      ) : (
        <div className="background">
          {/* Título de categoría */}
          {filtros.category !== 'all' && (
            <h2 className="filtros-categoria">
              {filtros.category === 'appliances'
                ? 'Electrodomésticos'
                : filtros.category.charAt(0).toUpperCase() +
                  filtros.category.slice(1)}
            </h2>
          )}

          {/* Ofertas */}
          {filtros.maxPrice === 35 && (
            <h2 className="filtros-categoria">OFERTAS!</h2>
          )}

          {/* Filtro de precio */}
          <div className="filtro-precio">
            <label>Introduce un rango de precio</label>
            <input
              type="number"
              placeholder="Mínimo"
              onChange={manejarValorMinInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  cambiarFiltro(filtros.category, valorMinInput, valorMaxInput);
                }
              }}
            />
            <input
              type="number"
              placeholder="Máximo"
              onChange={manejarValorMaxInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  cambiarFiltro(filtros.category, valorMinInput, valorMaxInput);
                }
              }}
            />
            <button
              className="boton-filtrar"
              onClick={() =>
                cambiarFiltro(filtros.category, valorMinInput, valorMaxInput)
              }
            >
              Filtrar
            </button>
          </div>

          {/* Ordenamiento */}
          <div className="ordenar-productos">
            <p className="ordenar-productos">Ordenar por</p>
            <select className="ordenar-select" onChange={manejarOrdenamiento}>
              <option>Más comprados</option>
              <option>Menor precio</option>
              <option>Mayor precio</option>
              <option>Por nombre</option>
            </select>
          </div>

          {/* Productos */}
          <div className="container">
            {productosPagina.length > 0 ? (
              productosPagina.map((producto) => (
                <Card
                  key={producto.id}
                  id={producto.id}
                  nombre={producto.title}
                  imagen={producto.image}
                  precio={producto.price}
                />
              ))
            ) : (
              <div className="error-container">
                <p className="mensaje-error">
                  No se ha encontrado ningún producto que coincida con tu
                  búsqueda
                </p>
              </div>
            )}
          </div>

          {/* Paginador */}
          {totalPages > 1 && (
            <div className="paginador">
              <button onClick={prev} disabled={currentPage === 1}>
                « Anterior
              </button>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    className={page === currentPage ? 'activo' : ''}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
              <button onClick={next} disabled={currentPage === totalPages}>
                Siguiente »
              </button>
            </div>
          )}
        </div>
      )}

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

