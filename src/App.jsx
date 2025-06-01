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


export const App = () => {
    return (
        <DarkModeProvider>
            <ProductosProvider>
                <CarritoProvider>
                    <Routes>
                        <Route path='/' element={<Inicio></Inicio>}></Route>
                        <Route path='/producto/:id' element={<Producto></Producto>}></Route>
                        <Route path='/inicio' element={<Inicio></Inicio>}></Route>
                        <Route path='/carrito' element={<Carrito></Carrito>}></Route>
                        <Route path='/compra' element={<Compra></Compra>}></Route>
                        <Route path='/login' element={<Login></Login>}></Route>
                        <Route path='/admin' element={<Admin></Admin>}></Route>
                </Routes>
            </CarritoProvider>
        </ProductosProvider>
    </DarkModeProvider>
    )
}
