import { Component } from '@angular/core';
import { MapModel } from '../models';
import { ColorEnum } from '../enums';

const MAP_SIZE = 5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'three-in-row';
  map: MapModel[][] = [];

  constructor() {
    this.generateMap();
  }

  generateMap() {
    const colors = Object.values(ColorEnum);
    this.map = Array(MAP_SIZE);
    for (let i = 0; i < MAP_SIZE; i += 1) {
      const row = Array(MAP_SIZE);
      for (let j = 0; j < MAP_SIZE; j += 1) {
        const index = Math.round(Math.random() * (colors.length - 1)  );
        row[j] =  { color: colors[index] as ColorEnum };
      }
      this.map[i] = row;
    }

  }
}
