import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Button, Grid, Row, Col, Image, Carousel } from 'react-bootstrap';
import $ from 'jquery';
import Drop from './components/nav.jsx';
import Upload from './components/upload.jsx';
import PairingList from './components/pairingList.jsx';
import ImageCarousel from './components/imageCarousel.jsx';
import { Line, Circle } from 'rc-progress';
const helpers = require('../../server/helpers');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      prefer: '',
      pairs: {
        finalRecipes: [],
        finalWines: [],
        finalBeers: []
      },
      images: [],
      percent: 0
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePercentage = this.changePercentage.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      item: event.target.value
    });
  }

  changePercentage(percentage) {
    this.setState({ percent: percentage });
  }

  search(e) {
    e.preventDefault();
    let passPref = helpers.preferences(this.state.prefer);
    this.setState({ percent: 10 })
    setTimeout(function(){ this.setState({ percent: 10 }) }.bind(this), 600);
    setTimeout(function(){ this.setState({ percent: 25 }) }.bind(this), 900);
    setTimeout(function(){ this.setState({ percent: 40 }) }.bind(this), 1200);
    setTimeout(function(){ this.setState({ percent: 60 }) }.bind(this), 1500);
    setTimeout(function(){ this.setState({ percent: 80 }) }.bind(this), 1800);
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {
        item: this.state.item,
        choices: passPref || null
      },
      success: data => {
        this.setState({ percent: 100 })
        this.setPairings(data);
      }
    });
  }

  componentDidMount() {
      $.ajax({
        url: '/images',
        method: 'GET',
        success: data => {
          this.setState({
            images: data
          });
        }
      })
  }

  setPairings(data) {
    this.setState({
      pairs: data
    });
  }

  handlePref(childState) {
    this.setState({
      prefer: childState
    });
  }

  render() {
    return (
      <Grid style={styles.container}>
          <Line percent={this.state.percent} strokeWidth="2" strokeColor="#D3D3D3" />
          <h1 style={styles.h1}>🍷🍅🍉🍊🍌🍍🍺🍲🍦</h1>
          <Row>
              <Col xs={2}>
                <Upload setPairings={this.setPairings.bind(this)} preferences={this.state.prefer} changePercentage={this.changePercentage} />
              </Col>
              <form style={styles.form}>
              <Col xs={9}>
                <FormControl style={styles.inputBox} bsSize="large" type="text" placeholder="Search here" onChange={this.handleChange} />
              </Col>
              <Col xs={1}>
                <input src="http://www.clker.com/cliparts/Y/x/X/j/U/f/search-button-without-text-hi.png" style={styles.inputBtn} type="image" onClick={this.search}></input>
              </Col>
            </form>
          </Row>

          <br />

          <Row>
            <Col xs={12}>
              <Drop handlePreferences={this.handlePref.bind(this)}/>
            </Col>

          </Row>

          <hr />

          <Row>

            <ImageCarousel images={this.state.images} />

          </Row>

          <hr />

          <Row>
            <Col xs={12}>
              <PairingList pairs={this.state.pairs} />
            </Col>
          </Row>
      </Grid>
    )
  }
}

let styles = {
  h1: {
    fontSize: '85px',
    textAlign: 'center'
  },
  container: {
    width: '100%',
    padding: '10px',
  },
  form: {
  },
  inputBox: {
    fontSize: '35px',
    marginLeft: '-35px',
    width: '100%',
    height: '75px'
  },
  inputBtn: {
    marginLeft: '-30px',
    width: '75px',
    height: '75px'
  }
};

ReactDOM.render(<App />, document.getElementById('app'));