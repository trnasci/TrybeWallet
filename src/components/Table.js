import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
            expenses.map((element, index) => (
              <tr key={ index }>
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
                  <button id={ element.id } type="button">Editar</button>
                </td>
                <td>
                  <button id={ element.id } type="button">Excluir</button>
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
};

function mapStateToProps(state) {
  return { ...state.wallet };
}

export default connect(mapStateToProps)(Table);
