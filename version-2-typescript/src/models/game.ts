import { Cell } from '../entities/cell';
import { Grid } from '../entities/grid';

export class Game {

    constructor(
        public gridHeight: number,
        public gridWidth: number,
        private grid: Grid = new Grid(gridHeight, gridWidth)
    ) { }

    public getGridCell(r: number, c: number): Cell {
        return this.grid.getCell(r, c);
    }

    public start(): void {
        
    }

    public randomiseGrid(): void {
        this.grid.randomiseGrid();
    }

}
