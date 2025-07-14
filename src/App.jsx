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
        </ProductosProvider>
    )
}
