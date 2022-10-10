import React from 'react';
import { act } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('TESTES DA PÁGINA Wallet', () => {
  it('1- Testa se Wallet tem a rota "/carteira".', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');
  });
});
