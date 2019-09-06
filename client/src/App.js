import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import ProductForm from './components/products/ProductForm';
import ProductList from './components/products/ProductList';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/productos/form' component={ProductForm} />
          <Route exact path='/productos' component={ProductList} />
          <Route exact path='/clientes/form' component={ClientForm} />
          <Route exact path='/clientes' component={ClientList} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
