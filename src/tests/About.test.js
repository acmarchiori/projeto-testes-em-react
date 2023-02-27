import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const title = screen.getByRole('heading', { level: 1, name: 'Pokédex' });
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const aboutTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<App />);

    const paragraph1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon';
    const paragraph2 = 'One can filter Pokémon by type, and see more details for each one of them';

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const info1 = screen.getByText(paragraph1);
    const info2 = screen.getByText(paragraph2);
    expect(info1).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se a página contém a imagem de uma Pokédex;', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
    expect(history.location.pathname).toBe('/about');
  });
});
