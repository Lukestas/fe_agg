import { Component, signal } from '@angular/core';
import { LoginRequest } from '../models/models';
import { form, FormField, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
})
export default class Login {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  loginModel = signal<LoginRequest>({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (path) => {
    required(path.username, {
      message: 'El usuario es requerido',
    });

    required(path.password, {
      message: 'La contraseña es requerida',
    });
  });

  onSubmit(): void {
    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }

    const request: LoginRequest = {
      username: this.loginForm.username().value(),
      password: this.loginForm.password().value(),
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);

        this.router.navigate(['']);
      },

      error: (error) => {
        console.error('Error de inicio de sesión:', error);

        this.onReset();
      },
    });
  }

  onReset(): void {
    this.loginModel.set({
      username: '',
      password: '',
    });
  }
}
