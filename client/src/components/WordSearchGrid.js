import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 1fr);
  gap: 2px;
  background: #e9ecef;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  user-select: none;
  touch-action: none;
`;

const Cell = styled.div`
  width: ${props => props.cellSize}px;
  height: ${props => props.cellSize}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    if (props.isSelected) return '#667eea';
    if (props.isHighlighted) return '#a8b4f5';
    return 'white';
  }};
  color: ${props => props.isSelected ? 'white' : '#333'};
  font-weight: ${props => props.isSelected ? '700' : '500'};
  font-size: ${props => props.fontSize}px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${props => props.isSelected ? '#667eea' : '#f8f9fa'};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: ${props => props.mobileCellSize}px;
    height: ${props => props.mobileCellSize}px;
    font-size: ${props => props.mobileFontSize}px;
  }
`;

const Instructions = styled.div`
  text-align: center;
  color: white;
  font-size: 1.1rem;
  max-width: 400px;
  line-height: 1.6;
`;

const WordSearchGrid = ({ grid, solutions, onWordFound, foundWords }) => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const gridRef = useRef(null);

  const size = grid.length;
  const cellSize = Math.max(30, Math.min(50, 600 / size));
  const fontSize = Math.max(14, Math.min(20, 500 / size));
  const mobileCellSize = Math.max(25, Math.min(40, 350 / size));
  const mobileFontSize = Math.max(12, Math.min(16, 400 / size));

  // Check if selected cells form a valid word
  const checkWord = (cells) => {
    if (cells.length < 3) return null;

    const word = cells.map(cell => grid[cell.row][cell.col]).join('');
    
    // Check if word exists in solutions
    const solution = solutions.find(sol => sol.word === word);
    if (solution) {
      return solution;
    }

    // Check reverse word
    const reverseWord = word.split('').reverse().join('');
    const reverseSolution = solutions.find(sol => sol.word === reverseWord);
    if (reverseSolution) {
      return { ...reverseSolution, word: reverseWord };
    }

    return null;
  };

  // Get cells in a line between two points
  const getCellsInLine = (start, end) => {
    const cells = [];
    const dx = end.col - start.col;
    const dy = end.row - start.row;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    if (steps === 0) return [start];

    for (let i = 0; i <= steps; i++) {
      const row = start.row + Math.round((dy * i) / steps);
      const col = start.col + Math.round((dx * i) / steps);
      cells.push({ row, col });
    }
    
    return cells;
  };

  const handleMouseDown = (row, col) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row, col) => {
    if (!isSelecting || selectedCells.length === 0) return;

    const start = selectedCells[0];
    const end = { row, col };
    const cellsInLine = getCellsInLine(start, end);
    setSelectedCells(cellsInLine);
  };

  const handleMouseUp = () => {
    if (selectedCells.length >= 3) {
      const solution = checkWord(selectedCells);
      if (solution && !foundWords.includes(solution.word)) {
        onWordFound(solution.word);
        setHighlightedCells(prev => [...prev, ...selectedCells]);
      }
    }
    
    setIsSelecting(false);
    setSelectedCells([]);
  };

  const handleTouchStart = (e, row, col) => {
    e.preventDefault();
    handleMouseDown(row, col);
  };

  const handleTouchMove = (e) => {
    if (!isSelecting) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const cell = element?.closest('[data-cell]');
    
    if (cell) {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      handleMouseEnter(row, col);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleMouseUp();
  };

  // Clear highlights when new puzzle is loaded
  useEffect(() => {
    setHighlightedCells([]);
  }, [grid]);

  return (
    <GridContainer>
      <Instructions>
        Click and drag to select words. Words can be found horizontally, vertically, and diagonally.
      </Instructions>
      
      <Grid 
        ref={gridRef}
        size={size}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              data-cell
              data-row={rowIndex}
              data-col={colIndex}
              cellSize={cellSize}
              fontSize={fontSize}
              mobileCellSize={mobileCellSize}
              mobileFontSize={mobileFontSize}
              isSelected={selectedCells.some(c => c.row === rowIndex && c.col === colIndex)}
              isHighlighted={highlightedCells.some(c => c.row === rowIndex && c.col === colIndex)}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseUp={handleMouseUp}
              onTouchStart={(e) => handleTouchStart(e, rowIndex, colIndex)}
            >
              {cell}
            </Cell>
          ))
        )}
      </Grid>
    </GridContainer>
  );
};

export default WordSearchGrid; 