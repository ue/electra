import React from 'react';

import AccountList from '../containers/account-list';
import ElcectraAppBar from '../containers/electra-appbar';

import Paper from 'material-ui/lib/paper';

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
        <Paper zDepth={2}>
          <ElcectraAppBar />
          <AccountList />
        </Paper>
      </div>
    );
  }
}

