const SUBMIT_USER_PROFILE = 'SUBMIT_USER_PROFILE';

const GET_CURRENCIES = 'GET_CURRENCIES';

const SAVE_EXPENSES = 'SAVE_EXPENSES';

const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

const requestAPI = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  const currencies = await data.json();
  delete currencies.USDT;

  dispatch(getCurrencies(Object.keys(currencies)));
};

const requestAPIAndSaveExpense = (expense) => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  const currencies = await data.json();
  delete currencies.USDT;
  this.setState({ exchangeRates: currencies });

  dispatch(saveExpenses(expense));
};

export {
  SUBMIT_USER_PROFILE,
  GET_CURRENCIES,
  SAVE_EXPENSES,
  requestAPI,
  getCurrencies,
  requestAPIAndSaveExpense,
  saveExpenses,
};
