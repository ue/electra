import React from 'react';

import AccountList from '../containers/account-list';
import ElcectraAppBar from '../containers/electra-appbar';

import Paper from 'material-ui/lib/paper';

import darkBaseTheme from 'material-ui/lib/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const styles = {
    textAlign: 'center'
};

export default class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Paper zDepth={2}>
            <ElcectraAppBar />
            <AccountList />
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}
//darkBaseTheme

