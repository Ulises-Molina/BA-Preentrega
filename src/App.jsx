import React from 'react'
import { Inicio } from './screens/Inicio'
import { ProductosProvider } from './context/ProdcutosProvider'
import { Route, Routes } from 'react-router-dom'
import { Producto } from './screens/Producto'
import { Carrito } from './screens/Carrito'
import { CarritoProvider } from './context/CarritoProvider'
import { DarkModeProvider } from './context/DarkModeProvider'
import { Compra} from './screens/Compra'
import { Login } from './screens/Login'
import { Admin } from './screens/Admin'
import ProtectedRoute from './context/ProtectedRoute'
import { Register } from './screens/Register'
import { AuthProvider } from './context/AuthContext'
import { Helmet } from 'react-helmet';


export const App = () => {
    return (
       <ProductosProvider> <DarkModeProvider>
            <AuthProvider>
                <CarritoProvider>
                    <Routes>
                        <Route path='/' element={<Inicio></Inicio>}></Route>
                        <Route path='/producto/:id' element={<Producto></Producto>}></Route>
                        <Route path='/inicio' element={<Inicio></Inicio>}></Route>
                        <Route path='/carrito' element={<ProtectedRoute><Carrito></Carrito></ProtectedRoute>}></Route>
                        <Route path='/compra' element={<ProtectedRoute><Compra></Compra></ProtectedRoute>}></Route>
                        <Route path='/login' element={<Login></Login>}></Route>
                        <Route path='/admin' element={<ProtectedRoute><Admin></Admin></ProtectedRoute>}></Route>
                        <Route path='/register' element={<Register></Register>}></Route>
                </Routes>
            </CarritoProvider>
        </AuthProvider>
        </DarkModeProvider>
        <Helmet>
  <title>Talento Tech | Productos innovadores para el futuro digital</title>
  <meta name="description" content="Descubrí productos tecnológicos de calidad, ideales para impulsar tu vida digital. Comprá fácil, rápido y seguro." />
  <meta name="keywords" content="tecnología, ecommerce, auriculares, celulares, gadgets, tienda online" />
  <meta name="author" content="Talento Tech" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Open Graph para redes sociales */}
  <meta property="og:title" content="Talento Tech" />
  <meta property="og:description" content="Explorá nuestra selección de productos tech. Comprá con confianza en Talento Tech." />
  <meta property="og:image" content="/globe-earth.png" />
  <meta property="og:url" content="https://www.talentotech.com" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Talento Tech" />
  <meta name="twitter:description" content="Productos innovadores y tecnología a tu alcance." />
  <meta name="twitter:image" content="/globe-earth.png" />

  {/* Favicon */}
  <link rel="icon" href="/globe-earth.png" />
</Helmet>
        </ProductosProvider>
    )
}
