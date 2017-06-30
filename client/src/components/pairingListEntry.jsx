import React from 'react';
import { Grid, Row, Col, Image, Modal, Button, ListGroup, ListGroupItem, Accordion, Panel, Media} from 'react-bootstrap';

import $ from 'jquery';

class pairingListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      favorite: false
    };
  }

  favorite(pairing) {
    let that = this;
    $.ajax({
      url: '/favorite',
      method: 'POST',
      data: {
        pair: pairing,
        favorite: that.state.favorite
      },
      success: (result) => {
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
            <Row >
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
                <Row style={styles.drinkName}>
                  {this.props.pair[2][0].name}
                </Row>
              </Col>
            </Row>
          </Grid>
        } eventKey="1">
          <Grid style={styles.container}>
            <h2 style={styles.h2} ><a href={this.props.pair[0].url}>{this.props.pair[0].label}</a></h2>
            <Image src={this.state.favorite ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/2000px-Love_Heart_SVG.svg.png" : "http://www.smfpl.org/files/images/broken%20heart.png"} style={styles.favorite} onClick={this.favorite.bind(this, this.props.pair)}></Image>
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

            <h2 style={styles.h2Logo}><a href={this.props.pair[1][0].url}>{this.props.pair[1][0].name}</a></h2>
            {/*wine section*/}
            <Row>
              <Col xs={3} style={{height: '240px'}}>
                <Image style={styles.block} src={this.props.pair[1][0].labelUrl} rounded />
                <hr />
                <a href="http://www.wine.com/" title="Wine.com the destination for Wine and Wine Gifts">
                  <img style={styles.logo} src="http://cache.wine.com/images/logos/80x20_winecom_logo.png" alt="Wine.com the destination for Wine and Wine Gifts" />
                </a>
              </Col>
              <Col xs={9}>
                <ListGroup style={styles.listGroup}>
                  <p style={styles.p}><span style={styles.bold}>Varietal: </span>{this.props.pair[1][0].type}</p>
                  <p style={styles.p}><span style={styles.bold}>Region: </span>{this.props.pair[1][0].region}</p>
                  <p style={styles.p}><span style={styles.bold}>Rating: </span>{this.props.pair[1][0].rating}</p>
                  <p style={styles.p}><span style={styles.bold}>Price: </span>${this.props.pair[1][0].price}</p>
                </ListGroup>
              </Col>
            </Row>

            <hr />
            {/*beer section*/}
            <h2 style={styles.h2Logo}><a href={this.props.pair[2][0].url}>{this.props.pair[2][0].name}</a></h2>

            <Row>
              <Col xs={3} style={{height: '240px'}}>
                <Image style={styles.block} src={this.props.pair[2][0].image} rounded />
                <hr />
                <img style={styles.logo} src="http://s3.amazonaws.com/brewerydb/Powered-By-BreweryDB.png" alt="The BreweryDB API is owned by BreweryDB" />
              </Col>
              <Col xs={9}>
                <ListGroup style={styles.listGroup}>
                  <p style={styles.p}><span style={styles.bold}>Style: </span>{this.props.pair[2][0].style}</p>
                  <p style={styles.p}><span style={styles.bold}>Description: </span>{this.props.pair[2][0].description}</p>
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
  listGroup: {
    verticalAlign: 'center',
    fontSize: '24px',
    marginRight: '10px',
    padding: '30px',
    border: 'outset'
  },
  p: {
    fontSize: '24px',
    marginBottom: '13px'
  },
  recipeName: {
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '36px'
  },
  drinkName: {
    fontStyle: 'italic',
    fontSize: '26px'
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
    display: 'block',
    marginLeft: '30px',
    height: '125px',
    marginTop: '30px'
  },
  bold: {
    fontWeight: 'bold',
    fontSize: '24px'
  },
  italics: {
    fontStyle: 'italic'
  },
  smallFont: {
    fontSize: '10px'
  },
  h2: {
    float: 'left',
    padding: '0 30px 15px'
  },
  h2Logo: {
    fontSize: '30px',
    padding: '15px 0 15px 30px'
  },
  favorite: {
    float: 'right',
    height: '50px',
    width: '50px',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    fontSize: '35px',
    border: 'none'
  },
  logo: {
    height: '25px',
    marginLeft: '40px'
  }
};