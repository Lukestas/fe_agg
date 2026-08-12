import { Component } from '@angular/core';
import { AnimalList } from '../animal/animal-list/animal-list';

@Component({
  selector: 'app-home',
  imports: [AnimalList],
  templateUrl: './home.html',
})
export default class Home {}
