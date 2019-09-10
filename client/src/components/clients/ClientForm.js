import React, { Fragment, useState } from 'react';
import axios from 'axios';

const ClientForm = props => {
  const [formData, setFormData] = useState({
    name: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    RFC: ''
  });

  const { name, apellidoPaterno, apellidoMaterno, RFC } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onReset = e => {
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
      const body = JSON.stringify(formData);

      const res = await axios.post('/api/clients', body, config);
      alert('Cliente registrado con exito');
      props.history.push('/clientes');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Registro de Clientes</h1>
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
            placeholder='Nombre'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Apellido Paterno'
            name='apellidoPaterno'
            value={apellidoPaterno}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Apellido Materno'
            name='apellidoMaterno'
            value={apellidoMaterno}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='RFC'
            name='RFC'
            value={RFC}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type='reset' className='btn btn-primary' value='Cancelar' />

        <input type='submit' className='btn btn-primary' value='Guardar' />
      </form>
    </Fragment>
  );
};

export default ClientForm;
