import React, { Fragment, useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    model: '',
    cost: '',
    stock: ''
  });

  const { description, model, cost, stock } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify(formData);

      const res = await axios.post(
        'http://localhost:5000/api/products',
        body,
        config
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Registro de Articulos</h1>
      <p className='lead'>
        <i className='fas fa-couch'></i> Articulo
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Descripción'
            name='description'
            value={description}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='model'
            name='model'
            value={model}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='cost'
            name='cost'
            value={cost}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='stock'
            name='stock'
            value={stock}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Guardar' />
        <input type='submit' className='btn btn-primary' value='Cancelar' />
      </form>
    </Fragment>
  );
};

export default ProductForm;
