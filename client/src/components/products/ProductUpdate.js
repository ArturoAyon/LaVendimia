import React, { Fragment, useState } from 'react';
import axios from 'axios';

function ProductUpdate(props) {
  const { id } = props.match.params;
  const { product } = props.location.state;
  console.log('Producto');
  console.log(product);

  const [formData, setFormData] = useState({
    description: '',
    model: '',
    cost: '',
    stock: ''
  });

  const { description, model, cost, stock } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onReset = async e => {
    e.preventDefault();
    var r = window.confirm('¿Seguro que quieres cancelar?');
    if (r) {
      props.history.push(`/productos`);
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
      if (formData.description === '') {
        formData.description = product.description;
      }
      if (formData.model === '') {
        formData.model = product.model;
      }
      if (formData.cost === '') {
        formData.cost = product.cost;
      }
      if (formData.stock === '') {
        formData.stock = product.stock;
      }
      const body = JSON.stringify(formData);

      const res = await axios.patch(
        `/api/products/product/${id}`,
        body,
        config
      );
      alert('Bien Hecho. El Articulo ha sido modificado exitosamente');
      props.history.push(`/productos`);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Editar Articulo</h1>
      <p className='lead'>
        <i className='fas fa-couch'></i> Articulo
      </p>
      <form
        className='form'
        onSubmit={e => onSubmit(e)}
        onReset={e => onReset(e)}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder={product.description}
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder={product.model}
            name='model'
            value={model}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder={product.cost}
            name='cost'
            value={cost}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder={product.stock}
            name='stock'
            value={stock}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='reset' className='btn btn-primary' value='Cancelar' />
        <input type='submit' className='btn btn-primary' value='Guardar' />
      </form>
    </Fragment>
  );
}

export default ProductUpdate;
