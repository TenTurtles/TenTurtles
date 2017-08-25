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
import Background from '../dist/433ce5036a9f794f22d48bccd2208b0d.jpg';

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
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percent: 10 })} }.bind(this), 500);
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percent: 25 })} }.bind(this), 1000);
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percent: 40 })} }.bind(this), 1500);
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percent: 60 })} }.bind(this), 2000);
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percent: 80 })} }.bind(this), 3000);
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
          console.log('images: ', data);
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
        <section style={ sectionStyle }>

          <h1 style={styles.h1}>Paired</h1>
          <Row>
              <Col xs={2}>
                <Upload setPairings={this.setPairings.bind(this)} preferences={this.state.prefer} changePercentage={this.changePercentage} />
              </Col>
              <form style={styles.form}>
              <Col xs={9}>
                <FormControl style={styles.inputBox} bsSize="large" type="text" placeholder="Search here" onChange={this.handleChange} />
              </Col>
              <Col xs={1}>
                <input src="https://meraki.cisco.com/blog/wp-content/themes/shire/images/search-icon.png" style={styles.inputBtn} type="image" onClick={this.search}></input>
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
              <PairingList pairs={this.state.pairs} style={styles.card} />
            </Col>
          </Row>
        </section>
      </Grid>
    );
  }
}

var sectionStyle = {
  width: "100%",
  height: "100%",
};

let styles = {
  h1: {
    fontSize: '85px',
    textAlign: 'center',
    color: 'rgba(215, 217, 221, .85)',
    fontFamily: 'Apple Chancery',
    fontWeight: 'bold'
  },
  container: {
    backgroundImage: `url(${Background})`,
    width: '100%',
    padding: '75px',
  },
  card : {
    backgroundColor: 'rgba(215, 217, 221, .85)'
  },
  form: {
  },
  inputBox: {
    fontSize: '35px',
    marginLeft: '-35px',
    width: '100%',
    height: '75px',
    backgroundColor: 'rgba(215, 217, 221, .85)'
  },
  inputBtn: {
    marginLeft: '-30px',
    width: '75px',
    height: '75px'
  }
};

ReactDOM.render(<App />, document.getElementById('app'));