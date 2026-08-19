import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/service/auth-service';

@Component({
  selector: 'app-navegation',
  imports: [RouterLink],
  templateUrl: './navegation.html',
})
export class Navegation {
  menuOpen = signal(false);

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}
