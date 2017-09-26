export function addAccount(account) {
  return {
    type: 'ACCOUNT_ADDED',
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