export function addAccount(account) {
  return {
    type: 'ACCOUNT_ADDED',
    payload: account
  };
}

export function accountUpdate(id) {
  return {
    type: 'ACCOUNT_UPDATE',
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