import { render, screen, fireEvent } from '@testing-library/react';
import FormularioProducto from './FormularioProducto.jsx';

test('FormularioProducto permite ingresar el nombre del producto', () => {
  render(<FormularioProducto alGuardar={() => {}} />);

  const campoNombre = screen.getByLabelText('Nombre');
  fireEvent.change(campoNombre, { target: { value: 'Torta de Lúcuma' } });

  expect(campoNombre).toHaveValue('Torta de Lúcuma');
});
