// Implementation file containing all function definitions for class "Grid".
#include "Grid.h"

// Default constructor
Grid::Grid()
{
    cout << " No grid size provided. Creating a 25x15 grid." << endl;
    createGrids(25, 15);
}

// Overloaded constructor which accepts grid dimensions.
Grid::Grid(int gridW, int gridH)
{
    createGrids(gridW, gridH);
}

// Destructor
Grid::~Grid()
{
    delete[] gridA;
    delete[] gridB;
}

// Function to return random bool value.
bool Grid::randomBool() const
{
    int randomBool = rand() % 2;
    return randomBool;
}

// Function to check if a cell in the grid contains a live or dead cell.
bool Grid::isLiveCell(int gridRow, int gridCol, bool** currentGrid) const
{
    return (currentGrid[gridRow][gridCol]);
}

// Function to compare the contents of two grids for equality.
bool Grid::compareGrids(bool** currentGrid, bool** otherGrid) const
{
    for (int i = 0; i < gridH; i++)
    {
        for (int j = 0; j < gridW; j++)
        {
            if (currentGrid[i][j] != otherGrid[i][j])
                return false;
        }
    }
    return true;
}

// Function to generate two grids of the provided size:
// One is an 'empty' grid which will be used to record new values for each cell for each
// iteration of the game. All values are initialised as 'false'. The other grid is initialised with
// random bool values ('true' = live, and 'false' = dead) and is the starting grid for the game.
void Grid::createGrids(int gridW, int gridH)
{
    // To get a different grid each time the program is run.
    srand(time(0));

    // Set member variables for grid dimensions to provided values.
    this->gridW = gridW;
    this->gridH = gridH;

    // Create two pointer arrays for the rows of the grids.
    gridA = new bool* [gridH];
    gridB = new bool* [gridH];

    // Create a bool array for each row of the grids.
    for (int i = 0; i < gridH; i++)
    {
        gridA[i] = new bool[gridW];
        gridB[i] = new bool[gridW];

        // Assign random bool value to each array item of the starting grid, and 'false'
        // value to each array item of the second grid.
        for (int j = 0; j < gridW; j++)
        {
            gridA[i][j] = randomBool();
            gridB[i][j] = false;
        }
    }
}

// A function that checks cells in the first grid and populates the corresponding cell in the second
// grid, based on the rules of the game.
void Grid::processGrid(bool** currentGrid, bool** otherGrid)
{
    int liveCells = 0;
    int liveNeighbours = 0;

    // Begin processing the whole grid.
    for (int currentRow = 0; currentRow < gridH; currentRow++)
    {
        for (int currentCol = 0; currentCol < gridW; currentCol++)
        {
            liveCells = 0;
            liveNeighbours = 0;

            // Check for live cells in a 3x3 surrounding area, where the current cell is in the middle.
            // Based on the current cell's position, get the correct values for the iteration range.
            for (int i = currentRow - 1; i <= currentRow + 1; i++)
            {
                // Make sure not to check non-existant out of bounds rows.
                if (i >= 0 && i < gridH)
                {
                    for (int j = currentCol - 1; j <= currentCol + 1; j++)
                    {
                        // Make sure not to check non-existant out of bounds cols.
                        if (j >= 0 && j < gridW)
                        {
                            // If a live cell is encountered in the 3x3 area, increment the count.
                            if (isLiveCell(i, j, currentGrid))
                                liveCells++;
                        }
                    }
                }
            }

            // If the currently selected cell is live, reduce the number of live cells found by one
            // because we want the count of the live neighbours only.
            if (isLiveCell(currentRow, currentCol, currentGrid))
            {
                liveNeighbours = liveCells - 1;
                //cout << "[" << currentRow << "]" << "[" << currentCol << "] / live / liveNeighbours: " << liveNeighbours << endl;

                // Apply the rules of the game for a live cell and insert appropriate value in the second grid.
                if (liveNeighbours == 2 || liveNeighbours == 3)
                    otherGrid[currentRow][currentCol] = true;
                else
                    otherGrid[currentRow][currentCol] = false;
            }
            else
            {
                liveNeighbours = liveCells;
                //cout << "[" << currentRow << "]" << "[" << currentCol << "] / dead / liveNeighbours: " << liveNeighbours << endl;

                // Apply the rules of the game for a dead cell and insert appropriate value in the second grid.
                if (liveNeighbours == 3)
                    otherGrid[currentRow][currentCol] = true;
                else
                    otherGrid[currentRow][currentCol] = false;
            }
        }
    }
}

// Function to print the contents of a grid to the console.
void Grid::print(bool** currentGrid, int gameIteration) const
{
    cout << "\n CONWAY'S GAME OF LIFE. Iteration: " << gameIteration << endl << endl;
    for (int i = 0; i < gridH; i++)
    {
        cout << "\t";
        for (int j = 0; j < gridW; j++)
        {
            // Print out a block for 'true' values (live) and a space for 'false' values (dead).
            cout << (currentGrid[i][j] ? liveChar : deadChar);
        }
        cout << endl;
    }
}

// Function that handles the switching of grids for processing and displaying, and the game
// ending conditions.
void Grid::playGame(int maxIterations)
{
    bool processGridA = true;
    bool gameOver = false;
    int gameIteration = 0;

    // Alternate between the grids for processing based on a bool that flips for each iteration.
    do
    {
        if (processGridA)
        {
            processGrid(gridA, gridB);
            processGridA = false;
            print(gridB, gameIteration);
        }
        else
        {
            processGrid(gridB, gridA);
            processGridA = true;
            print(gridA, gameIteration);
        }

        gameIteration++;

        // Pause (for 100ms) before clearing screen so the grid is visible.
        Sleep(100);
        system("cls");

        // End the game if the grids match each other (i.e. nothing is changing).
        if (compareGrids(gridA, gridB))
            gameOver = true;
    }
    while (gameOver == false && gameIteration < maxIterations);

    // Output the final grid to the console.
    if (processGridA)
        print(gridA, gameIteration);
    else
        print(gridB, gameIteration);
}
