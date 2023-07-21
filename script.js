const GameGrid = (() => {
  const grid = ["", "", "", "", "", "", "", "", ""];

  const getGRID = () => grid;

  const updateGrid = (index, marker) => {
    grid[index] = marker;
  };
  const restartGrid = () => {
    grid.fill("");
  };

  return {
    getGRID,
    updateGrid,
    restartGrid,
  };
})();
const Game = (() => {
  const player_x = "x";
  const player_o = "o";

  let currentPlayer = player_x;
  let gameOver = false;

  let score_x = 0;
  let score_o = 0;

  const squares = document.querySelectorAll(".square");
  const menssage = document.getElementById("menssage");

  const checkWinner = (grid, marker) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Linhas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Colunas
      [0, 4, 8],
      [2, 4, 6], // Diagonais
    ];

    return winPatterns.some((pattern) =>
      pattern.every((index) => grid[index] === marker)
    );
  };

  const checkDraw = (grid) => {
    return grid.every((square) => square !== "");
  };

  const endGAME = (textMenssage) => {
    gameOver = true;
    menssage.innerHTML = textMenssage;
  };

  const updateScore = (playerWinner) => {
    const score = document.getElementById("score");

    if (playerWinner == "x") {
      score_x++;
    } else {
      score_o++;
    }

    score.innerHTML = ` ${score_x} x ${score_o}`;
  };
  const showMarker = (playerMarker) => {
    let img = "";
    if (playerMarker == "x") {
      img = '<img src="imgs/x.png" />';
    } else {
      img = '<img src="imgs/o.png" />';
    }

    return img;
  };

  const clickLogic = (e) => {
    if (gameOver) return;

    const square = e.target;
    const index = parseInt(square.dataset.index);

    if (GameGrid.getGRID()[index] === "") {
      GameGrid.updateGrid(index, currentPlayer);
      square.innerHTML = showMarker(currentPlayer);

      if (checkWinner(GameGrid.getGRID(), currentPlayer)) {
        endGAME(`Player ${showMarker(currentPlayer)} venceu!`);
        updateScore(currentPlayer);
      } else if (checkDraw(GameGrid.getGRID())) {
        endGAME("Empate!");
      } else {
        currentPlayer = currentPlayer === player_x ? player_o : player_x;
      }
    }
  };

  const init = () => {
    squares.forEach((square) => square.addEventListener("click", clickLogic));
  };

  const restartGame = () => {
    GameGrid.restartGrid();
    squares.forEach((square) => (square.textContent = ""));
    currentPlayer = player_x;
    gameOver = false;
    menssage.innerHTML = "";
  };

  return {
    init,
    restartGame,
  };
})();

Game.init();

document.getElementById("restart").addEventListener("click", Game.restartGame);
