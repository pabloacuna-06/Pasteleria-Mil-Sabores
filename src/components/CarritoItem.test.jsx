import { render, screen, fireEvent } from '@testing-library/react';
import CarritoItem from './CarritoItem.jsx';

const producto = {
  codigo: 'TC001',
  nombre: 'Torta Cuadrada de Chocolate',
  precio: 45000,
  imagen: 'torta.jpg',
};

test('CarritoItem muestra correctamente los datos del producto', () => {
  render(<CarritoItem producto={producto} cantidad={2} />);

  expect(screen.getByText('TC001')).toBeInTheDocument();
  expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText(`Subtotal: $${(90000).toLocaleString('es-CL')}`)).toBeInTheDocument();
});

test('el boton para aumentar la cantidad funciona', () => {
  const alAumentar = vi.fn();
  render(<CarritoItem producto={producto} cantidad={1} alAumentar={alAumentar} />);

  fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad' }));

  expect(alAumentar).toHaveBeenCalledTimes(1);
});

test('el boton para eliminar ejecuta la función correspondiente', () => {
  const alEliminar = vi.fn();
  render(<CarritoItem producto={producto} cantidad={1} alEliminar={alEliminar} />);

  fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));

  expect(alEliminar).toHaveBeenCalledTimes(1);
});
