import { Cell } from '../entities/cell';
import { Grid } from './grid';

export class Game {

    public grid: Grid;
    private nextGrid: Grid;

    constructor(
        height: number,
        width: number,
        public speed = 50,
        public maxIterations = Infinity,
        public currentIteration = 0
    ) {
        this.grid = new Grid(height, width);
        this.nextGrid = new Grid(height, width);
    }
    
    // Get the count of live neighbours of a cell.
    public liveNeighbours(cell: Cell): number {

        let liveCount = 0;

        for (let r = cell.r - 1; r <= cell.r + 1; r++) {
            for (let c = cell.c - 1; c <= cell.c + 1; c++) {

                let neighbour = this.grid.getCell(r, c);

                if (neighbour && neighbour.isAlive) {
                    liveCount++;
                }

            }
        }

        return cell.isAlive ? liveCount - 1 : liveCount;
    }

    // Switch between grid to display and next generation grid.
    private switchGrid(): void {

        let temp = this.grid;
        this.grid = this.nextGrid;
        this.nextGrid = temp;

    }

    // Generate the next iteration of the grid.
    public nextIteration(): void {
        
        for (let r = 0; r < this.grid.height; r++) {
            for (let c = 0; c < this.grid.width; c++) {

                let currentCell: Cell = this.grid.getCell(r, c);
                let processCell: Cell = this.nextGrid.getCell(r, c);
                let liveNeighbours = this.liveNeighbours(currentCell);

                if (currentCell.isAlive) {
                    processCell.isAlive = liveNeighbours === 2 || liveNeighbours === 3;
                }
                else {
                    processCell.isAlive = liveNeighbours === 3;
                }

            }
        }

        this.switchGrid();
    }

}
