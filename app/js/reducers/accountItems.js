const initialState = () => {
  const accounts = localStorage.getItem('accounts');
  
  return accounts ? JSON.parse(accounts) : [];
}

export default function accountItems(state = initialState(), action) {
    switch (action.type) {
      case 'ACCOUNT_ADDED_NAME':
        return state.concat(action.payload);

      case 'ACCOUNT_ADDED_PASSWORD':
        return state.concat(action.payload);

      case 'ACCOUNT_DELETED':
        return state.filter(account =>
            account.id !== action.payload
        );

      case 'ACCOUNT_COMPLETED':
        return state.map((account) => {
            if (account.id === action.payload) {
                account.completed = !account.completed;
            }
            return account;
        });
    }
    return state; 
}