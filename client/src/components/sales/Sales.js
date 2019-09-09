import React, { Fragment, useState, Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from './Product';

class Sales extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    clients: [],
    products: [],
    productsSelected: [],
    configuration: [],
    client: '',
    calculations: [],
    totalSelected: ''
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

  handleSubmit = async e => {
    e.preventDefault();
    var body = {
      clientId: this.state.client._id,
      clientName: this.state.client.name,
      total: this.state.totalSelected
    };

    await axios.post('/api/sales', body);
  };

  handleReset = e => {
    e.preventDefault();
    var r = window.confirm('¿Seguro que quieres cancelar?');
    if (r) {
      return this.props.history.push('/ventas');
    }
  };

  calculateDebt(totalAmount) {
    var calculations = Object.assign([], this.state.calculations);
    calculations.deposit = +(
      (this.state.configuration[0].deposit / 100) *
      totalAmount
    ).toFixed(2);
    calculations.depositBonus = +(
      calculations.deposit *
      ((this.state.configuration[0].financeRate *
        this.state.configuration[0].timeLimit) /
        100)
    ).toFixed(2);
    calculations.totalDebt = +(
      totalAmount -
      calculations.deposit -
      calculations.depositBonus
    ).toFixed(2);
    calculations.cashPrice = (
      calculations.totalDebt /
      (1 +
        (this.state.configuration[0].financeRate *
          this.state.configuration[0].timeLimit) /
          100)
    ).toFixed(2);
    calculations.timelimit3 = +(
      calculations.cashPrice *
      (1 + (this.state.configuration[0].financeRate * 3) / 100)
    ).toFixed(2);
    calculations.timelimit6 = +(
      calculations.cashPrice *
      (1 + (this.state.configuration[0].financeRate * 6) / 100)
    ).toFixed(2);
    calculations.timelimit9 = +(
      calculations.cashPrice *
      (1 + (this.state.configuration[0].financeRate * 9) / 100)
    ).toFixed(2);
    calculations.timelimit12 = +(
      calculations.cashPrice *
      (1 + (this.state.configuration[0].financeRate * 12) / 100)
    ).toFixed(2);
    calculations.bonds3 = +(calculations.timelimit3 / 3).toFixed(2);
    calculations.bonds6 = +(calculations.timelimit3 / 6).toFixed(2);
    calculations.bonds9 = +(calculations.timelimit3 / 9).toFixed(2);
    calculations.bonds12 = +(calculations.timelimit3 / 12).toFixed(2);
    calculations.savings3 = +(
      calculations.totalDebt - calculations.timelimit3
    ).toFixed(2);
    calculations.savings6 = +(
      calculations.totalDebt - calculations.timelimit6
    ).toFixed(2);
    calculations.savings9 = +(
      calculations.totalDebt - calculations.timelimit9
    ).toFixed(2);
    calculations.savings12 = +(
      calculations.totalDebt - calculations.timelimit12
    ).toFixed(2);

    this.setState({ calculations: calculations });
  }

  calculatePrice(product) {
    const price =
      product.cost *
      (1 +
        (this.state.configuration[0].financeRate *
          this.state.configuration[0].timeLimit) /
          100);

    return +price.toFixed(2);
  }

  calculateTotalAmount() {
    const products = Object.assign([], this.state.productsSelected);
    var totalAmount = products.reduce(function(prev, cur) {
      return prev + cur.amount;
    }, 0);
    this.calculateDebt(+totalAmount.toFixed(2));
  }

  calculateAmount(product) {
    const amount = product.price * product.quantity;
    return +amount.toFixed(2);
  }
  handleChangeRadio(e) {
    this.setState({ totalSelected: e });
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
    this.calculateTotalAmount();
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
    this.calculateTotalAmount();
  };

  render() {
    const { client } = this.state;
    const { products } = this.state;
    const { clients } = this.state;

    return (
      <Fragment>
        <h1 className='large text-primary'>Registro de Ventas</h1>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <label>
            Cliente:
            <select
              required
              onChange={e => this.handleChangeClients(e.target.value)}
            >
              <option disabled value='' selected hidden>
                Selecciona un usuario
              </option>
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
          <label>RFC </label>
          <label>{client.RFC} </label>
          <p>
            <label>
              Producto:
              <select onChange={e => this.handleChangeProducts(e.target.value)}>
                <option disabled value='' selected hidden>
                  Selecciona un articulo
                </option>
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
                <td>{this.state.calculations.deposit}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Bonificacion Enganche</td>
                <td>{this.state.calculations.depositBonus}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>{this.state.calculations.totalDebt}</td>
              </tr>
            </tbody>
          </table>
          <table className='table striped'>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>ABONOS MENSUALES</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3 ABONOS DE</td>
                <td>{this.state.calculations.bonds3}</td>
                <td>
                  TOTAL A PAGAR
                  <legend>{this.state.calculations.timelimit3}</legend>
                </td>

                <td>
                  SE AHORRA<legend>{this.state.calculations.savings3}</legend>
                </td>
                <td>
                  <input
                    type='radio'
                    name='radio'
                    value={this.state.calculations.timelimit3}
                    onChange={e => this.handleChangeRadio(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>6 ABONOS DE</td>
                <td>{this.state.calculations.bonds6}</td>
                <td>
                  TOTAL A PAGAR
                  <legend>{this.state.calculations.timelimit6}</legend>
                  <td></td>
                </td>
                <td>
                  SE AHORRA<legend>{this.state.calculations.savings6}</legend>
                </td>
                <td>
                  <input
                    type='radio'
                    name='radio'
                    value={this.state.calculations.timelimit6}
                    onChange={e => this.handleChangeRadio(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>9 ABONOS DE</td>
                <td>{this.state.calculations.bonds9}</td>
                <td>
                  TOTAL A PAGAR
                  <legend>{this.state.calculations.timelimit9}</legend>
                </td>
                <td>
                  SE AHORRA<legend>{this.state.calculations.savings9}</legend>
                </td>
                <td>
                  <input
                    type='radio'
                    name='radio'
                    value={this.state.calculations.timelimit9}
                    onChange={e => this.handleChangeRadio(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>12 ABONOS DE</td>
                <td>{this.state.calculations.bonds12}</td>
                <td>
                  TOTAL A PAGAR
                  <legend>{this.state.calculations.timelimit12}</legend>
                </td>
                <td>
                  SE AHORRA<legend>{this.state.calculations.savings12}</legend>
                </td>
                <td>
                  <input
                    type='radio'
                    name='radio'
                    value={this.state.calculations.timelimit12}
                    onChange={e => this.handleChangeRadio(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type='submit' className='btn btn-primary' value='Guardar' />
          <input type='reset' className='btn btn-primary' value='Cancelar' />
        </form>
      </Fragment>
    );
  }
}

export default Sales;
