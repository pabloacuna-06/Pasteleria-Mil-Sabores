import { render, screen } from '@testing-library/react';
import ResumenCompra from './ResumenCompra.jsx';

test('ResumenCompra muestra correctamente el total', () => {
  render(<ResumenCompra unidades={3} total={95000} />);

  expect(screen.getByText('Productos: 3 unidad(es)')).toBeInTheDocument();
  expect(screen.getByText(`Total: $${(95000).toLocaleString('es-CL')}`)).toBeInTheDocument();
});
