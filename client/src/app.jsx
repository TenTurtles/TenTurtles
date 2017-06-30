import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Button, Grid, Row, Col, Image } from 'react-bootstrap';
import $ from 'jquery';
import Drop from './components/nav.jsx';
import Upload from './components/upload.jsx';
import PairingList from './components/pairingList.jsx';
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
      }
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
    console.log('click');
    let passPref = prefHelper.preferences(this.state.prefer);
    console.log('passPref', passPref);
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {
        item: this.state.item,
        choices: passPref || null
      },
      success: data => {
        console.log('success', data);
        this.setPairings(data);
      }
    });
  }

  setPairings(data) {
    this.setState({
      pairs: data
    });
  }

  handlePref(childState) {
    console.log('working appjsx');
    this.setState({
      prefer: childState
    });
  }

  render() {
    return (
      <Grid style={styles.container}>
        <h1 style={styles.h1}>PAIRED</h1>
        <Row>
          <Col xs={2}>
            <Upload setPairings={this.setPairings.bind(this)} preferences={this.state.prefer}/>
          </Col>
          <Col xs={10}>
            <Drop handlePreferences={this.handlePref.bind(this)}/>
          </Col>
        </Row>

        <br />

        <Row>
          <form style={styles.form}>
            <Col xs={10}>
              <FormControl style={styles.inputBox} bsSize="large" type="text" placeholder="Search here" onChange={this.handleChange} />
            </Col>
            <Col xs={2}>
              <input src="http://www.clker.com/cliparts/Y/x/X/j/U/f/search-button-without-text-hi.png" style={styles.inputBtn} type="image" onClick={this.search}></input>
            </Col>
          </form>
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
    fontSize: '55px',
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
    marginRight: '10px',
    width: '100%',
    height: '75px'
  },
  inputBtn: {
    marginLeft: '22px',
    width: '75px',
    height: '75px'
  }
};

ReactDOM.render(<App />, document.getElementById('app'));