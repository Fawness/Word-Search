const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Word lists for different themes
const wordLists = {
  nature: [
    'FOREST', 'RIVER', 'MOUNTAIN', 'OCEAN', 'SUNSET', 'WILDFLOWER', 'BUTTERFLY', 'EAGLE',
    'WATERFALL', 'MEADOW', 'CANYON', 'GLACIER', 'VOLCANO', 'DESERT', 'RAINFOREST', 'TUNDRA'
  ],
  animals: [
    'ELEPHANT', 'GIRAFFE', 'LION', 'TIGER', 'PANDA', 'DOLPHIN', 'EAGLE', 'PENGUIN',
    'KANGAROO', 'KOALA', 'ZEBRA', 'RHINO', 'GORILLA', 'CHEETAH', 'POLARBEAR', 'WOLF'
  ],
  space: [
    'PLANET', 'STAR', 'GALAXY', 'NEBULA', 'ASTEROID', 'COMET', 'ORBIT', 'TELESCOPE',
    'SPACESHIP', 'ASTRONAUT', 'METEOR', 'CONSTELLATION', 'BLACKHOLE', 'SUPERNOVA', 'SATELLITE', 'ROCKET'
  ],
  food: [
    'PIZZA', 'BURGER', 'SUSHI', 'PASTA', 'SALAD', 'SANDWICH', 'TACO', 'STEAK',
    'CHICKEN', 'FISH', 'RICE', 'BREAD', 'CHEESE', 'FRUIT', 'VEGETABLE', 'DESSERT'
  ],
  sports: [
    'FOOTBALL', 'BASKETBALL', 'BASEBALL', 'SOCCER', 'TENNIS', 'GOLF', 'SWIMMING', 'RUNNING',
    'VOLLEYBALL', 'HOCKEY', 'BOXING', 'WRESTLING', 'GYMNASTICS', 'SKIING', 'SURFING', 'CYCLING'
  ],
  deer: [
    'WHITETAIL', 'MULEDEER', 'ELK', 'MOOSE', 'CARIBOU', 'REINDEER', 'FALLOW', 'ROEDEER',
    'SAMBAR', 'AXIS', 'CHITAL', 'BARASINGHA', 'HOGDEER', 'MUSKDEER', 'WATERDEER', 'MUNTJAC'
  ]
};

// Generate random letters
function generateRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
}

// Check if a word can be placed at a given position and direction
function canPlaceWord(grid, word, row, col, direction) {
  const directions = {
    horizontal: [0, 1],
    vertical: [1, 0],
    diagonal: [1, 1],
    diagonalBack: [1, -1],
    horizontalBack: [0, -1],
    verticalBack: [-1, 0],
    diagonalBackUp: [-1, -1],
    diagonalUp: [-1, 1]
  };

  const [dr, dc] = directions[direction];
  
  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dr;
    const newCol = col + i * dc;
    
    if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
      return false;
    }
    
    if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
      return false;
    }
  }
  
  return true;
}

// Place a word in the grid
function placeWord(grid, word, row, col, direction) {
  const directions = {
    horizontal: [0, 1],
    vertical: [1, 0],
    diagonal: [1, 1],
    diagonalBack: [1, -1],
    horizontalBack: [0, -1],
    verticalBack: [-1, 0],
    diagonalBackUp: [-1, -1],
    diagonalUp: [-1, 1]
  };

  const [dr, dc] = directions[direction];
  
  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dr;
    const newCol = col + i * dc;
    grid[newRow][newCol] = word[i];
  }
}

// Generate word search puzzle
function generatePuzzle(theme, size, difficulty) {
  const words = wordLists[theme] || wordLists.nature;
  const maxWords = Math.min(words.length, Math.floor(size * size / 8));
  
  // Select words based on difficulty
  let selectedWords;
  switch (difficulty) {
    case 'easy':
      selectedWords = words.slice(0, Math.min(5, maxWords));
      break;
    case 'medium':
      selectedWords = words.slice(0, Math.min(8, maxWords));
      break;
    case 'hard':
      selectedWords = words.slice(0, Math.min(12, maxWords));
      break;
    default:
      selectedWords = words.slice(0, Math.min(8, maxWords));
  }

  // Create empty grid
  const grid = Array(size).fill().map(() => Array(size).fill(''));
  
  const directions = ['horizontal', 'vertical', 'diagonal', 'diagonalBack'];
  const placedWords = [];
  
  // Try to place each word
  for (const word of selectedWords) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (!placed && attempts < maxAttempts) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (canPlaceWord(grid, word, row, col, direction)) {
        placeWord(grid, word, row, col, direction);
        placedWords.push({
          word,
          row,
          col,
          direction
        });
        placed = true;
      }
      attempts++;
    }
  }
  
  // Fill empty cells with random letters
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = generateRandomLetter();
      }
    }
  }
  
  return {
    grid,
    words: placedWords.map(w => w.word),
    solutions: placedWords
  };
}

// API Routes
app.get('/api/puzzle', (req, res) => {
  try {
    const { theme = 'nature', size = 15, difficulty = 'medium' } = req.query;
    
    if (!wordLists[theme]) {
      return res.status(400).json({ error: 'Invalid theme' });
    }
    
    if (size < 8 || size > 20) {
      return res.status(400).json({ error: 'Size must be between 8 and 20' });
    }
    
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({ error: 'Invalid difficulty' });
    }
    
    const puzzle = generatePuzzle(theme, parseInt(size), difficulty);
    res.json(puzzle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate puzzle' });
  }
});

app.get('/api/themes', (req, res) => {
  res.json(Object.keys(wordLists));
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Word Search API is running' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 