# Tic-Tac-Toe Game with AI

This is a simple Tic-Tac-Toe game.
[Play](https://asmaa-elfatayry.github.io/Tic-Tac-Toe-Game/index.html)
## Features

- Player vs PC
- Easy (random moves) and hard (minimax algorithm) difficulty
- Score tracking
- Win detection with visual line drawing across the winning cells

## Algorithms

### Winning Matrix

The `winningMatrix` is an array of arrays that contains all possible winning combinations of indexes on the game board. This matrix is crucial for determining if a player has won. The combinations include all rows, columns, and diagonals, ensuring comprehensive coverage of potential winning scenarios.

### Minimax Algorithm

The hard mode of the AI/PC utilizes the Minimax algorithm to determine the best possible move. The algorithm operates as follows:

1. **Evaluation of Moves**: For every possible move, the AI simulates placing its marker on the board. It then recursively evaluates the board state for all possible outcomes.

2. **Maximizing and Minimizing**: The algorithm operates in two phases:

   - **Maximizing Phase**: When it's the AI's turn, it aims to maximize its score. It evaluates all possible moves and selects the one that leads to the highest score.
   - **Minimizing Phase**: Conversely, when it's the opponent's turn, the algorithm tries to minimize the AI's score by considering the worst-case scenarios. It assesses all possible responses from the opponent and selects the move that minimizes the potential score loss.

3. **Base Cases**: The algorithm checks for terminal states:

   - If the AI has won, it returns a positive score.
   - If the opponent has won, it returns a negative score.
   - If the game is a tie, it returns a neutral score.

4. **Depth of Search**: The recursion depth increases with each simulated move, allowing the AI to look ahead several moves into the future. This depth helps it make more informed decisions, considering both immediate and distant outcomes.

5. **Final Move Selection**: After evaluating all possible moves, the AI selects the one that provides the best score based on the Minimax evaluations. This ensures the AI plays optimally, making it a challenging opponent.

### Example Scenario

Imagine a board state where the AI/PC (X) is about to make a move, and the opponent/user (O) has two markers in a row. The Minimax algorithm will simulate placing an X in every empty cell, evaluating the potential outcomes. If placing X blocks the opponent from winning in the next turn, that move will be prioritized, ensuring the AI avoids immediate loss.

By leveraging this strategy, the AI/PC can make calculated decisions, ensuring it plays effectively against the user.

## What I've Learned

I’ve gained a better understanding of the Minimax algorithm, particularly how it evaluates potential moves and optimizes decision-making in games. 

## Resources

- [Minimax Algorithm Explained](https://en.wikipedia.org/wiki/Minimax)
- [Minimax Algorithm ](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/)
- [Tic-Tac-Toe AI Tutorial](https://www.scaler.com/topics/artificial-intelligence-tutorial/min-max-algorithm/)


## Contributing

Feel free to contribute by submitting issues or pull requests. Your feedback and improvements are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
