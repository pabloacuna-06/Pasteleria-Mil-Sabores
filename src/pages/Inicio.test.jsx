import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Inicio from './Inicio.jsx';

test('muestra el título principal', () => {
  render(
    <MemoryRouter>
      <Inicio />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Pastelería Mil Sabores', level: 1 })).toBeInTheDocument();
});
