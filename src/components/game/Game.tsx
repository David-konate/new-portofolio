// components/game/Game.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = (): number[] => {
  const min = 1;
  const max = 28;
  const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 10;
  const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 10;
  return [x, y];
};

const Game: React.FC = () => {
  const initialSnake: number[][] = [
    [0, 0],
    [10, 0],
  ];

  const [snakeDots, setSnakeDots] = useState<number[][]>(initialSnake);
  const [pressedKey, setPressedKey] = useState<string>("");
  const [food, setFood] = useState<number[]>(getRandomCoordinates());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("RIGHT");
  const [speed, setSpeed] = useState<number>(200);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("snakeHighScore") || "0")
      : 0
  );

  const onGameOver = useCallback(() => {
    setGameOver(true);
    setGameStarted(false);

    // Mettre à jour le meilleur score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  }, [score, highScore]);

  const startGame = () => {
    setSnakeDots(initialSnake);
    setFood(getRandomCoordinates());
    setDirection("RIGHT");
    setSpeed(200);
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
    setPressedKey("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStarted) {
        e.preventDefault();
        switch (e.code) {
          case "ArrowUp":
          case "KeyW":
            if (direction !== "DOWN") {
              setDirection("UP");
              setPressedKey("UP");
            }
            break;
          case "ArrowDown":
          case "KeyS":
            if (direction !== "UP") {
              setDirection("DOWN");
              setPressedKey("DOWN");
            }
            break;
          case "ArrowLeft":
          case "KeyA":
            if (direction !== "RIGHT") {
              setDirection("LEFT");
              setPressedKey("LEFT");
            }
            break;
          case "ArrowRight":
          case "KeyD":
            if (direction !== "LEFT") {
              setDirection("RIGHT");
              setPressedKey("RIGHT");
            }
            break;
          default:
            break;
        }
      }
      if (e.code === "Space" && !gameStarted) {
        e.preventDefault();
        startGame();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, direction]);

  useEffect(() => {
    if (gameStarted) {
      const moveSnake = () => {
        setSnakeDots((prevSnakeDots) => {
          const dots = [...prevSnakeDots];
          let head = [...dots[dots.length - 1]];

          switch (direction) {
            case "RIGHT":
              head = [head[0] + 10, head[1]];
              break;
            case "LEFT":
              head = [head[0] - 10, head[1]];
              break;
            case "DOWN":
              head = [head[0], head[1] + 10];
              break;
            case "UP":
              head = [head[0], head[1] - 10];
              break;
            default:
              break;
          }

          dots.push(head);
          dots.shift();
          return dots;
        });
      };

      const checkIfOutOfBorders = () => {
        const head = snakeDots[snakeDots.length - 1];
        if (head[0] >= 300 || head[1] >= 300 || head[0] < 0 || head[1] < 0) {
          onGameOver();
        }
      };

      const checkIfCollapsed = () => {
        const snake = [...snakeDots];
        const head = snake[snake.length - 1];
        snake.pop();
        snake.forEach((dot) => {
          if (head[0] === dot[0] && head[1] === dot[1]) {
            onGameOver();
          }
        });
      };

      const checkIfEat = () => {
        const head = snakeDots[snakeDots.length - 1];
        if (head[0] === food[0] && head[1] === food[1]) {
          setFood(getRandomCoordinates());
          enlargeSnake();
          increaseSpeed();
          setScore((prev) => prev + 10);
        }
      };

      const enlargeSnake = () => {
        setSnakeDots((prevSnakeDots) => {
          const newSnake = [...prevSnakeDots];
          newSnake.unshift([]);
          return newSnake;
        });
      };

      const increaseSpeed = () => {
        setSpeed((prevSpeed) => (prevSpeed > 50 ? prevSpeed - 10 : prevSpeed));
      };

      const interval = setInterval(() => {
        moveSnake();
        checkIfOutOfBorders();
        checkIfCollapsed();
        checkIfEat();
      }, speed);

      return () => clearInterval(interval);
    }
  }, [gameStarted, snakeDots, direction, food, speed, onGameOver]);

  const handleDirectionChange = (newDirection: string) => {
    if (!gameStarted) return;

    if (
      (newDirection === "UP" && direction !== "DOWN") ||
      (newDirection === "DOWN" && direction !== "UP") ||
      (newDirection === "LEFT" && direction !== "RIGHT") ||
      (newDirection === "RIGHT" && direction !== "LEFT")
    ) {
      setDirection(newDirection);
      setPressedKey(newDirection);
    }
  };

  return (
    <div className="game-container">
      {/* Score Board */}
      <div className="flex justify-between items-center mb-4">
        <div className="current-score">Score: {score}</div>
        <div className="current-score">Record: {highScore}</div>
      </div>

      {/* Game Board */}
      <div className="game-board">
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button onClick={startGame} className="start-game-button">
              Commencer
            </button>
          </div>
        )}

        {gameOver && (
          <div className="game-over-modal">
            <h2 className="game-over-title">Game Over!</h2>
            <div className="game-over-divider"></div>
            <p className="game-over-score">Score: {score}</p>
            {score === highScore && score > 0 && (
              <p className="text-yellow-300 text-sm mt-2 font-bold animate-pulse">
                🎉 Nouveau record ! 🎉
              </p>
            )}
            <button
              onClick={startGame}
              className="start-game-button mt-4 text-sm py-2"
            >
              Rejouer
            </button>
          </div>
        )}

        {gameStarted && (
          <>
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
          </>
        )}
      </div>

      {/* Control Pad */}
      <div className="control-pad">
        {/* Up Button */}
        <button
          onClick={() => handleDirectionChange("UP")}
          className={`control-button ${pressedKey === "UP" ? "active" : ""}`}
        >
          ↑
        </button>

        {/* Left, Down, Right Buttons */}
        <div className="control-row">
          <button
            onClick={() => handleDirectionChange("LEFT")}
            className={`control-button ${pressedKey === "LEFT" ? "active" : ""}`}
          >
            ←
          </button>
          <button
            onClick={() => handleDirectionChange("DOWN")}
            className={`control-button ${pressedKey === "DOWN" ? "active" : ""}`}
          >
            ↓
          </button>
          <button
            onClick={() => handleDirectionChange("RIGHT")}
            className={`control-button ${pressedKey === "RIGHT" ? "active" : ""}`}
          >
            →
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mt-4 text-muted text-sm">
        <p>Utilisez les flèches ← ↑ → ↓ ou WASD</p>
        <p className="text-xs mt-1">Appuyez sur Espace pour commencer</p>
      </div>
    </div>
  );
};

export default Game;
