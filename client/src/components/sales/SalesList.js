import React, { Fragment, useState, Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SalesList extends Component {
  state = {
    sales: []
  };

  componentDidMount() {
    axios
      .get('api/sales')
      .then(response => {
        console.log(response);
        this.setState({ sales: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { sales } = this.state;
    return (
      <Fragment>
        <Link
          to={{
            pathname: `/sales`
          }}
        >
          <input
            type='submit'
            className='btn btn-primary right'
            value='Nueva Venta'
          />
        </Link>
        <h1 className='large text-primary'>Ventas Registradas</h1>
        <table className='table striped'>
          <thead>
            <tr>
              <th>Folio Venta</th>
              <th>Clave Cliente </th>
              <th>Nombre</th>
              <th>Total</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => {
              return (
                <tr key={sale._id}>
                  <td>{sale._id}</td>
                  <td>{sale.clientId}</td>
                  <td>{sale.clientName}</td>
                  <td>{sale.total}</td>
                  <td>{sale.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default SalesList;
