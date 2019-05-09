import 'mocha';
import { expect } from 'chai';
import { Game } from '../models/game';

describe('Game Tests', () => {

    let game: Game;

    beforeEach(() => {
        game = new Game(3, 3);

        game.grid.getCell(0, 0).isAlive = false;
        game.grid.getCell(0, 1).isAlive = true;
        game.grid.getCell(0, 2).isAlive = false;
        game.grid.getCell(1, 0).isAlive = true;
        game.grid.getCell(1, 1).isAlive = true;
        game.grid.getCell(1, 2).isAlive = true;
        game.grid.getCell(2, 0).isAlive = false;
        game.grid.getCell(2, 1).isAlive = false;
        game.grid.getCell(2, 2).isAlive = true;

        // Starting grid state:
        //   0 1 2
        // 0 x o x
        // 1 o o o
        // 2 x x o
    });

    it('should return correct count of live neighbours when cell is alive', () => {
        let cell = game.grid.getCell(1, 1);
        let liveCount = game.liveNeighbours(cell);
        expect(liveCount).to.be.equal(4);
    });

    it('should return correct count of live neighbours when cell is dead', () => {
        let cell = game.grid.getCell(0, 2);
        let liveCount = game.liveNeighbours(cell);
        expect(liveCount).to.be.equal(3);
    });

    it('should generate correct state of grid on iteration as per game rules', () => {
        game.nextIteration();
        
        // Expected grid state:
        //   0 1 2
        // 0 o o o
        // 1 o x o
        // 2 x x o

        expect(game.grid.getCell(0, 0).isAlive).to.be.true;
        expect(game.grid.getCell(0, 1).isAlive).to.be.true;
        expect(game.grid.getCell(0, 2).isAlive).to.be.true;
        expect(game.grid.getCell(1, 0).isAlive).to.be.true;
        expect(game.grid.getCell(1, 1).isAlive).to.be.false;
        expect(game.grid.getCell(1, 0).isAlive).to.be.true;
        expect(game.grid.getCell(2, 0).isAlive).to.be.false;
        expect(game.grid.getCell(2, 1).isAlive).to.be.false;
        expect(game.grid.getCell(2, 2).isAlive).to.be.true;
    });

});
