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
  accountTagUpdate
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

// Swipe Views
import SwipeableViews from 'react-swipeable-views';

// Search Bar
import SearchBar from 'material-ui-search-bar';
// React Edit Inline
import InlineEdit from 'react-edit-inline';

// Copy To Clipboard
import Clipboard from 'react-clipboard.js';

//import Settings from './settings';
//for next release settings page

const styles = {
  height: 550,
  textAlign: 'center',
  lockButton:{
    pointerEvents: 'none'
  }
};

const ACCOUNT_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_FAVORITES: account => account.fav,
  SHOW_TAG: account => account.tag  
}

class AccountList extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      slideIndex: 0,
      disabled: false,
      accountItem: '',
      accountPassword: '',
      filter: ACCOUNT_FILTERS.SHOW_ALL,
      isLock: true,
      search: '#tag'
    }

    this.handleChange = this.handleChange.bind(this);    
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
    this.accountItemChanged = this.accountItemChanged.bind(this);
    this.accountPasswordChanged = this.accountPasswordChanged.bind(this);
  }

  handleChange (value) {
    this.setState({
      slideIndex: value,
    });
  }
  
  componentWillReceiveProps(nextProps) {
    localStorage.setItem('accounts', JSON.stringify(nextProps.accountItems));
  }

  componentDidMount() {
    const storageIsLockButton = JSON.parse(localStorage.getItem('isLockButton'));

    if (this.state.isLock !== storageIsLockButton) {
      this.setState({isLock: storageIsLockButton});
    }
  }

  handlePlusClick(e) {
    e.preventDefault();

    this.props.addAccount({
      accountItem: "Clik here and add your Account",
      accountPassword: "Also Password",
      tag: "#tag",
      id: uuid.v4()
    });
  }

  handleLockClick(e) {
    e.preventDefault();

    this.setState({
      isLock: !this.state.isLock
    });

    localStorage.setItem('isLockButton', this.state.isLock);
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

  customValidateTag(text) {
    return (text.length > 0 && text.length < 14);
  }

  accountItemChanged(item) {
    this.props.accountItemUpdate(item);
  }

  accountPasswordChanged(item) {
    this.props.accountPasswordUpdate(item);
  }

  accountTagChanged(item) {
    this.props.accountTagUpdate(item);
    console.log(item);
  }

  handleSearch(item) {
    this.setState({
      search: item
    });

    console.log(item);
  }

  renderList() {
    const { accountItems } = this.props;

    const {
      filter,
      search,
      slideIndex,
      isLock
    } = this.state;

    
    if (accountItems) {
      let searchResult = this.state.search ? accountItems.filter(l => {
        return l.tag.match( this.state.search );
      }) : null;

      let shownAccountList = searchResult || accountItems.filter(filter);

      if (shownAccountList.length <= 0) {
        return (
          <div className="warningForEmpty">
            oops! there is nothing :(
          </div> 
        );
      }

      return shownAccountList.map((item) => {
        return(
          <div className="itemStyle" key={ item.id }>
            <List>
              <ListItem
                className="listItem"
                leftIcon={
                  <FontIcon className="material-icons quick-icon">mail_outline</FontIcon>
                }
                rightIcon={
                  <Clipboard className="clipboard-btn" data-clipboard-text={ item.accountItem }>
                    <FontIcon className="material-icons clipboard-icon" >content_copy</FontIcon>
                  </Clipboard>
                }
                primaryText={
                  <InlineEdit
                    activeClassName="editing"
                    change={ this.accountItemChanged.bind(this) }
                    className="inlineEdit"
                    text={ item.accountItem }
                    paramName={ item.id }
                    style={ !isLock ? { pointerEvents: 'none' } : null}                    
                    validate={ this.customValidateText }
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
                    activeClassName="editing"
                    change={ this.accountPasswordChanged.bind(this) }
                    className="inlineEdit"
                    text={ item.accountPassword }
                    paramName={ item.id }
                    style={ !isLock ? { pointerEvents: 'none' } : null}                    
                    validate={ this.customValidateText }
                  />
                }
              />
              {
              slideIndex === 0 ?
                <div className="subLine">
                  <div className="editLine">
                    <div className="avatarTag">
                      <i className="material-icons">loyalty</i>
                    </div>
                    <InlineEdit
                      activeClassName="editiginTag"
                      change={ this.accountTagChanged.bind(this) }
                      className="inlineEditTag"
                      text={ item.tag }
                      style={ !isLock ? { pointerEvents: 'none', cursor: 'default' } : null}
                      paramName={ item.id }
                      validate={ this.customValidateTag }                    
                    />
                  </div>
                  <div className="subButtons">
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
                </div>
                : null
              }
          </List>
            <Divider />
          </div>
          );
      });
    }
  }

  render() {
    const {
      slideIndex,
      isLock
    } = this.state;
    return (
      <div>
        <Tabs
          onChange={ this.handleChange }
          value={ slideIndex }
          inkBarStyle={{background: '#FFFFFF'}}
          tabItemContainerStyle={{ backgroundColor: '#EA0A5A' }}
        >
          <Tab
            value={0}
            icon={<FontIcon className="material-icons">home</FontIcon>}
            onActive={ () => {
              this.setState({ filter: ACCOUNT_FILTERS.SHOW_ALL}); }
            }
          />
          <Tab
            value={1}
            icon={<FontIcon className="material-icons">favorite</FontIcon>}
            onClick={this.handleTab}
            onActive={() => {
              this.setState({ filter: ACCOUNT_FILTERS.SHOW_FAVORITES});} 
            }
          />
          {/* <Tab 
            value={2}
            icon={
              <FontIcon className="material-icons">settings</FontIcon>
            }/> */}
        </Tabs>
        <SearchBar
          className="search"
          onChange={this.handleSearch.bind(this)}
          onRequestSearch={() => console.log('onRequestSearch')}
          hintText="Search for tag..."
          style={{
            margin: '0 auto',
            maxWidth: 800
          }}
        />
        <SwipeableViews
          index={ slideIndex }
          onChangeIndex={ this.handleChange }
        >
          <div>
            <List style={styles}>
              {
                this.renderList()
              }
            </List>
            <FloatingActionButton mini={true} className="addButton" onClick={this.handlePlusClick.bind(this)}>
              <i className="material-icons">add</i>
            </FloatingActionButton>
            <FloatingActionButton mini={true} className="lockButton" onClick={this.handleLockClick.bind(this)}>
              <i className="material-icons">
              {
                isLock ? "flip_to_back" : "flip_to_front"
              }
              </i>     
            </FloatingActionButton>
          </div>
          <div style={ styles.slide }>
            <List style={ styles }>
              {
                this.renderList()
              }
            </List>
          </div>
          {/* <div style={styles.slide}>
            { <Settings/> }
          </div> */}
        </SwipeableViews>
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
    accountTagUpdate,
    deleteAccount,
    addToFavorites
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);