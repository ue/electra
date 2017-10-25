import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
  addAccount,
  accountItemUpdate,
  deleteAccount,
  addToFavorites,
  accountPasswordUpdate,
  completeAccount
} from '../actions/index';

// Id
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

// Input Field
import TextField from 'material-ui/lib/text-field';

// React Edit Inline
import InlineEdit from 'react-edit-inline';

// Copy To Clipboard
import Clipboard from 'react-clipboard.js';

import Settings from './settings';

const styles = {
    height: 500,
    overflowY: 'auto',
    textAlign: 'center'
}

const ACCOUNT_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_FAVORITES: account => account.fav,
  SHOW_ACTIVE: account => account.fav
}

class AccountList extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      filter: ACCOUNT_FILTERS.SHOW_ALL,
      disabled: false,
      accountItem: '',
      accountPassword: ''
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
    this.accountItemChanged = this.accountItemChanged.bind(this);
    this.accountPasswordChanged = this.accountPasswordChanged.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    localStorage.setItem('accounts', JSON.stringify(nextProps.accountItems));
  }

  handlePlusClick(e) {
    e.preventDefault();
    // Dispatch props
    this.props.addAccount({
      accountItem: "Clik here and add your Account",
      accountPassword: "Also Password",
      id: uuid.v4()
    });
  }
  
  handleDelete(id) {
    this.props.deleteAccount(id);
  }
  
  handleFavorites(id) {
    this.props.addToFavorites(id);
  }

  customValidateText(text) {
    return (text.length > 0 && text.length < 64);
  }

  accountItemChanged(item){
    this.props.accountItemUpdate(item);
  }

  accountPasswordChanged(item){
    this.props.accountPasswordUpdate(item);
  }


  renderList() {
    if (this.props.accountItems) {
      let shownAccountList = this.props.accountItems.filter(this.state.filter);

      if (shownAccountList.length <= 0) {
        return (
          <div className="warningForEmpty">
            oops! there is nothing :(
          </div> 
        );
      }

      return shownAccountList.map((item) => {
        return(
          <div className="itemStyle" key={item.id}>
            <List>
              <ListItem
                className="listItem"
                leftIcon={
                  <FontIcon className="material-icons quick-icon">mail_outline</FontIcon>
                }
                rightIcon={
                  <Clipboard className="clipboard-btn" data-clipboard-text={item.accountItem}>
                    <FontIcon className="material-icons clipboard-icon" >content_copy</FontIcon>
                  </Clipboard>
                }
                primaryText={
                  <InlineEdit
                    validate={this.customValidateText}
                    activeClassName="editing"
                    text={ item.accountItem }
                    paramName={ item.id }
                    change={ this.accountItemChanged.bind(this) }
                    className="inlineEdit"
                  />
                }
              />
              <ListItem
                className="listItem"              
                leftIcon={
                  <FontIcon className="material-icons quick-icons">lock_open</FontIcon>              
                }
                rightIcon={
                  <Clipboard className="clipboard-btn" data-clipboard-text={item.accountPassword}>
                    <FontIcon className="material-icons clipboard-icon">content_copy</FontIcon>
                  </Clipboard>
                }
                primaryText={
                  <InlineEdit
                    validate={this.customValidateText}
                    activeClassName="editing"
                    text={ item.accountPassword }
                    paramName={ item.id }
                    change={ this.accountPasswordChanged.bind(this) }
                    className="inlineEdit"
                  />
                }
              />
              <div>
                <IconButton className="" onTouchTap={() => this.handleFavorites(item.id)}>
                { item.fav ?
                  <FontIcon className="material-icons favorite-icon">favorite</FontIcon>
                  :
                  <FontIcon className="material-icons favorite-icon">favorite_border</FontIcon>
                }
                  
                </IconButton>
                <IconButton className="" onTouchTap={() => this.handleDelete(item.id)} >
                  <FontIcon className="material-icons">delete</FontIcon>
                </IconButton> 
              </div>
          </List>
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
            icon={<FontIcon className="material-icons">home</FontIcon>}
            onActive={ () => {
              this.setState({filter: ACCOUNT_FILTERS.SHOW_ALL});}
            }
          >
            <List style={styles}>
              {
                this.renderList()
              }
            </List>
          </Tab>

          <Tab
            icon={<FontIcon className="material-icons">favorite</FontIcon>}
            onActive={() => {
              this.setState({filter: ACCOUNT_FILTERS.SHOW_FAVORITES});}
            }
          >
            <List style={styles}>
              {
                this.renderList()
              }
            </List>
          </Tab>
          
          <Tab icon={<FontIcon className="material-icons">settings</FontIcon>}>
              { <Settings/> }
          </Tab>
        </Tabs>
        
        <FloatingActionButton mini={true} className="addButton" onClick={this.handlePlusClick.bind(this)}>
          <i className="material-icons">add</i>
        </FloatingActionButton>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountItems: state.accountItems
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addAccount,
    accountItemUpdate,
    accountPasswordUpdate,
    deleteAccount,
    addToFavorites,
    completeAccount
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);