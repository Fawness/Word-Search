# Word Search Puzzle Game

A modern, customizable browser-based word search application built with Node.js and React. Features multiple themes, adjustable difficulty levels, and responsive design.

## 🎮 Features

- **Multiple Themes**: Nature, Animals, Space, Food, Sports, and Deer
- **Customizable Grid Sizes**: From 8x8 to 20x20
- **Difficulty Levels**: Easy, Medium, and Hard
- **Interactive Gameplay**: Click and drag to select words
- **Word Highlighting**: Found words are permanently highlighted
- **Progress Tracking**: Real-time progress and completion status
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Touch Support**: Full touch support for mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd word-search-app
   ```

2. **Install dependencies**
   ```bash
   # Install both server and client dependencies
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   # This will start both the backend (port 5000) and frontend (port 3000)
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
word-search-app/
├── server/
│   └── index.js          # Express server with puzzle generation logic
├── client/
│   ├── public/
│   │   └── index.html    # Main HTML file
│   ├── src/
│   │   ├── components/
│   │   │   ├── WordSearchGrid.js      # Interactive game grid
│   │   │   ├── ConfigurationPanel.js  # Settings panel
│   │   │   ├── WordList.js            # Word list display
│   │   │   └── GameStats.js           # Progress tracking
│   │   ├── App.js        # Main React component
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Global styles
│   └── package.json      # Client dependencies
├── package.json          # Server dependencies and scripts
└── README.md            # This file
```

## 🎯 How to Play

1. **Configure Your Game**:
   - Choose a theme (Nature, Animals, Space, Food, Sports, or Deer)
   - Select grid size (8x8 to 20x20)
   - Pick difficulty level (Easy, Medium, or Hard)

2. **Find Words**:
   - Click and drag to select letters
   - Words can be found horizontally, vertically, and diagonally
   - Words can be read forwards or backwards
   - Found words are highlighted and marked as complete

3. **Track Progress**:
   - Monitor your progress in the word list
   - View completion statistics
   - Celebrate when you find all words!

## 🔧 Available Scripts

- `npm run dev` - Start both development servers
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run build` - Build the React app for production
- `npm run install-all` - Install dependencies for both server and client

## 🌐 API Endpoints

- `GET /api/puzzle` - Generate a new puzzle
  - Query parameters: `theme`, `size`, `difficulty`
- `GET /api/themes` - Get available themes
- `GET /api/health` - Health check endpoint

## 🎨 Themes

Each theme includes carefully curated word lists:

- **Nature**: Forest, River, Mountain, Ocean, Sunset, Wildflower, Butterfly, Eagle, etc.
- **Animals**: Elephant, Giraffe, Lion, Tiger, Panda, Dolphin, Eagle, Penguin, etc.
- **Space**: Planet, Star, Galaxy, Nebula, Asteroid, Comet, Orbit, Telescope, etc.
- **Food**: Pizza, Burger, Sushi, Pasta, Salad, Sandwich, Taco, Steak, etc.
- **Sports**: Football, Basketball, Baseball, Soccer, Tennis, Golf, Swimming, etc.
- **Deer**: Whitetail, Mule Deer, Elk, Moose, Caribou, Reindeer, Fallow, Roe Deer, etc.

## 🎮 Difficulty Levels

- **Easy**: 5 words, simpler placement
- **Medium**: 8 words, balanced challenge
- **Hard**: 12 words, complex placement patterns

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Frontend
- **React** - UI library
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **React Scripts** - Build tools

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
1. Build the React app:
   ```bash
   npm run build
   ```

2. Set environment variables:
   ```bash
   NODE_ENV=production
   PORT=5000
   ```

3. Start the server:
   ```bash
   npm run server
   ```

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding new themes
- Improving the word selection algorithm
- Enhancing the UI/UX
- Adding new features
- Fixing bugs

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Enjoy Playing!

Have fun solving word search puzzles! The game is designed to be both challenging and enjoyable for players of all ages. 