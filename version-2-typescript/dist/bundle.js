(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GameOfLife = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cell {
    constructor(r, c, isAlive = false) {
        this.r = r;
        this.c = c;
        this.isAlive = isAlive;
    }
}
exports.Cell = Cell;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = require("./cell");
class Grid {
    constructor(height = 10, width = 10) {
        this.height = height;
        this.width = width;
        this.grid = [];
        this.createGrid();
    }
    createGrid() {
        for (let r = 0; r < this.height; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.width; c++) {
                this.grid[r][c] = new cell_1.Cell(r, c);
            }
        }
    }
    randomiseGrid() {
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                this.grid[r][c].isAlive = Math.random() >= 0.5;
            }
        }
    }
    getCell(r, c) {
        return this.grid[r][c];
    }
}
exports.Grid = Grid;

},{"./cell":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./models/game");
function main() {
    let width = parseInt(document.getElementById('widthInput').value);
    let height = parseInt(document.getElementById('heightInput').value);
    let game = new game_1.Game(width, height);
    game.randomiseGrid();
    render(game);
}
exports.main = main;
function render(game) {
    const div = document.getElementById('output');
    const table = buildHtmlTable(game);
    div.innerHTML = '';
    div.appendChild(table);
}
function buildHtmlTable(game) {
    let table = document.createElement('table');
    table.setAttribute('class', 'game-table');
    for (let r = 0; r < game.gridHeight; r++) {
        let tr = document.createElement('tr');
        for (let c = 0; c < game.gridWidth; c++) {
            let cell = game.getGridCell(r, c);
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

},{"./models/game":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("../entities/grid");
class Game {
    constructor(gridHeight, gridWidth, grid = new grid_1.Grid(gridHeight, gridWidth)) {
        this.gridHeight = gridHeight;
        this.gridWidth = gridWidth;
        this.grid = grid;
    }
    getGridCell(r, c) {
        return this.grid.getCell(r, c);
    }
    start() {
    }
    randomiseGrid() {
        this.grid.randomiseGrid();
    }
}
exports.Game = Game;

},{"../entities/grid":2}]},{},[3])(3)
});