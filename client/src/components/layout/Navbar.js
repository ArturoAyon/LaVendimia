import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <ul>
        <li>
          <Link to='/ventas'>Ventas</Link>
        </li>
        <li>
          <Link to='/clientes'>Clientes</Link>
        </li>
        <li>
          <Link to='/productos'>Articulos</Link>
        </li>
        <li>
          <Link to='/configuracion'>Configuración</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
