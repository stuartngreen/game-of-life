import { expect } from "chai";
import "mocha";
import { Grid } from "../models/grid";

describe("Grid Tests", () => {

    let grid: Grid;

    beforeEach(() => {
        grid = new Grid(10,10);
    });

    it("should return cell with valid parameters", () => {
        let cell = grid.getCell(4,5);
        expect(cell).to.be.not.undefined;
        expect(cell.r).to.be.equal(4);
        expect(cell.c).to.be.equal(5);
    });

    it("should return null with invalid parameters", () => {
        let cell = grid.getCell(-1,-1);
        expect(cell).to.be.null;
    });

});
