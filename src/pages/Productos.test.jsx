import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Productos from './Productos.jsx';

test('muestra los productos del catálogo', () => {
  render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

  expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
});

test('filtra productos por búsqueda', () => {
  render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Buscar producto'), { target: { value: 'Mousse' } });

  expect(screen.getByText('Mousse de Chocolate')).toBeInTheDocument();
  expect(screen.queryByText('Torta Cuadrada de Chocolate')).not.toBeInTheDocument();
});
