import React from 'react';
import { Grid, Row, Col, Image, Modal, Button, ListGroup, ListGroupItem, Accordion, Panel } from 'react-bootstrap';

import $ from 'jquery';

class pairingListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showModal: false,
      favorite: false
    };
  }

  getInitialState() {
    return {
      showModal: false
    };
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  favorite(pairing) {
    let that = this;
    console.log(that.state.favorite);
    $.ajax({
      url: '/favorite',
      method: 'POST',
      data: {
        pair: pairing,
        favorite: that.state.favorite
      },
      success: (result) => {
        console.log('result', result);
        that.setState({
          favorite: !that.state.favorite
        });
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }

  render() {
    return (
      <Accordion>
        <Panel header={
          <Grid style={styles.container}>
            <Row onClick={this.open.bind(this)}>
              <Col xs={5}>
                <Image style={styles.thumbnail} src={this.props.pair[0].image} rounded />
              </Col>
              <Col xs={7}>
                <Row style={styles.recipeName}>
                  <p>{this.props.pair[0].label}</p>
                </Row>
                <Row style={styles.drinkName}>
                  {this.props.pair[1][0].name}
                </Row>
              </Col>
            </Row>
          </Grid>
        } eventKey="1">
          <Grid style={styles.container}>
            <h2 style={styles.h2} ><a href={this.props.pair[0].url}>{this.props.pair[0].label}</a></h2>
            <button style={this.state.favorite ? styles.favorite : styles.unfavorite} onClick={this.favorite.bind(this, this.props.pair)}> Favorite </button>
            <Row>
              <Col xs={12}>
                <ListGroup style={styles.listGroup}>
                  {
                    this.props.pair[0].ingredients.map((ingredient, i) => {
                      return <p key={i} >{ingredient.text}</p>
                    })
                  }
                  <hr />
                  <p style={styles.italics}>recipe by {this.props.pair[0].source}</p>
                </ListGroup>
              </Col>
            </Row>

            <hr />

            <h2><a href={this.props.pair[1][0].url}>{this.props.pair[1][0].name}</a></h2>

            <Row>
              <Col xs={3}>
                <Image style={styles.block} src={this.props.pair[1][0].labelUrl} rounded />
                <a href="http://www.wine.com/" title="Wine.com the destination for Wine and Wine Gifts">
                  <img src="http://cache.wine.com/images/logos/80x20_winecom_logo.png" alt="Wine.com the destination for Wine and Wine Gifts" />
                </a>
              </Col>
              <Col xs={9}>
                <ListGroup style={styles.listGroup}>
                  <p><span style={styles.bold}>Varietal: </span>{this.props.pair[1][0].type}</p>
                  <p><span style={styles.bold}>Region: </span>{this.props.pair[1][0].region}</p>
                  <p><span style={styles.bold}>Rating: </span>{this.props.pair[1][0].rating}</p>
                  <p><span style={styles.bold}>Price: </span>${this.props.pair[1][0].price}</p>
                </ListGroup>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </Accordion>
    );
  }
}

export default pairingListEntry;

let styles = {
  container: {
    width: '100%',
    padding: '10px'
  },
  bottomBorder: {
    bottomBorder: '1px solid black'
  },
  listGroup: {
    verticalAlign: 'center',
    fontSize: '25px',
    marginRight: '10px',
    padding: '5px',
    border: '1px dashed black'
  },
  recipeName: {
    fontWeight: 'bold',
    fontSize: '36px'
  },
  drinkName: {
    fontStyle: 'italics',
    fontSize: '36px'
  },
  thumbnail: {
    height: '200px',
    width: 'auto'
  },
  image: {
    height: '135px',
    width: 'auto'
  },
  block: {
    display: 'block'
  },
  bold: {
    fontWeight: 'bold'
  },
  italics: {
    fontStyle: 'italic'
  },
  smallFont: {
    fontSize: '10px'
  },
  favorite: {
    backgroundColor: '#ff0000',
    float: 'right',
    color: 'white'
  },
  unfavorite: {
    backgroundColor: '#c4c3c2',
    float: 'right'
  },
  h2: {
    float: 'left'
  }
};