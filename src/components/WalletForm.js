import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestAPI, saveExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestAPI());
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const { dispatch } = this.props;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const currencies = await data.json();
    delete currencies.USDT;
    console.log(currencies);
    this.setState({ exchangeRates: currencies });
    const { id, value, description, currency, method, tag } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    dispatch(saveExpenses(expense));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  };

  render() {
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const { currencies } = this.props;
    console.log(exchangeRates);
    return (
      <form>
        <label htmlFor="value">
          valor:
          <div>
            <input
              type="text"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </div>
        </label>
        <label htmlFor="description">
          Descrição:
          <div>
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </div>
        </label>
        <label htmlFor="currency">
          Moeda:
          <div>
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((element, index) => (
                  <option key={ index }>{ element}</option>
                ))
              }
            </select>
          </div>
        </label>
        <label htmlFor="method">
          Forma de pagamento:
          <div>
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
        </label>
        <label htmlFor="tag">
          Tipo de despesa:
          <div>
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
          <button
            type="button"
            data-testid="btn-submit-expenses"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  return { ...state.wallet };
}

export default connect(mapStateToProps)(WalletForm);
