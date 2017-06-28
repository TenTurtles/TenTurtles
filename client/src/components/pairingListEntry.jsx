import React from 'react';
import { Grid, Panel, Row, Col, Image } from 'react-bootstrap';

class pairingListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  render() {
    return (
      <Grid>
        <Row onClick={ () => this.setState({ open: !this.state.open}) }>
          <Col xs={6} md={4}>
            <Image src={this.props.pair[0].image} rounded />
          </Col>
          <Col xs={6} md={4}>
            <Row>
              <Col xs={6} md={4}>
                {this.props.pair[0].label}
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                {this.props.pair[1][0].name}
              </Col>
            </Row>
          </Col>
        </Row>
        <Panel collapsible expanded={this.state.open}>
          <ul>
            <li>info here</li>
          </ul>
        </Panel>
      </Grid>
    )
  }
}

export default pairingListEntry;

let styles = {
  container: {
    width: '500px',
    padding: '25px'
  },
}