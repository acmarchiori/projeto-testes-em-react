import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const paragraph = 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela;', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const text = screen.getByText('Pikachu Details');
    expect(text).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const getParagraph = screen.getByText(paragraph);
    expect(getParagraph).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon;', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const summary = screen.getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    expect(summary).toBeInTheDocument();

    const location1 = screen.getByText('Kanto Viridian Forest');
    expect(location1).toBeInTheDocument();

    const location2 = screen.getByText('Kanto Power Plant');
    expect(location2).toBeInTheDocument();

    screen.logTestingPlaygroundURL();

    const image = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(image[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(image[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(image[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:;', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    const image = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(image).toHaveAttribute('src', '/star-icon.svg');
    expect(image).toHaveAttribute('alt', 'Pikachu is marked as favorite');

    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    expect(image).not.toBeInTheDocument();
  });
});
