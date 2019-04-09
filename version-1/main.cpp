// C++ implementation of Conway's Game of Life.
// The rules of the game are:
//  # A live cell with two or three live neighbours will remain alive, otherwise it dies.
//  # A dead cell with exactly three live neighbours becomes alive, otherwise it stays dead.

#include <iostream>
#include "Grid.h"

using namespace std;

int main()
{
    int gridW = 0;
    int gridH = 0;
    int maxIterations = -1;

    cout << "\n CONWAY'S GAME OF LIFE.\n Please maximise the console window." << endl << endl;

    // Get a grid width from the user.
    do
    {
        cout << " Enter a grid width (5-50): ";
        cin >> gridW;
    }
    while (gridW < 5 || gridW > 50);

    // Get a grid height from the user.
    do
    {
        cout << " Enter a grid height (5-50): ";
        cin >> gridH;
    }
    while (gridH < 5 || gridH > 50);

    // Instantiate object with grid dimensions.
    Grid gameOfLife(gridW, gridH);

    // Get a maximum number of iterations for the game.
    do
    {
        cout << " Enter a maximum number of iterations (1-500): ";
        cin >> maxIterations;
    }
    while (maxIterations < 1 || maxIterations > 500);

    // Output message and pause.
    cin.get();
    cout << "\n READY! Press any key to begin." << endl;
    cin.ignore();
    system("cls");

    // Start the game
    gameOfLife.playGame(maxIterations);

    return 0;
}
