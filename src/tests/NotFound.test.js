import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found;', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(title).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem;', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
