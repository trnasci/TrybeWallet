import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpenses } from '../redux/actions';

class Table extends Component {
  handleBtnDel = (event) => {
    const { dispatch } = this.props;
    const { target } = event;
    const { id } = target;
    dispatch(delExpenses(id));
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((element) => (
              <tr key={ element.id }>
                <td>{ element.description }</td>
                <td>{ element.tag }</td>
                <td>{ element.method }</td>
                <td>{ Number(element.value).toFixed(2) }</td>
                <td>{ element.exchangeRates[element.currency].name }</td>
                <td>
                  { Number(element.exchangeRates[element.currency].ask).toFixed(2) }
                </td>
                <td>
                  { (element.value * element.exchangeRates[element.currency].ask)
                    .toFixed(2) }

                </td>
                <td>Real</td>
                <td>
                  <button
                    id={ element.id }
                    type="button"
                    data-testid="edit-btn"
                  >
                    Editar despesa
                  </button>
                  <button
                    id={ element.id }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ this.handleBtnDel }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { ...state.wallet };
}

export default connect(mapStateToProps)(Table);
