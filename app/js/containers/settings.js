import React from 'react';

import Toggle from 'material-ui/lib/Toggle';

const styles = {
  height: 500
}

class Settings extends React.Component {
  constructor (props) {
    super(props);
    //default settings
    this.state = { 
      darkTheme: false,
      isToggled: localStorage.getItem('darkTheme')
    };

    this.handleDelete = this.handleDelete.bind(this);
    
  }

  handleDelete(event) {
    localStorage.setItem('darkTheme', !this.state.darkTheme);
    this.setState({darkTheme: !this.state.darkTheme});
  }
  
  render() {
    return (
      <div className="settings" style={styles}>
       <Toggle
        label="Dark Theme"
        onToggle={
          this.handleDelete
        }
        defaultToggled={ this.state.isToggled }
      />
      </div>
    );
  }
}

export default Settings;

