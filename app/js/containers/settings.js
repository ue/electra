import React from 'react';

import Toggle from 'material-ui/lib/Toggle';

const styles = {
  height: 500
}

class Settings extends React.Component {
  constructor (props) {
    super(props);

    this.state = { 
      //default settings
      darkTheme: false
    };

    this.handleToggle = this.handleToggle.bind(this);
    
  }

  componentWillMount() {
    if(!localStorage.getItem('darkTheme')){
      localStorage.setItem('darkTheme', false);
    }
  }

  handleToggle(event) {
    localStorage.setItem('darkTheme', this.state.darkTheme);
    this.setState({darkTheme: !this.state.darkTheme}, () => {
      this.props.updateTheme(this.state.darkTheme);
    });
   }
  
  render() {
    return (
      <div className="settings" style={styles}>
       <Toggle
        label="Dark Theme"
        onToggle={
          this.handleToggle
        }
        defaultToggled={ true }
      />
      </div>
    );
  }
}

export default Settings;