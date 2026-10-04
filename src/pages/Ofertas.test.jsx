import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ofertas from './Ofertas.jsx';

test('muestra cuatro productos en oferta', () => {
  render(
    <MemoryRouter>
      <Ofertas />
    </MemoryRouter>
  );

  expect(screen.getAllByText('Oferta')).toHaveLength(4);
});
