import Wallet from '../../pages/Wallet';
import { renderWithRouterAndRedux } from './renderWith';

describe('TESTES DA PÁGINA DE LOGIN', () => {
  it('1- Testa se Login tem a rota "/".', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />);
    expect(history.location.pathname).toBe('/');
  });
});
