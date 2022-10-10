import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Teste da  página de login', () => {
  test('1- A rota deve ser "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('2- Existe o input Email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByText(/email:/i);
    expect(emailInput).toBeInTheDocument();
  });
  test('3- Existe o input de senha', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const senhaInput = screen.getByTestId(/password-input/i);
    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
  });
  test('4 - Verifica se existe o botão desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(btnEntrar).toBeInTheDocument();
    expect(btnEntrar).toBeDisabled();
  });
  test('5- Verifica validação do botão', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    const inputEmail = screen.getByTestId(/email-input/i);
    userEvent.type(inputEmail, 'thiagogmail.com');

    expect(btnEntrar).toBeDisabled();
  });
  test('6- Verifica se o email é salvo no estado central', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'trnasci@gmail.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(btnEntrar);

    expect(store.getState().user.email).toBe('trnasci@gmail.com');
  });
});
