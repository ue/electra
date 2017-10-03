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

    this.state = { filter: ACCOUNT_FILTERS.SHOW_ALL }

    this.handleDelete = this.handleDelete.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    localStorage.setItem('accounts', JSON.stringify(nextProps.accountItems));
  }

  // arti butonun tiklandiginda tetiklenen event e.target.value inputtaki degeri aliyor bos 
  //gondermek gerekiyor 
  handleClick(e) {
    e.preventDefault();
    // Dispatch props
    this.props.addAccountName({accountItem: "account name", id: uuid.v4(), completed: false});
    this.props.addAccountPassword({password: "sifre", id: uuid.v4(), completed: false});
  }

  handleClickedLock(e) {

  }
  
  handleDelete(id) {
    this.props.deleteAccount(id);
  }

  handleComplete(id) {
    this.props.completeAccount(id);
  }

  handleCompleteStyle(bool) {
    if(bool){
      return {color: "green", textDecoration: "line-through"};
    }
  }

    renderList() {
      if (this.props.accountItems != null) {
        let shownAccountList = this.props.accountItems.filter(this.state.filter);
        return shownAccountList.map((item) => {
            return(   
              <div key={item.id}>
                <ListItem
                  className="list-group-item"
                  style={this.handleCompleteStyle(item.completed)}
                  primaryText={
                    <TextField hintText="Email" value={item.accountItem}/>
                    
                  } 
                  leftCheckbox={
                      <Checkbox 
                          checked={item.completed} 
                          onCheck={() => this.handleComplete(item.id)}
                      />
                  }
                  rightIconButton={
                      <IconButton 
                      onTouchTap={() => this.handleDelete(item.id)} >
                          <NavigationClose />
                      </IconButton>
                  }
                />
                <Divider />
                <TextField hintText="Email" value={item.password}/>
                <TextField hintText="Password"/>
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

        <FloatingActionButton className="addButton" onClick={this.handleClick.bind(this)}>
          <i className="material-icons" style={{color: 'white'}}>add</i>
        </FloatingActionButton>
        <FloatingActionButton mini="true" className="lockButton" onClick={this.handleClickedLock.bind(this)}>
          <i className="material-icons" style={{color: 'white'}}>lock</i>          
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

//

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

function _isClickedEditButton () {


}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);