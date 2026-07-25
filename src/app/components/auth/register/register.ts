import { Component, signal } from '@angular/core';
import { RegisterRequest } from '../models/models';
import { email, form, min, minLength, required, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormField, RouterLink],
  templateUrl: './register.html',
})
export default class Register {
  registerModel = signal<RegisterRequest>({
    email: '',
    firstName: '',
    lastName: '',
    dni: 0,
    password: '',
  });

  registerForm = form(this.registerModel, (path) => {
    required(path.dni, { message: 'La cédula es requerida' });
    required(path.email, { message: 'El correo es requerido' });
    required(path.firstName, { message: 'El nombre es requerido' });
    required(path.lastName, { message: 'Los apellidos son requeridos' });
    required(path.password, { message: 'La contraseña es requerida' });

    min(path.dni, 1, { message: 'La cédula debe ser mayor a 1' });
    minLength(path.password, 8, { message: 'La contraseña debe tener mínimo 8 carácteres' });
    email(path.email, { message: 'El correo no es válido' });
  });

  onSubmit(e: Event) {
    e.preventDefault();
  }
}
