import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const date = new Date().toLocaleDateString();
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

        <li className='right'>{date}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
