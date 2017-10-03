export function addAccountName(account) {
  return {
    type: 'ACCOUNT_ADDED_NAME',
    payload: account
  };
}

export function addAccountPassword(password) {
  return {
    type: 'ACCOUNT_ADDED_PASSWORD',
    payload: password
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