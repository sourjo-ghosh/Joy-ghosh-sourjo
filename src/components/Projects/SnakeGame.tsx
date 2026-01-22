import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 15, y: 15 };
const GAME_SPEED = 150;

export const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef<Position>({ x: 1, y: 0 });

  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    return body.some((segment) => segment.x === head.x && segment.y === head.y);
  }, []);

  const gameLoop = useCallback(() => {
    if (isPaused || gameOver) return;

    setSnake((prevSnake) => {
      const newHead = {
        x: prevSnake[0].x + directionRef.current.x,
        y: prevSnake[0].y + directionRef.current.y,
      };

      if (checkCollision(newHead, prevSnake)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood());
        return newSnake;
      }

      return newSnake.slice(0, -1);
    });
  }, [food, checkCollision, generateFood, isPaused, gameOver]);

  useEffect(() => {
    const interval = setInterval(gameLoop, GAME_SPEED);
    return () => clearInterval(interval);
  }, [gameLoop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(food.x * CELL_SIZE + 2, food.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);

    // Draw snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = '#00ff00';
      } else {
        ctx.fillStyle = '#00ff88';
      }
      ctx.fillRect(segment.x * CELL_SIZE + 2, segment.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    });
  }, [snake, food]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;

    const key = e.key.toLowerCase();
    const newDirection = { ...directionRef.current };

    if (key === 'arrowup' || key === 'w') {
      if (directionRef.current.y === 0) {
        newDirection.x = 0;
        newDirection.y = -1;
      }
    } else if (key === 'arrowdown' || key === 's') {
      if (directionRef.current.y === 0) {
        newDirection.x = 0;
        newDirection.y = 1;
      }
    } else if (key === 'arrowleft' || key === 'a') {
      if (directionRef.current.x === 0) {
        newDirection.x = -1;
        newDirection.y = 0;
      }
    } else if (key === 'arrowright' || key === 'd') {
      if (directionRef.current.x === 0) {
        newDirection.x = 1;
        newDirection.y = 0;
      }
    } else if (key === ' ') {
      e.preventDefault();
      setIsPaused((prev) => !prev);
      return;
    }

    directionRef.current = newDirection;
  }, [gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    directionRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="bg-terminal-card p-6 rounded-lg border border-terminal-text-secondary/20">
      <div className="flex justify-between items-center mb-4">
        <div className="text-terminal-green font-semibold">Score: {score}</div>
        {isPaused && <div className="text-terminal-text-secondary">PAUSED</div>}
        {gameOver && <div className="text-terminal-red font-semibold">GAME OVER</div>}
      </div>
      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="border-2 border-terminal-green rounded"
        />
      </div>
      <div className="text-center space-y-2">
        <div className="text-sm text-terminal-text-secondary">
          Use Arrow Keys or WASD to play | Space to pause
        </div>
        {gameOver && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={resetGame}
            className="px-6 py-2 bg-terminal-green text-terminal-bg font-semibold rounded hover:bg-terminal-success transition-all"
          >
            Play Again
          </motion.button>
        )}
      </div>
    </div>
  );
};

