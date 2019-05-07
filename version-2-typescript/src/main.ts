import { Cell } from './entities/cell';
import { Game } from './models/game';

let iterate: number;

export function main() {

    let width = parseInt((<HTMLInputElement>document.getElementById('widthInput')).value);
    let height = parseInt((<HTMLInputElement>document.getElementById('heightInput')).value);

    let game: Game = new Game(height, width, 15);
    
    startGame(game);

}

function buildTableHtml(game: Game): HTMLElement {

    let table = document.createElement('table');
    table.setAttribute('class', 'game-table');

    for (let r = 0; r < game.grid.height; r++) {

        let tr = document.createElement('tr');

        for (let c = 0; c < game.grid.width; c++) {

            let cell: Cell = game.grid.getCell(r, c);

            let td = document.createElement('td');
            td.setAttribute('id', `row-${r}-col-${c}`);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
}

function updateTableHtml(game: Game): void {
    
    for (let r = 0; r < game.grid.height; r++) {

        for (let c = 0; c < game.grid.width; c++) {

            let cell: Cell = game.grid.getCell(r, c);
            let htmlCell = document.getElementById(`row-${r}-col-${c}`);

            htmlCell.setAttribute('class', cell.isAlive ? 'live' : 'dead');
        }
    }

}

function stopGame(): void {
    clearInterval(iterate);
}

function startGame(game: Game): void {

    game.grid.randomise();

    document.getElementById('output').append(buildTableHtml(game));

    iterate = setInterval(() => {

        if (game.currentIteration < game.maxIterations) {
            updateTableHtml(game);
            game.nextIteration();
            game.currentIteration++;
        }
        else {
            stopGame();
        }

    }, game.speed);

}
