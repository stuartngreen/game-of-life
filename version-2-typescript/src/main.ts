import { Cell } from './entities/cell';
import { Game } from './models/game';

let defaults = { height: 85, width: 125, speed: 100 };
let game: Game;
let iterate: number;
let gameInProgress = false;

export function main() {
    setDefaults();
    initGame();
}

// Set input fields default values.
function setDefaults(): void {
    (<HTMLInputElement>document.getElementById('heightInput')).value = String(defaults.height);
    (<HTMLInputElement>document.getElementById('widthInput')).value = String(defaults.width);
    (<HTMLInputElement>document.getElementById('speedInput')).value = String(defaults.speed);
}

// Get settings from input fields.
function getSettings(): any {
    
    let settings = {
        width: parseInt((<HTMLInputElement>document.getElementById('widthInput')).value),
        height: parseInt((<HTMLInputElement>document.getElementById('heightInput')).value),
        speed: parseInt((<HTMLInputElement>document.getElementById('speedInput')).value)
    };
    
    return settings;
}

// Build <table> HTML.
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

// Update <table> cells with live or dead class name.
function updateViewHtml(): void {
    
    for (let r = 0; r < game.grid.height; r++) {

        for (let c = 0; c < game.grid.width; c++) {

            let cell: Cell = game.grid.getCell(r, c);
            let htmlCell = document.getElementById(`row-${r}-col-${c}`);

            htmlCell.setAttribute('class', cell.isAlive ? 'live' : 'dead');
        }
    }

}

// Initialise game with settings from the view and output starting <table> HTML.
export function initGame(): void {

    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    let settings = getSettings();

    game = new Game(settings.height, settings.width, settings.speed, 0);
    
    outputDiv.append(buildTableHtml(game));
    updateViewHtml();

}

// Begin game iterations, updating <table> cells for each iteration.
export function playGame(): void {

    if (!gameInProgress) {
        iterate = setInterval(() => {

            if (game.currentIteration < game.maxIterations) {
                game.nextIteration();
                game.currentIteration++;
                updateViewHtml();
            }
            else {
                stopGame();
            }

        }, game.speed);

        gameInProgress = true;
    }

}

// Stop/pause the game.
export function stopGame(): void {
    gameInProgress = false;
    clearInterval(iterate);
}

// Reset everything to default state with new random grid.
export function resetGame(): void {
    stopGame();
    setDefaults();
    initGame();
}

// Apply changes in game settings.
export function applyChanges(): void {

    if (gameInProgress) {
        stopGame();
        initGame();
        playGame();
    }
    else {
        initGame();
    }
    
}
