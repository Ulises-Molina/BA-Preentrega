import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import "../styles/navbar.css";
import "../styles/inicio.css"
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import { SupervisorAccount } from '@mui/icons-material';
import { Logout } from '@mui/icons-material';
import { NavLink,Link } from 'react-router-dom';
import { useContext ,React} from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useState } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { DarkModeContext } from '../context/DarkModeContext';
import { useAuthContext } from '../context/AuthContext';



export const Navbar = () => {

    const {cambiarFiltro,filtros,manejarInput} = useContext(ProductosContext);
    const {listaCompras} = useContext(CarritoContext)
    const {darkMode} = useContext(DarkModeContext)
    const [ ,logout , isAuthenticated ] = useAuthContext();


    
    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const botonCategorias = () => setMostrarCategorias(true);
    const cerrarCategorias = () => setMostrarCategorias(false);

    const activarCategorias = () => {
        if(mostrarCategorias){
            cerrarCategorias()
        }
        else {
            botonCategorias()
        }
    }

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    


    return (
        <>
        <div className='header'>
            <NavLink to='/inicio' onClick={()=> {
                cambiarFiltro("all")
                handleScrollToTop()
                }}>
            <img src='/globe-earth.png' alt="Logo"></img></NavLink>
            <Link to="/inicio" className='talentotech' onClick={()=> {cambiarFiltro("all")
            handleScrollToTop()
            }}>TalentoTech</Link>
            <div className='contenedor-input'>
            <input className='input-search' type='serch' autoComplete='off' placeholder='Buscar productos' onChange={manejarInput}/>
            <SearchIcon className='icon-lupa'></SearchIcon>
            </div>        
            {isAuthenticated ?  <><NavLink to='/carrito'>
            <Badge badgeContent={listaCompras.length} color="primary" className='cart'>
                <ShoppingCart color="action"/>
            </Badge></NavLink>
            <NavLink to='/admin'><SupervisorAccount className='admin-icon'/></NavLink>
            <Logout className='logout-icon' onClick={logout}/></> : <NavLink to='/login'><LoginIcon className='login-icon'/></NavLink>
            }
            
        </div>
        <div className={darkMode ? "zocalo-dark-mode" : "zocalo"}>
            <NavLink to={'/inicio'} className={darkMode ? "link-dark-mode" :'link'} onClick={()=> cambiarFiltro("all")}>Inicio</NavLink>
            <a className={darkMode ? "link-dark-mode" :'link'} onMouseEnter={botonCategorias}onMouseLeave={cerrarCategorias} onClick={activarCategorias}>Categorias</a>
            <NavLink to="/inicio"className={darkMode ? "link-dark-mode" :'link'} onClick={()=>cambiarFiltro(filtros.category,0,35)}>Ofertas</NavLink>
        </div>
        {mostrarCategorias && (
                <div className="categorias-dropdown"
                onMouseEnter={botonCategorias}
                onMouseLeave={cerrarCategorias}>
                    <ul>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("all");cerrarCategorias();}}>Todos</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("gaming");cerrarCategorias();}}>Gaming</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("audio");cerrarCategorias();}}>Audio</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("mobile");cerrarCategorias();}}>Celulares</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("tv");cerrarCategorias();}}>Televisiones</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("laptop");cerrarCategorias();}}>Laptops</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("appliances");cerrarCategorias();}}>Electrodomesticos</NavLink>
                    </ul>
                </div>
            )}
        </>
    )
}
