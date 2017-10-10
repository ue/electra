import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addAccountName, addAccountPassword, deleteAccount, completeAccount} from '../actions/index';
import uuid from 'node-uuid';

// List
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

// Input field
import TextField from 'material-ui/lib/text-field';


const styles = {
    height: 500,
    overflowY: 'auto'
}

const ACCOUNT_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: account => !account.completed,
  SHOW_COMPLETED: account => account.completed
}

class AccountList extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      filter: ACCOUNT_FILTERS.SHOW_ALL,
      disabled: false,
      inputIsDisable: true,
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    /*
    * this.value = this.value.bind(this);
    * this.state = { value: '' };
    */
  }
  
  componentWillReceiveProps(nextProps) {
    localStorage.setItem('accounts', JSON.stringify(nextProps.accountItems));
  }

  handleClick(e) {
    e.preventDefault();
    // Dispatch props
    this.props.addAccountName({accountItem: e.target.value, id: uuid.v4()});
  }

  /* when click on lock button inputs gone be unlock and than 
   * if input already is disable it`s gonna be enable some thing like this
  */
  handleClickedLock(e) {
    if(this.state.inputIsDisable) {
      this.setState({ inputIsDisable: false });
    } else {
      this.setState({ inputIsDisable: true });    
    }
  }
  
  handleDelete(id) {
    this.props.deleteAccount(id);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({ inputIsDisable: true });
      console.log('do validate:  ' + e.target.value);
    }
  }

  handleMouseLeave(val) {
    console.log("yo!!! bthcez" + val.target.value)
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleDoubleClick(event) {
    if(this.state.inputIsDisable) {
      this.setState({ inputIsDisable: false });
      console.log("handle double click");
    }
  }

  renderList() {
    if (this.props.accountItems) {
      let shownAccountList = this.props.accountItems.filter(this.state.filter);
      return shownAccountList.map((item) => {
          return(
            <div key={item.id}>
                <TextField 
                  hintText="Email" 
                  onMouseOut={ this.handleMouseLeave.bind(this) } 
                  onKeyPress={ this.handleKeyPress }
                  value={ item.accountItem }
                  onChange={ this.handleChange }
                  disabled = { this.state.inputIsDisable }
                  onDoubleClick = { this.handleDoubleClick }
                />
                <TextField 
                  hintText="Password" 
                  onKeyPress={ this.handleKeyPress }
                  value={item.password}
                  disabled = { this.state.inputIsDisable }
                />
                <IconButton onTouchTap={() => this.handleDelete(item.id)} >
                  <NavigationClose />
                </IconButton>
                <Divider />
            </div>
          );
      });
    }
  }

  render() {
    return (
      <div>
        <Tabs>
          <Tab
            icon={<FontIcon className="material-icons">assignment</FontIcon>}
            onActive={ () => {
              this.setState({filter: ACCOUNT_FILTERS.SHOW_ALL});}
            }
          />
          <Tab
            icon={<FontIcon className="material-icons">alarm</FontIcon>}
            onActive={() => {
              this.setState({filter: ACCOUNT_FILTERS.SHOW_ACTIVE});}
          }
          />
          <Tab
            icon={<FontIcon className="material-icons">delete</FontIcon>}
            onActive={ () => {
              this.setState({filter: ACCOUNT_FILTERS.SHOW_COMPLETED});} 
          }
          />
        </Tabs>
        <FloatingActionButton mini="true" className="addButton" onClick={this.handleClick.bind(this)}>
          <i className="material-icons" style={{color: 'white'}}>add</i>
        </FloatingActionButton>
        <FloatingActionButton mini="true" className="lockButton" onClick={this.handleClickedLock.bind(this)}>
          {
            this.state.inputIsDisable
              ? <FontIcon className="material-icons">lock_outline</FontIcon>
              : <FontIcon className="material-icons">lock_open</FontIcon>
          }
        </FloatingActionButton>
        <Divider />
        <List style={styles}>
          {
            this.renderList()
          }
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountItems: state.accountItems,
    Password: state.password
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addAccountName,
    addAccountPassword,
    deleteAccount,
    completeAccount
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);