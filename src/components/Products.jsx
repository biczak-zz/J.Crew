import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Card, Image } from 'semantic-ui-react';
import '../css/products.css';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
    }
  }
  componentDidMount() {
    let e = window.location.pathname.split("/:")[1].toLowerCase();
    if (e === "men" || e === "women") {
      e += "s";
    }
    let productCategory = window.location.pathname.split("/:")[2].toLowerCase();
    while (productCategory.indexOf("%") !== -1) {
      productCategory = productCategory.split("");
      productCategory.splice(productCategory.indexOf("%"), 3, " ").join("");
      productCategory = productCategory.join("");
    }

    /* 
    Since the State does not persist after loading a new URL,
    we must make the same API call from NewArrivals.jsx again here.
    */

    axios.get(`/data/v1/US/enhance-category/c/${e}_feature/newarrivals`)
      .then((response) => {
        const myArray = [];
        // Account for spaces in the Category Name.
        productCategory = productCategory.split("%");
        response.data.productList.forEach((list) => {
          if (list.header === productCategory.toString()) {
            // Add All Products from Matching Category to the Array;
            myArray.push(list.products);
          }
        });
        this.setState({
          productList: myArray[0],
        });
      })
      .catch((err) => {
        console.error(`Axios Products Error: ${err} - (Products.jsx - 47)`);
      });
  }
  render() {
    const listMaker = this.state.productList.map((item) => {
      return (
        <Grid.Column id="products-column">
          <a href={window.location.pathname + `/:${item.productCode}`}>
            <Card centered fluid id="products-card">
              <Image src={`https://i.s-jcrew.com/is/image/jcrew/${item.productCode}_${item.defaultColorCode}`} alt={item.description} id="card-image"/>
              <Card.Header id="card-title">{item.productDescription}</Card.Header>
            </Card>
          </a>
        </Grid.Column>
      )
    })
    return (
      <div id="products-container">
        <Grid columns={4} divided centered verticalAlign="middle" id="products-grid">
          <Grid.Row id="products-row">
            {listMaker}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};

export default Products;
