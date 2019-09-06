import React, { Fragment, useState, Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ClientList extends Component {
  state = {
    clients: []
  };

  componentDidMount() {
    axios
      .get('api/clients')
      .then(response => {
        console.log(response);
        this.setState({ clients: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { clients } = this.state;
    return (
      <Fragment>
        <Link to='/clientes/form'>
          <input
            type='submit'
            className='btn btn-primary right'
            value='Agregar'
          />
        </Link>

        <h1 className='large text-primary'>Clientes Registrados</h1>
        <table className='table striped'>
          <thead>
            <tr>
              <th>Clave Cliente</th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => {
              return (
                <tr key={client._id}>
                  <td>{client._id}</td>
                  <td>
                    {client.name.concat(
                      ' ',
                      client.apellidoPaterno,
                      ' ',
                      client.apellidoMaterno
                    )}
                  </td>
                  <td>
                    <Link to='/'>editar</Link>
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

export default ClientList;
