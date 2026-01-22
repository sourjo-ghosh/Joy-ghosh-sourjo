import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 15, y: 15 };
const GAME_SPEED = 150;

// Responsive cell size based on screen width
const getCellSize = () => {
  if (typeof window === 'undefined') return 20;
  const maxWidth = Math.min(window.innerWidth - 40, 400);
  return Math.floor(maxWidth / GRID_SIZE);
};

export const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cellSize, setCellSize] = useState(getCellSize());
  const directionRef = useRef<Position>({ x: 1, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCellSize(getCellSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = GRID_SIZE * cellSize;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, GRID_SIZE * cellSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(GRID_SIZE * cellSize, i * cellSize);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(food.x * cellSize + 2, food.y * cellSize + 2, cellSize - 4, cellSize - 4);

    // Draw snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = '#00ff00';
      } else {
        ctx.fillStyle = '#00ff88';
      }
      ctx.fillRect(segment.x * cellSize + 2, segment.y * cellSize + 2, cellSize - 4, cellSize - 4);
    });
  }, [snake, food, cellSize]);

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

  // Touch controls for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || gameOver) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      // Tap to pause
      setIsPaused((prev) => !prev);
      return;
    }

    const newDirection = { ...directionRef.current };

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0 && directionRef.current.x === 0) {
        // Swipe right
        newDirection.x = 1;
        newDirection.y = 0;
      } else if (deltaX < 0 && directionRef.current.x === 0) {
        // Swipe left
        newDirection.x = -1;
        newDirection.y = 0;
      }
    } else {
      // Vertical swipe
      if (deltaY > 0 && directionRef.current.y === 0) {
        // Swipe down
        newDirection.x = 0;
        newDirection.y = 1;
      } else if (deltaY < 0 && directionRef.current.y === 0) {
        // Swipe up
        newDirection.x = 0;
        newDirection.y = -1;
      }
    }

    directionRef.current = newDirection;
    touchStartRef.current = null;
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    directionRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const handleDirection = (dir: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver || isPaused) return;

    const newDirection = { ...directionRef.current };

    if (dir === 'up' && directionRef.current.y === 0) {
      newDirection.x = 0;
      newDirection.y = -1;
    } else if (dir === 'down' && directionRef.current.y === 0) {
      newDirection.x = 0;
      newDirection.y = 1;
    } else if (dir === 'left' && directionRef.current.x === 0) {
      newDirection.x = -1;
      newDirection.y = 0;
    } else if (dir === 'right' && directionRef.current.x === 0) {
      newDirection.x = 1;
      newDirection.y = 0;
    }

    directionRef.current = newDirection;
  };

  return (
    <div className="bg-terminal-card p-4 sm:p-6 rounded-lg border border-terminal-text-secondary/20 w-full max-w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="text-terminal-green font-semibold text-sm sm:text-base">Score: {score}</div>
        {isPaused && <div className="text-terminal-text-secondary text-sm sm:text-base">PAUSED</div>}
        {gameOver && <div className="text-terminal-red font-semibold text-sm sm:text-base">GAME OVER</div>}
      </div>
      <div className="flex justify-center mb-4 w-full overflow-hidden">
        <div className="relative inline-block">
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * cellSize}
            height={GRID_SIZE * cellSize}
            className="border-2 border-terminal-green rounded max-w-full h-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'none' }}
          />
        </div>
      </div>
      
      {/* Mobile Touch Controls */}
      <div className="md:hidden mb-4">
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          <div></div>
          <button
            onClick={() => handleDirection('up')}
            disabled={gameOver || isPaused}
            className="bg-terminal-card border-2 border-terminal-green text-terminal-green p-4 rounded-lg active:bg-terminal-green/20 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            aria-label="Move Up"
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => handleDirection('left')}
            disabled={gameOver || isPaused}
            className="bg-terminal-card border-2 border-terminal-green text-terminal-green p-4 rounded-lg active:bg-terminal-green/20 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            aria-label="Move Left"
          >
            ←
          </button>
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            disabled={gameOver}
            className="bg-terminal-card border-2 border-terminal-green text-terminal-green p-2 rounded-lg active:bg-terminal-green/20 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-xs"
            aria-label="Pause"
          >
            ⏸
          </button>
          <button
            onClick={() => handleDirection('right')}
            disabled={gameOver || isPaused}
            className="bg-terminal-card border-2 border-terminal-green text-terminal-green p-4 rounded-lg active:bg-terminal-green/20 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            aria-label="Move Right"
          >
            →
          </button>
          <div></div>
          <button
            onClick={() => handleDirection('down')}
            disabled={gameOver || isPaused}
            className="bg-terminal-card border-2 border-terminal-green text-terminal-green p-4 rounded-lg active:bg-terminal-green/20 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation col-span-3"
            aria-label="Move Down"
          >
            ↓
          </button>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="text-xs sm:text-sm text-terminal-text-secondary">
          <span className="hidden md:inline">Use Arrow Keys or WASD to play | Space to pause</span>
          <span className="md:hidden">Swipe on canvas or use buttons to play | Tap to pause</span>
        </div>
        {gameOver && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={resetGame}
            className="px-6 py-2 bg-terminal-green text-terminal-bg font-semibold rounded hover:bg-terminal-success transition-all touch-manipulation"
          >
            Play Again
          </motion.button>
        )}
      </div>
    </div>
  );
};

