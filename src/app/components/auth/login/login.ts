import { Component, signal } from '@angular/core';
import { LoginRequest } from '../models/models';
import { form, FormField, min, required, validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
})
export default class Login {
  constructor(private router: Router) {}
  loginModel = signal<LoginRequest>({
    dni: 0,
    password: '',
  });

  loginForm = form(this.loginModel, (path) => {
    required(path.dni, { message: 'La cédula es requerida' });
    required(path.password, { message: 'La contraseña es requerida' });
    min(path.dni, 1, { message: 'La cédula debe ser mayor a un dígito' });
    validate(path.dni, ({ value }) => {
      if (!value()) return null;
      const trueDni = 123;
      if (value() !== trueDni)
        return {
          message: '(Test): El DNI debe ser 123',
          kind: 'error',
        };
      return null;
    });
    validate(path.password, ({ value }) => {
      if (!value()) return null;
      const truePassword = '123';
      if (value() !== truePassword)
        return {
          message: '(Test): La contraseña debe ser 123',
          kind: 'error',
        };
      return null;
    });
  });

  onSubmit(): void {
    if (this.loginForm.dni().value() === 123 && this.loginForm.password().value() === '123') {
      localStorage.setItem('logged', 'true');
      this.router.navigate(['/home']);
    } else {
      this.onReset();
      localStorage.removeItem('logged');
    }
  }

  onReset(): void {
    this.loginModel.set({
      dni: 0,
      password: '',
    });
  }
}
