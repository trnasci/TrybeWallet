import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    function getTotal(total, item) {
      const convert = Number(item.exchangeRates[item.currency].ask);
      return total + Number(item.value) * convert;
    }
    const total = expenses.reduce(getTotal, 0);

    return (
      <header>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">{ total.toFixed(2) }</div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

function mapStateToProps(state) {
  return { ...state.user, ...state.wallet };
}

export default connect(mapStateToProps)(Header);
