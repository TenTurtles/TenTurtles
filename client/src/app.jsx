import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Button, Grid, Row, Col, Image, Carousel } from 'react-bootstrap';
import $ from 'jquery';
import Drop from './components/nav.jsx';
import Upload from './components/upload.jsx';
import PairingList from './components/pairingList.jsx';
import ImageCarousel from './components/imageCarousel.jsx';
const prefHelper = require('../../server/preferenceRefactor');


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
      images: []
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      item: event.target.value
    });
  }

  search(e) {
    e.preventDefault();
    let passPref = prefHelper.preferences(this.state.prefer);
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {
        item: this.state.item,
        choices: passPref || null
      },
      success: data => {
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
        <h1 style={styles.h1}>🍷🍅🍉🍊🍌🍍🍺🍲🍦</h1>
        <Row>
            <Col xs={2}>
              <Upload setPairings={this.setPairings.bind(this)} preferences={this.state.prefer}/>
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