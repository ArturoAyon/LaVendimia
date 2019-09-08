import React from 'react';

function Product(props) {
  return (
    <tr key={props.product._id}>
      <td>{props.product.description}</td>
      <td>{props.product.model}</td>

      <td>
        <input type='number' name='quantity' onChange={props.changeQuantity} />
      </td>
      <td>
        {' '}
        <label>{props.product.price}</label>
      </td>
      <td>
        {' '}
        <label>{props.product.amount} </label>
      </td>
      <td>
        <button onClick={props.delEvent}>delete</button>
      </td>
    </tr>
  );
}

export default Product;