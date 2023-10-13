import { Component } from '@angular/core';
import { CoordinatesModel, MapModel } from '../models';
import { ColorEnum } from '../enums';

const MAP_SIZE = 5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'three-in-row';
  map: MapModel[][] = [];
  selectedCell: CoordinatesModel | null = null;

  constructor() {
    this.generateMap();
  }

  generateMap() {
    const colors = Object.values(ColorEnum);
    this.map = Array(MAP_SIZE);
    for (let i = 0; i < MAP_SIZE; i += 1) {
      const row = Array(MAP_SIZE);
      for (let j = 0; j < MAP_SIZE; j += 1) {
        const index = Math.round(Math.random() * (colors.length - 1));
        row[j] = { color: colors[index] as ColorEnum };
      }
      this.map[i] = row;
    }

  }

  onCellClick(rowIndex: number, cellIndex: number) {
    const newCoordinates = { rowIndex, cellIndex };
    if (!this.selectedCell) {
      this.selectedCell = {
        rowIndex,
        cellIndex,
      };
    } else if (this.isCanSwitch(newCoordinates)) {
      this.replace(newCoordinates);
      if (this.isCanDestroy(this.selectedCell)) {
        console.log('destroing selected ============> ');
      }

      if (this.isCanDestroy(newCoordinates)) {
        console.log('destroing new ============> ');
      }


      this.selectedCell = null;
    } else {
      this.selectedCell = null;
    }
    console.log('selected', this.selectedCell);
  }

  isCanSwitch(coordinates: CoordinatesModel): boolean {
    if (coordinates.rowIndex === this.selectedCell?.rowIndex) {
      return coordinates.cellIndex + 1 === this.selectedCell.cellIndex
        || coordinates.cellIndex - 1 === this.selectedCell.cellIndex;
    }

    if (coordinates.cellIndex === this.selectedCell?.cellIndex) {
      return coordinates.rowIndex + 1 === this.selectedCell.rowIndex
        || coordinates.rowIndex - 1 === this.selectedCell.rowIndex;
    }

    return false;
  }

  replace(newCoordinates: CoordinatesModel) {
    if (!this.selectedCell) {
      return;
    }
    let temp = this.getColor(this.selectedCell);
    this.map[this.selectedCell?.rowIndex][this.selectedCell?.cellIndex].color = this.map[newCoordinates.rowIndex][newCoordinates.cellIndex].color;
    this.map[newCoordinates.rowIndex][newCoordinates.cellIndex].color = temp;
  }

  isCanDestroy(coordinates: CoordinatesModel): boolean {
    const color = this.getColor(coordinates);

    // checking for row
    let inRow = -1; // because I include current cell twice
    let rowIndex = coordinates.rowIndex;
    let cellIndex = coordinates.cellIndex;
    while (rowIndex >= 0 && this.getColor({ rowIndex, cellIndex }) === color) {
      rowIndex -= 1;
      inRow += 1;
    }

    rowIndex = coordinates.rowIndex;
    while (rowIndex < MAP_SIZE && this.getColor({ rowIndex, cellIndex }) === color) {
      rowIndex += 1;
      inRow += 1;
    }

    console.log('inRow', inRow, color);

    if (inRow >= 3) {
      return true;
    }

    // checking for cells
    inRow = -1; // because I include current cell twice
    rowIndex = coordinates.rowIndex;
    cellIndex = coordinates.cellIndex;
    while (cellIndex >= 0 && this.getColor({ rowIndex, cellIndex }) === color) {
      cellIndex -= 1;
      inRow += 1;
    }

    cellIndex = coordinates.cellIndex;
    while (cellIndex < MAP_SIZE && this.getColor({ rowIndex, cellIndex }) === color) {
      cellIndex += 1;
      inRow += 1;
    }

    console.log('inRow', inRow, color);

    return inRow >= 3;
  }

  getColor(coordinates: CoordinatesModel): ColorEnum {
    return this.map[coordinates.rowIndex][coordinates.cellIndex].color;
  }
}
