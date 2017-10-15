export function addAccount(account) {
  return {
    type: 'ACCOUNT_ADDED',
    payload: account
  };
}

export function accountItemUpdate(id) {
  return {
    type: 'ACCOUNT_ITEM_UPDATE',
    payload: id
  };
}

export function accountPasswordUpdate(id) {
  return {
    type: 'ACCOUNT_PASSWORD_UPDATE',
    payload: id
  };
}

export function deleteAccount(id) {
  return { 
    type: 'ACCOUNT_DELETED', 
    payload: id 
  }
}

export function completeAccount(id) {
  return { 
    type: 'ACCOUNT_COMPLETED', 
    payload: id 
  }
}