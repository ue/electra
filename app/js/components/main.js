import React from 'react';

import AccountList from '../containers/account-list';
import ElcectraAppBar from '../containers/electra-appbar';

import Paper from 'material-ui/lib/paper';
import darkBaseTheme from 'material-ui/lib/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import SplashAnimation from '../containers/splashAnimation';

const styles = {
    textAlign: 'center'
};

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      splashAnimation: true,
      isDark: localStorage.getItem('darkTheme'),
    }
  }

  componentWillMount() {
    setTimeout(function() {
      this.setState({splashAnimation: false});
    }.bind(this), 0);

    this.setState({
      isDark: localStorage.getItem('darkTheme')
    });
    console.log(localStorage.getItem('darkTheme'));
    console.log(this.state.isDark);
  }
  
  render() {
    if(this.state.splashAnimation){
      return (
        <SplashAnimation/>
      ); 
    } else{
      return (
        <div style={styles}>
          <MuiThemeProvider muiTheme={ getMuiTheme(this.state.isDark === true ? darkBaseTheme : null) }>
            <Paper zDepth={2}>
              <ElcectraAppBar />
              <AccountList />
            </Paper>
          </MuiThemeProvider>
        </div>
      ); 
    }
  }
}
//darkBaseTheme

