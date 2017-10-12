import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Image, Menu, Button, Divider, Container } from 'semantic-ui-react';
import '../css/product.css';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemInfo: undefined,
      activeItem: '',
    }
    this.handleItemClick = this.handleItemClick.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
  }
  
  componentDidMount() {
    const itemCode = window.location.pathname.split("/:")[3];
    axios.get(`/data/v1/US/products/${itemCode}`)
      .then((data) => {
        this.setState({
          itemInfo: data.data,
        });
      })
      .catch((err) => {
        console.error(`Axios Product Error: ${err} - (Product.jsx - 23)`);
      });
  }
  handleItemClick(e) {
    let url = window.location.pathname.split("/:");
    url.splice(3, 1);
    window.location.pathname = `${url[0]}/:${url[1]}/:${url[2]}/:${e.target.id}`
  }
  setActiveItem() {
    if (this.state.itemInfo) {
      if (this.state.itemInfo.productName.split(" ")[0] === "Petite") {
        this.setState({
          activeItem: "Petite",
        });
      } else if (this.state.itemInfo.productName.split(" ")[0] === "Tall") {
        this.setState({
          activeItem: "Tall",
        });
      } else {
        this.setState({
          activeItem: "Regular",
        });
      } 
  }
}
  render() {
    let itemName;
    const itemCodes = {};
    let itemPrice;
    let itemVariations;
    let sizeButtons;
    let itemDetails;
    if (this.state.itemInfo) {
      itemName = this.state.itemInfo.productName;
      itemCodes.productCode = this.state.itemInfo.baseProductCode || this.state.itemInfo.productCode;
      itemCodes.defaultColorCode = this.state.itemInfo.baseProductColorCode || this.state.itemInfo.defaultColorCode;
      itemPrice = this.state.itemInfo.listPrice.formatted;
      itemDetails = this.state.itemInfo.productDescriptionRomance;
      if (this.state.itemInfo.variations) {
        itemVariations = this.state.itemInfo.variations.map((variation) => {
          return (
            <Menu.Item name={variation.name} id={variation.productCode} onClick={this.handleItemClick} />
          )
        });
      }
      if (this.state.itemInfo.sizesList) {
        sizeButtons = this.state.itemInfo.sizesList.map((size) => {
          return (
            <Button>{size}</Button>
          )
        })
      }
    } else {
      itemName = 'Loading...'
      itemCodes.productCode = 'Loading';
      itemCodes.defaultColorCode = 'Loading...';
      itemPrice = "Loading...";
      itemVariations = <Menu.Item name="Loading..." onClick={this.handleItemClick} />
    }

    return (
      <div id="product-card-container">
        <Grid columns={3} centered id="product-grid">
          <Grid.Row id="product-row-header">
            J.CREW / {window.location.pathname.split("/:")[1].toUpperCase()} / NEW ARRIVALS
          </Grid.Row>
          <Grid.Row id="product-row-itemName">
            <Container fluid textAlign="center">
              {itemName}
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Image src={`https://i.s-jcrew.com/is/image/jcrew/${itemCodes.productCode}_${itemCodes.defaultColorCode}`} />
          </Grid.Row>
          <Menu pointing secondary>
            {itemVariations}
          </Menu>
          <Grid.Row>
            {itemPrice}
            <Divider />
          </Grid.Row>
          <Grid.Row id="product-button-row">
            <Button.Group id="product-button-group">
              {sizeButtons}
            </Button.Group>
            <Divider />
          </Grid.Row>
          <Grid.Row>
            <Divider />
            <span id="product-details-header">Product Details</span>
            <br />
            <br />
            <Container fluid text textAlign="center">
              {itemDetails}
            </Container>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Product;
