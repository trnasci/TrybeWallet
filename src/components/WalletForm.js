import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'BRL',
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

  render() {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    console.log(id, exchangeRates);
    console.log(this.props);
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
                exchangeRates.map((element, index) => (
                  <option key={ index }>{ element.code }</option>
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
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { ...state.wallet };
}

export default connect(mapStateToProps)(WalletForm);
