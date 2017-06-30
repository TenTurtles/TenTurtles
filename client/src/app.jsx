import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Button, Grid } from 'react-bootstrap';
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
        finalWines: []
      }
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
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
        <Upload setPairings={this.setPairings.bind(this)} preferences={this.state.prefer}/>
        <Drop handlePreferences={this.handlePref.bind(this)}/>
        <hr />
        <form style={styles.form}>
          <FormControl style={styles.inputBox} bsSize="large" type="text" placeholder="Search here" onChange={this.handleChange} />
          <Button style={styles.inputBox} type="submit" bsSize="large" onClick={this.search}>Submit</Button>
        </form>
        <PairingList pairs={this.state.pairs} />
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
    padding: '10px'
  },
  inputBox: {
    fontSize: '35px',
    marginTop: '10px',
    display: 'inline-block',
    width: '100%',
    height: '75px'

  }
};

ReactDOM.render(<App />, document.getElementById('app'));