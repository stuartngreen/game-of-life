import { Cell } from './entities/cell';
import { Game } from './models/game';

export function main() {

    let width: number = parseInt((<HTMLInputElement>document.getElementById('widthInput')).value);
    let height: number = parseInt((<HTMLInputElement>document.getElementById('heightInput')).value);

    let game = new Game(width, height);
    
    game.randomiseGrid();

    render(game);

}

function render(game: Game): void {

    const div: HTMLElement = document.getElementById('output');
    const table: HTMLElement = buildHtmlTable(game);
    
    div.innerHTML = '';
    div.appendChild(table);

}

function buildHtmlTable(game: Game): HTMLElement {

    let table: HTMLElement = document.createElement('table');
    table.setAttribute('class', 'game-table')

    for (let r = 0; r < game.gridHeight; r++) {

        let tr = document.createElement('tr');

        for (let c = 0; c < game.gridWidth; c++) {

            let cell: Cell = game.getGridCell(r, c);

            let td = document.createElement('td');
            td.setAttribute('id', `row-${r}-col-${c}`);

            if (cell.isAlive) {
                td.setAttribute('class', 'live-cell');
            }
            else {
                td.setAttribute('class', 'dead-cell');
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
}
