import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WordSearchGrid from './components/WordSearchGrid';
import ConfigurationPanel from './components/ConfigurationPanel';
import WordList from './components/WordList';
import GameStats from './components/GameStats';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: white;
`;

const ErrorMessage = styled.div`
  background: #ff6b6b;
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
`;

function App() {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [config, setConfig] = useState({
    theme: 'nature',
    size: 15,
    difficulty: 'medium'
  });

  const generatePuzzle = async (newConfig = config) => {
    setLoading(true);
    setError(null);
    setFoundWords([]);
    
    try {
      const response = await axios.get('/api/puzzle', {
        params: newConfig
      });
      setPuzzle(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate puzzle');
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    generatePuzzle(newConfig);
  };

  const handleWordFound = (word) => {
    if (!foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
    }
  };

  const isGameComplete = puzzle && foundWords.length === puzzle.words.length;

  useEffect(() => {
    generatePuzzle();
  }, []);

  return (
    <AppContainer>
      <Header>
        <Title>Word Search Puzzle</Title>
        <Subtitle>Find all the hidden words in the grid</Subtitle>
      </Header>

      <MainContent>
        <ConfigurationPanel 
          config={config}
          onConfigChange={handleConfigChange}
          onNewGame={() => generatePuzzle()}
        />

        <GameContainer>
          {loading && (
            <LoadingSpinner>
              Generating puzzle...
            </LoadingSpinner>
          )}

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          {puzzle && !loading && (
            <>
              <WordSearchGrid 
                grid={puzzle.grid}
                solutions={puzzle.solutions}
                onWordFound={handleWordFound}
                foundWords={foundWords}
              />
              
              {isGameComplete && (
                <div style={{ 
                  background: '#4CAF50', 
                  color: 'white', 
                  padding: '16px', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  🎉 Congratulations! You found all the words! 🎉
                </div>
              )}
            </>
          )}
        </GameContainer>

        <div>
          <WordList 
            words={puzzle?.words || []}
            foundWords={foundWords}
          />
          <GameStats 
            totalWords={puzzle?.words?.length || 0}
            foundWords={foundWords.length}
            isComplete={isGameComplete}
          />
        </div>
      </MainContent>
    </AppContainer>
  );
}

export default App; 