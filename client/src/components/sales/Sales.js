import React, { Fragment, useState, Component } from 'react';
import axios from 'axios';
import Product from './Product';

class Sales extends Component {
  state = {
    clients: [],
    products: [],
    productsSelected: [],
    configuration: [],
    client: [],
    totalAmout: ''
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

    axios
      .get('api/products')
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get('api/configurations')
      .then(response => {
        this.setState({ configuration: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  calculatePrice(product) {
    const price =
      product.cost *
      (1 +
        (this.state.configuration[0].financeRate *
          this.state.configuration[0].timeLimit) /
          100);
    return price;
  }
  SumAmount(product) {
    var sum = 0,
      arr = this.productsSelected.amount;
    for (var i = arr.length; !!i--; ) {
      sum += arr[i];
    }
  }
  calculateAmount(product) {
    const amount = product.price * product.quantity;
    return amount;
  }

  handleChangeProducts(e) {
    const product = JSON.parse(e);
    if (product.stock <= 0) {
      alert(
        'El artículo seleccionado no cuenta con existencia, favor de verificar'
      );
    }
    product.price = this.calculatePrice(product);
    this.setState({
      productsSelected: [...this.state.productsSelected, product]
    });
  }

  handleChangeClients(e) {
    const client = JSON.parse(e);
    this.setState({ client: client });
  }
  deleteProduct = (index, e) => {
    const products = Object.assign([], this.state.productsSelected);
    products.splice(index, 1);
    this.setState({ productsSelected: products });
  };

  handleChangeQuantity = (index, e) => {
    const products = Object.assign([], this.state.productsSelected);
    if (e > products[index].stock) {
      return alert(
        `Lo sentimos, sólo tenemos ${products[index].stock} en stock`
      );
    }
    products[index].quantity = e;
    products[index].amount = this.calculateAmount(products[index]);
    this.setState({ productsSelected: products });
  };

  render() {
    const { client } = this.state;
    const { products } = this.state;
    const { clients } = this.state;

    return (
      <Fragment>
        <h1 className='large text-primary'>Registro de Ventas</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Cliente:
            <select onChange={e => this.handleChangeClients(e.target.value)}>
              {clients.map(client => {
                return (
                  <option value={JSON.stringify(client)}>
                    {client.name.concat(
                      ' ',
                      client.apellidoPaterno,
                      ' ',
                      client.apellidoMaterno
                    )}
                  </option>
                );
              })}
            </select>
          </label>
          <label>{'RFC' + ' ' + client.RFC} </label>
          <p>
            <label>
              Producto:
              <select onChange={e => this.handleChangeProducts(e.target.value)}>
                {products.map(product => {
                  return (
                    <option value={JSON.stringify(product)}>
                      {product.description}
                    </option>
                  );
                })}
              </select>
            </label>
          </p>
        </form>
        <table className='table striped'>
          <thead>
            <tr>
              <th>Descripción de Articulo</th>
              <th>Modelo</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productsSelected.map((product, index) => {
              return (
                <Product
                  delEvent={this.deleteProduct.bind(this, index)}
                  changeQuantity={e =>
                    this.handleChangeQuantity(index, e.target.value)
                  }
                  product={product}
                />
              );
            })}
            <br></br>
            <br></br>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Enganche</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Bonificacion Enganche</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Sales;
