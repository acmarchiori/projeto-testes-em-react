import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

const detailsText = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon;', () => {
    renderWithRouter(<Pokemon
      isFavorite={ false }
      showDetailsLink={ false }
      pokemon={ pikachu }
    />);

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();

    const type = screen.getByText('Electric');
    expect(type).toBeInTheDocument();

    const average = screen.getByText('Average weight: 6.0 kg');
    expect(average).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon;', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: detailsText });
    expect(detailsLink).toBeInTheDocument();
  });
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: detailsText });
    userEvent.click(detailsLink);

    const details = screen.getByText('Pikachu Details');
    expect(details).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: detailsText });
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemon/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados;', () => {
    renderWithRouter(<Pokemon
      isFavorite
      showDetailsLink={ false }
      pokemon={ pikachu }
    />);
    screen.logTestingPlaygroundURL();
    const image = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(image).toHaveAttribute('src', '/star-icon.svg');
    expect(image).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
