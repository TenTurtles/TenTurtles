import React from 'react';
import { Button, Collapse, Well, Checkbox } from 'react-bootstrap';

class Drop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'Vegetarian': false,
      'Vegan': false,
      'Dairy-Free': false,
      'Egg-Free': false,
      'Peanut-Free': false,
      'Alcohol-Free': false,
      'Shellfish-Free': false,
      preferences: ['Vegetarian', 'Vegan', 'Dairy-Free', 'Egg-Free', 'Peanut-Free', 'Alcohol-Free', 'Shellfish-Free'],
      open: false

      // preferences: [
      // { preference: 'Vegetarian', marked: false }, 
      // { preference: 'Vegan', marked: false }, 
      // { preference: 'Dairy-Free', marked: false }, 
      // { preference: 'Egg-Free', marked: false }, 
      // { preference: 'Peanut-Free', marked: false }, 
      // { preference: 'Alcohol-Free', marked: false }, 
      // { preference: 'Shellfish-Free', marked: false }, ]
    };
  }

  markedPref(pref) {
    let selected = pref;
    console.log('checkbox click works', this.state[selected]);
    let obj = {};
    obj[selected] = !this.state[selected];
    this.setState(obj, () => {this.props.handlePreferences(this.state)});
    // console.log('props', this.props);
    // this.props.handlePreferences(this.state);
  }

  render() {
    return (
      <div>
        <Button style={styles.dropBox} onClick={ () => this.setState({ open: !this.state.open })}>
          preferences
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
            {this.state.preferences.map((pref, index) => {
              return (<Checkbox key={index} inline type="checkbox" onClick={() => this.markedPref(pref)}>{pref}</Checkbox>)
            })}
{/*            <Well>
              <Checkbox inline type="checkbox">Vegetarian</Checkbox>
              <Checkbox inline type="checkbox">Vegan</Checkbox>
              <Checkbox inline type="checkbox">Dairy-Free</Checkbox>
              <Checkbox inline type="checkbox">Egg-Free</Checkbox>
              <Checkbox inline type="checkbox">Peanut-Free</Checkbox>
              <Checkbox inline type="checkbox">Alcohol-Free</Checkbox>
              <Checkbox inline type="checkbox">Shellfish-Free</Checkbox>
            </Well>*/}
            </Well>
          </div>
        </Collapse>
      </div>
    )
  }
}

let styles = {
  dropBox: {
    padding: '6px 10px',
    fontSize: '12px'
  }
}

export default Drop;