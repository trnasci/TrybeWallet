import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SUBMIT_USER_PROFILE } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    disabled: true,

  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validationButton());
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    const action = { type: SUBMIT_USER_PROFILE, payload: email };
    dispatch(action);
    history.push('/carteira');
  };

  validationButton = () => {
    const { email, password } = this.state;
    const regexp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minLength = 6;
    const validEmail = email.match(regexp);
    const validPassword = password.length >= minLength;
    if (validEmail && validPassword) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <div>
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </div>
        </label>
        <label htmlFor="password">
          Senha:
          <div>
            <input
              type="text"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </div>
        </label>
        <button
          type="submit"
          data-testid="btn-submit"
          onClick={ this.handleSubmit }
          disabled={ disabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
