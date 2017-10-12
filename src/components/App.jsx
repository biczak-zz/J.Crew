import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
import Home from './Home';
import NewArrivals from './NewArrivals';
import Products from './Products';
import Product from './Product';
import { Image } from 'semantic-ui-react';
import '../css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      gender: '',
    }
    
  }
  componentDidMount() {
    axios.get('/data/v1/US/navigation')
      .then((res) => {
        this.setState({
          categories: res.data.nav[0].navGroups[0].navItems,
        });
      })
      .catch((err) => {
        console.error(`API Error: ${err}. (Home.jsx - 23)`);
      });
  }

  render() {
    const history = createHistory();

    return (
      <div id="app-container">
        <div id="header-container">
        <a href="/">
          <Image src="https://upload.wikimedia.org/wikipedia/en/4/4f/Logo_of_J.Crew.png" alt="Home" id="header-logo" />
        </a>
        </div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={(props) => ( <Home categories={this.state.categories} /> )} />
            <Route exact path="/newArrivals/:category" render={(props) => ( <NewArrivals gender={this.state.gender} productList={this.state.products} />)} />
            <Route exact path="/newArrivals/:category/:list" render={(props) => (<Products updateMe={this.updateState} productList={this.state.products} />)} />
            <Route exact path="/newArrivals/:category/:list/:item" render={(props) => (<Product productList={this.state.products} />)} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;