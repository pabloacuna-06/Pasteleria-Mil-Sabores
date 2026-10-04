import { render, screen, fireEvent } from '@testing-library/react';
import Registro from './Registro.jsx';

test('muestra error cuando las contraseñas son diferentes', () => {
  render(<Registro />);

  fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Pablo' } });
  fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'pablo@example.com' } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave1' } });
  fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: 'clave2' } });
  fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

  expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument();
});
