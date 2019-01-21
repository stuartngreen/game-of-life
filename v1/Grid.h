// Interface file for class "Grid".
// The following is available:
//  # Grid(): Default constructor which uses default grid dimensions.
//  # Grid(int, int): Overloaded constructor that accepts grid dimensions as input and calls the
//    createGrid() member function.
//  # ~Grid(): A destructor.
//  # playGame(int): A function which accepts a number of iterations and starts the game.
//  # randomBool(): A function that returns true or false randomly.
//  # isLiveCell(int, int, bool**): A function that checks if a cell in a grid is live or dead.
//  # compareGrids(bool**, bool**): A function to compare grids for equality.
//  # createGrids(int, int): A function that creates two grids for use when processing and printing.
//  # processGrids(bool**, bool**): A function that populates the second grid with values depending
//    on the first grid.
//  # print(bool**, int): A function to output the grid and iteration count to the console.

#ifndef GRID_H
#define GRID_H

#include <iostream>
#include <ctime>        // For srand();
#include <windows.h>    // For Sleep();

using namespace std;

class Grid
{
public:
    Grid();
    Grid(int gridW, int gridH);
    ~Grid();
    void playGame(int maxIterations);

private:
    int gridW;
    int gridH;
    const char liveChar = 219;
    const char deadChar = 177;
    bool** gridA;
    bool** gridB;

    bool randomBool() const;
    bool isLiveCell(int gridRow, int gridCol, bool** currentGrid) const;
    bool compareGrids(bool** currentGrid, bool** otherGrid) const;
    void createGrids(int gridW, int gridH);
    void processGrid(bool** currentGrid, bool** otherGrid);
    void print(bool** currentGrid, int gameIteration) const;
};

#endif
