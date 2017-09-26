export function addAccountName(account) {
  return {
    type: 'ACCOUNT_ADDED_NAME',
    payload: account
  };
}

export function addAccountPassword(account) {
  return {
    type: 'ACCOUNT_ADDED_PASSWORD',
    payload: account
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