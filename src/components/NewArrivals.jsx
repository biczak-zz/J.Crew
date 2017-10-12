import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Card, Image } from 'semantic-ui-react';
import '../css/newArrivals.css';

class NewArrivals extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    let e = window.location.pathname.split(":")[1].toLowerCase();
    // The API URL is Looking for "mens" and "womens"
    if (e.toString() === "men" || e.toString() === "women") {
      e += "s";
    }
    // Get the lists of products from the API, and store them in the State.
    axios.get(`/data/v1/US/enhance-category/c/${e}_feature/newarrivals`)
      .then((response) => {
        const myArray = [];
        response.data.productList.forEach((list) => {
          myArray.push(list);
        });
        this.setState({
          products: myArray,
        });
      })
      .catch((err) => {
        console.error(`Axios New Arrivals Error: ${err} - (NewArrivals.jsx - 32)`);
      });
  }
  render() {
    const listMaker = this.state.products.map((list) => {
      return (
        <Grid.Column id="newArrivals-column">
          <a href={window.location.pathname + `/:${list.header}`}>
            <Card centered fluid id="newArrivals-card">
            <Image src={`https://i.s-jcrew.com/is/image/jcrew/${list.products[0].productCode}_${list.products[0].defaultColorCode}`} alt={list.header} />
              <Card.Header id="card-title">{list.header}</Card.Header>
              
            </Card>
          </a>
        </Grid.Column> 
      )
    })
    return (
      <div id="newArrivals-container">
        <Grid columns={4} divided centered verticalAlign="middle" id="newArrivals-grid">
          <Grid.Row id="newArrivals-row">
            {listMaker}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};

export default NewArrivals;
