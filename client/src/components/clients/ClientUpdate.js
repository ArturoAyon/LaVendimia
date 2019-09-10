import React, { Fragment, useState } from 'react';
import axios from 'axios';

const ClientUpdate = props => {
  const { id } = props.match.params;
  const { client } = props.location.state;
  console.log('client');
  console.log(client);

  const [formData, setFormData] = useState({
    name: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    RFC: ''
  });

  const { name, apellidoPaterno, apellidoMaterno, RFC } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onReset = async e => {
    e.preventDefault();
    var r = window.confirm('¿Seguro que quieres cancelar?');
    if (r) {
      return props.history.push('/clientes');
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (formData.name === '') {
        formData.name = client.name;
      }
      if (formData.apellidoPaterno === '') {
        formData.apellidoPaterno = client.apellidoPaterno;
      }
      if (formData.apellidoMaterno === '') {
        formData.apellidoMaterno = client.apellidoMaterno;
      }
      if (formData.RFC === '') {
        formData.RFC = client.RFC;
      }
      const body = JSON.stringify(formData);

      const res = await axios.patch(`/api/clients/client/${id}`, body, config);
      alert('Configuracion guardada con exito');
      props.history.push('/clientes');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Editar Cliente</h1>
      <p className='lead'>
        <i class='fas fa-user'></i> Cliente
      </p>
      <form
        className='form'
        onSubmit={e => onSubmit(e)}
        onReset={e => onReset(e)}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder={client.name}
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder={client.apellidoPaterno}
            name='apellidoPaterno'
            value={apellidoPaterno}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder={client.apellidoMaterno}
            name='apellidoMaterno'
            value={apellidoMaterno}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder={client.RFC}
            name='RFC'
            value={RFC}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Guardar' />
        <input type='reset' className='btn btn-primary' value='Cancelar' />
      </form>
    </Fragment>
  );
};

export default ClientUpdate;
