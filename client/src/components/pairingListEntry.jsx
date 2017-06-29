import React from 'react';
import { Grid, Row, Col, Image, Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class pairingListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showModal: false
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

  render() {
    return (
      <Grid style={styles.container}>
        <Row onClick={this.open.bind(this)}>
          <Col xs={8}>
            <Image style={styles.image} src={this.props.pair[0].image} rounded />
          </Col>
          <Col xs={4}>
            <Row style={styles.bold}>

                <h3>{this.props.pair[0].label}</h3>
            </Row>
            <Row style={styles.italics}>
                {this.props.pair[1][0].name}
            </Row>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title><a href={this.props.pair[0].url}>{this.props.pair[0].label}</a></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid >
              <Row>
                <Col xs={3}>
                  <Image style={styles.image} src={this.props.pair[0].image} rounded />
                </Col>
                <Col xs={3}>
                  <ListGroup>
                    {
                      this.props.pair[0].ingredients.map((ingredient, i) => {
                        return <ListGroupItem style={styles.smallFont} key={i} >{ingredient.text}</ListGroupItem>
                      })
                    }
                  </ListGroup>
                </Col>
              </Row>
            </Grid>

            <hr />

            <h4><a href={this.props.pair[1][0].url}>{this.props.pair[1][0].name}</a></h4>
            <Grid>
              <Row>
                <Col xs={3}>
                  <Image style={styles.block} src={this.props.pair[1][0].labelUrl} rounded />
                  <a href="http://www.wine.com/" title="Wine.com the destination for Wine and Wine Gifts">
                    <img src="http://cache.wine.com/images/logos/80x20_winecom_logo.png" alt="Wine.com the destination for Wine and Wine Gifts" />
                  </a>
                </Col>
                <Col xs={3}>
                  <ListGroup style={styles.smallFont}>
                    <ListGroupItem><span style={styles.bold}>Varietal: </span>{this.props.pair[1][0].type}</ListGroupItem>
                    <ListGroupItem><span style={styles.bold}>Region: </span>{this.props.pair[1][0].region}</ListGroupItem>
                    <ListGroupItem><span style={styles.bold}>Rating: </span>{this.props.pair[1][0].rating}</ListGroupItem>
                    <ListGroupItem><span style={styles.bold}>Price: </span>${this.props.pair[1][0].price}</ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </Grid>


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Grid>
    )
  }
}

export default pairingListEntry;

let styles = {
  container: {
    width: '650px',
    padding: '25px'
  },
  image: {
    height: '200px',
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
  }
}
