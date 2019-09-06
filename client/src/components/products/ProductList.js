import React, { Fragment, useState, Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class ProductList extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    axios
      .get('api/products')
      .then(response => {
        console.log(response);
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { products } = this.state;
    return (
      <Fragment>
        <Link
          to={{
            pathname: `/productos/form`
          }}
        >
          <input
            type='submit'
            className='btn btn-primary right'
            value='Agregar'
          />
        </Link>
        <h1 className='large text-primary'>Articulos Registrados</h1>
        <table className='table striped'>
          <thead>
            <tr>
              <th>Clave Articulo</th>
              <th>Descripcion</th>
              <th>Existencia</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/productos/actualizar/${product._id}`,
                        state: {
                          product
                        }
                      }}
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default withRouter(ProductList);
