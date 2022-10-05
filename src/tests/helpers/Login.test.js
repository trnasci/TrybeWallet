import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('TESTES DA PÁGINA DE LOGIN', () => {
  it('1- Testa se Login tem a rota "/".', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  it('2- Testa se existe o input de e-mail ', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByText(/email:/i);
    expect(inputEmail).toBeInTheDocument();
  });
  it('3- Testa se existe o input de senha ', () => {
    renderWithRouterAndRedux(<App />);
    const inputSenha = screen.getByText(/senha:/i);
    expect(inputSenha).toBeInTheDocument();
  });
  it('4- Testa se existe o botão de login ', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(btnEntrar).toBeInTheDocument();
  });
  it('5- Testa validação do botão submit ', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByText(/email:/i);
    const inputSenha = screen.getByText(/senha:/i);
    userEvent.type(inputEmail, 'trnasci@gmail.com');
    userEvent.type(inputSenha, '123456');
    expect(btnEntrar).toBeDisabled();
  });
});
