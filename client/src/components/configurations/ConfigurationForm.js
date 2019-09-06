import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConfigurationForm = () => {
  const [formData, setFormData] = useState({
    financeRate: '',
    deposit: '',
    timeLimit: ''
  });

  const { financeRate, deposit, timeLimit } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onReset = e => {
    e.preventDefault();
    var r = window.confirm('¿Seguro que quieres cancelar?');
    if (r) return console.log('cancelado');
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

      const res = await axios.post('/api/configurations', body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Configuración</h1>

      <form
        className='form'
        onSubmit={e => onSubmit(e)}
        onReset={e => onReset(e)}
      >
        <div className='form-group'>
          <input
            type='number'
            placeholder='Tasa de financiamiento'
            name='financeRate'
            value={financeRate}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='% Enganche'
            name='deposit'
            value={deposit}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Plazo máximo'
            name='timeLimit'
            value={timeLimit}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Cancelar' />

        <input type='submit' className='btn btn-primary' value='Guardar' />
      </form>
    </Fragment>
  );
};

export default ConfigurationForm;
