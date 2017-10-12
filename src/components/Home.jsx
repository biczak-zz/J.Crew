import React from 'react';
import { Grid, Card, Image } from 'semantic-ui-react';
import '../css/home.css';

const Home = ({ categories }) => {
  const categoryTile = categories.map((category) => {
    return (
      <Grid.Column id="grid-column">
        <a href={`/newArrivals/:${category.label.split(" ")[1]}`}>
          <Card centered fluid id="category-card">
            <Image src={`/assets/${category.label.split(" ")[1]}.png`} alt={category.label.split(" ")[1]} />
            <Card.Header>Shop {category.label}</Card.Header>
            
          </Card>
        </a>
      </Grid.Column>
    )
  });
  return (
    <div id="home-container">
      <Grid columns={4} divided centered verticalAlign="middle" id="category-grid">
        <Grid.Row id="category-row">
          {categoryTile}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Home;