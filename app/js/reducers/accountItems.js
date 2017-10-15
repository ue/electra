const initialState = () => {
  const accounts = localStorage.getItem('accounts');
  
  return accounts ? JSON.parse(accounts) : [];
}

export default function accountItems(state = initialState(), action) {
  console.log("log:accountitems action payload:");
  console.log(action.payload);
    switch (action.type) {
      case 'ACCOUNT_ADDED':
        return state.concat(action.payload);

      case 'ACCOUNT_UPDATE':
        return state.filter(account =>
          account.id !== Object.keys(action.payload)[0]
        );

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