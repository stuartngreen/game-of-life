import { Cell } from '../entities/cell';

export class Grid {

    private grid: Cell[][] = [];

    constructor(
        public height = 25,
        public width = 25
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

    // setPattern(): void {

    // }

    public randomise(): void {
        
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                this.grid[r][c].isAlive = Math.random() >= 0.5;
            }
        }

    }

    public getCell(r: number, c: number): Cell {

        if (
            (r > -1 && r < this.height) &&
            (c > -1 && c < this.width)
        ) {
            return this.grid[r][c];
        }
        
        return null;
    }

}
