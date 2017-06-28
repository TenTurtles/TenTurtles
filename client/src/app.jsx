import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Button, Grid } from 'react-bootstrap';
import $ from 'jquery';
import Drop from './components/nav.jsx';
import Upload from './components/upload.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      prefer: ''
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      item: event.target.value
    });
  }

  search() {
    console.log('click');
    let passPref = [];
    for (let key in this.state.prefer) {
      if (key !== 'open' && key !== 'preferences') {
        console.log('true or false', this.state.prefer[key]);
        if (this.state.prefer[key] === true) {
          passPref.push(key);
        }
      }
    }
    console.log('passPref', passPref);
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {
        item: this.state.item,
        choices: passPref
      },
      success: function(data) {
        console.log('success', data);
      }
    });
  }

  handlePref(childState) {
    console.log('working appjsx');
    this.setState({
      prefer: childState
    }, () => {console.log(this.state)});
  }

  render() {
    return (
      <Grid style={styles.container}>
        <h1 style={styles.h1}>App 4 Food</h1>
        <Drop handlePreferences={this.handlePref.bind(this)}/>
        <Upload />
        <form style={styles.form}>
          <FormControl style={styles.inputBox} bsSize="small" type="text" placeholder="Search here" onChange={this.handleChange} />
          <Button type="button" bsSize="small" onClick={this.search}>Submit</Button>
        </form>
      </Grid>
    )
  }
}

let styles = {
  h1: {
    textAlign: 'center'
  },
  container: {
    width: '500px',
    padding: '25px'
  },
  form: {
    padding: '10px'
  },
  inputBox: {
    marginRight: '15px',
    display: 'inline-block',
    width: '80%'
  }
};

ReactDOM.render(<App />, document.getElementById('app'));