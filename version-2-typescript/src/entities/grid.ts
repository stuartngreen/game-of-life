import { Cell } from './cell';

export class Grid {

    private grid: Cell[][] = [];

    constructor(
        private height: number = 10,
        private width: number = 10
    ) {
        this.createGrid();
    }

    private createGrid(): void {

        for (let r = 0; r < this.height; r++) {
            
            this.grid[r] = [];

            for (let c = 0; c < this.width; c++) {
                this.grid[r][c] = new Cell(r, c);
            }
        }

    }

    // initWithPattern(): void {

    // }

    public randomiseGrid(): void {
        
        for (let r = 0; r < this.height; r++) {

            for (let c = 0; c < this.width; c++) {
                this.grid[r][c].isAlive = Math.random() >= 0.5;
            }

        }

    }

    public getCell(r: number, c: number): Cell {
        return this.grid[r][c];
    }
}
