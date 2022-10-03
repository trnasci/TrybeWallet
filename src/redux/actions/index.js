const SUBMIT_USER_PROFILE = 'SUBMIT_USER_PROFILE';

const GET_CURRENCIES = 'GET_CURRENCIES';

const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

const requestAPI = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  delete data.USDT;
  const currencies = await data.json();
  delete currencies.USDT;

  dispatch(getCurrencies(Object.keys(currencies)));
};

export {
  SUBMIT_USER_PROFILE,
  GET_CURRENCIES,
  requestAPI,
  getCurrencies,
};
