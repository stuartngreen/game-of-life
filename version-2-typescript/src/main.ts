import { Cell } from './entities/cell';
import { Game } from './models/game';

let game: Game;
let iterate: number; // Used to pause/play the game.

export function main() {
    initGame();
}

function initGame(): void {

    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    let userInput = getUserInput();

    game = new Game(
        userInput.height,
        userInput.width,
        userInput.speed
    );

    game.grid.randomise();
    // game.grid.setPattern();
    
    outputDiv.append(buildTableHtml(game));
    updateViewHtml(game);

}

function getUserInput(): any {
    
    let userInput = {
        width: parseInt((<HTMLInputElement>document.getElementById('widthInput')).value),
        height: parseInt((<HTMLInputElement>document.getElementById('heightInput')).value),
        speed: parseInt((<HTMLInputElement>document.getElementById('speedInput')).value)
    };
    
    return userInput;
}

function buildTableHtml(game: Game): HTMLElement {

    let table = document.createElement('table');
    table.setAttribute('class', 'game-table');

    for (let r = 0; r < game.grid.height; r++) {

        let tr = document.createElement('tr');

        for (let c = 0; c < game.grid.width; c++) {

            let td = document.createElement('td');
            td.setAttribute('id', `row-${r}-col-${c}`);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
}

function updateViewHtml(game: Game): void {
    
    for (let r = 0; r < game.grid.height; r++) {

        for (let c = 0; c < game.grid.width; c++) {

            let cell: Cell = game.grid.getCell(r, c);
            let htmlCell = document.getElementById(`row-${r}-col-${c}`);

            htmlCell.setAttribute('class', cell.isAlive ? 'live' : 'dead');
        }
    }

}

export function pauseGame(): void {
    clearInterval(iterate);
}

export function playGame(): void {

    iterate = setInterval(() => {

        if (game.currentIteration < game.maxIterations) {
            updateViewHtml(game);
            game.nextIteration();
            game.currentIteration++;
        }
        else {
            pauseGame();
        }

    }, game.speed);

}

export function resetGame(): void {

    clearInterval(iterate);
    game.currentIteration = 0;
    initGame();
    
}
