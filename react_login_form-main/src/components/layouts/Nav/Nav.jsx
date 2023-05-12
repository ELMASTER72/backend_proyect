import React from 'react'
import { Link } from 'react-router-dom'
import Register from '../Form2/Register'
import Login from '../Form/Login'


export const Nav = () => {
  return (
    <div >
        <nav className='nav'>
            <ul className='main-links'>
                <li className='inicio'><Link className='links' to="/home">Inicio</Link></li>
                <li className='dropdown-li'><Link className='links'>Rutinas</Link>
                    <ul className='dropdown'>
                        <li><Link className='links'>Brazo</Link></li>
                        <li><Link className='links'>Espalda</Link></li>
                        <li><Link className='links'>Gluteo</Link></li>
                        <li><Link className='links'>Pierna</Link></li>
                    </ul>
                </li>
                <li className='dropdown-li'><Link className='links' to='/Store'>Tienda</Link>
                    <ul className='dropdown'>
                        <li><Link className='links'>Accesorios</Link></li>                      
                        <li><Link className='links'>Energizantes</Link></li>                      
                        <li><Link className='links'>Ropa</Link></li>                      
                    </ul>
                </li>
            </ul>
            <ul className='icons'>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                </li>
                <li className='dropdown-li'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    <ul className='dropdowns'>
                        <li><Register/></li>
                        <li><Login/></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
  )
}

