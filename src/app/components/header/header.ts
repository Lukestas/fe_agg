import { Component } from '@angular/core';
import { Navegation } from '../navegation/navegation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Navegation, RouterLink],
  templateUrl: './header.html',
})
export class Header {}
