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
const game_1 = require("./models/game");
let game;
let iterate;
function main() {
    initGame();
}
exports.main = main;
function initGame() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    let userInput = getUserInput();
    game = new game_1.Game(userInput.height, userInput.width, userInput.speed);
    game.grid.randomise();
    outputDiv.append(buildTableHtml(game));
    updateViewHtml(game);
}
function getUserInput() {
    let userInput = {
        width: parseInt(document.getElementById('widthInput').value),
        height: parseInt(document.getElementById('heightInput').value),
        speed: parseInt(document.getElementById('speedInput').value)
    };
    return userInput;
}
function buildTableHtml(game) {
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
function updateViewHtml(game) {
    for (let r = 0; r < game.grid.height; r++) {
        for (let c = 0; c < game.grid.width; c++) {
            let cell = game.grid.getCell(r, c);
            let htmlCell = document.getElementById(`row-${r}-col-${c}`);
            htmlCell.setAttribute('class', cell.isAlive ? 'live' : 'dead');
        }
    }
}
function pauseGame() {
    clearInterval(iterate);
}
exports.pauseGame = pauseGame;
function playGame() {
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
exports.playGame = playGame;
function resetGame() {
    clearInterval(iterate);
    game.currentIteration = 0;
    initGame();
}
exports.resetGame = resetGame;

},{"./models/game":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./grid");
class Game {
    constructor(height, width, speed = 50, maxIterations = Infinity, currentIteration = 0) {
        this.speed = speed;
        this.maxIterations = maxIterations;
        this.currentIteration = currentIteration;
        this.grid = new grid_1.Grid(height, width);
        this.nextGrid = new grid_1.Grid(height, width);
    }
    liveNeighbours(cell) {
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
    switchGrid() {
        let temp = this.grid;
        this.grid = this.nextGrid;
        this.nextGrid = temp;
    }
    nextIteration() {
        for (let r = 0; r < this.grid.height; r++) {
            for (let c = 0; c < this.grid.width; c++) {
                let currentCell = this.grid.getCell(r, c);
                let processCell = this.nextGrid.getCell(r, c);
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
exports.Game = Game;

},{"./grid":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = require("../entities/cell");
class Grid {
    constructor(height = 25, width = 25) {
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
    randomise() {
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                this.grid[r][c].isAlive = Math.random() >= 0.5;
            }
        }
    }
    getCell(r, c) {
        if ((r > -1 && r < this.height) &&
            (c > -1 && c < this.width)) {
            return this.grid[r][c];
        }
        return null;
    }
}
exports.Grid = Grid;

},{"../entities/cell":1}]},{},[2])(2)
});