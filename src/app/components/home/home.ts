import { Component } from '@angular/core';
import { Header } from '../header/header';
import { AnimalList } from '../animal/animal-list/animal-list';

@Component({
  selector: 'app-home',
  imports: [Header, AnimalList],
  templateUrl: './home.html',
})
export default class Home {}
