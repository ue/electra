const initialState = () => {
  const accounts = localStorage.getItem('accounts');
  
  return accounts ? JSON.parse(accounts) : [];
}

export default function accountItems(state = initialState(), action) {
  console.log("Logger");
  console.log(action);
    switch (action.type) {
      case 'ACCOUNT_ADDED':
        return state.concat(action.payload);

      case 'ACCOUNT_ITEM_UPDATE':
      return state.map((account) => {
          if (account.id === Object.keys(action.payload)[0]) {
              account.accountItem = action.payload[account.id];
          }
          return account;
      });

      case 'ACCOUNT_PASSWORD_UPDATE':
      return state.map((account) => {
          if (account.id === Object.keys(action.payload)[0]) {
              account.accountPassword = action.payload[account.id];
          }
          return account;
      });

      case 'ACCOUNT_DELETED':
        return state.filter(account =>
            account.id !== action.payload
        );

      case 'ADD_TO_FAVORITES':
        return state.map((account) => {
            if (account.id === action.payload) {
                account.fav = !account.fav;
            }
            return account;
        });
    }
    return state; 
}