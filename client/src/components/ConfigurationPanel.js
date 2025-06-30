import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Panel = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 12px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }

  input[type="radio"] {
    margin: 0;
  }

  input[type="radio"]:checked + span {
    color: #667eea;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ThemePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 12px;
  color: #666;
`;

const ConfigurationPanel = ({ config, onConfigChange, onNewGame }) => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('/api/themes');
        setThemes(response.data);
      } catch (error) {
        console.error('Failed to fetch themes:', error);
      }
    };
    fetchThemes();
  }, []);

  const handleThemeChange = (theme) => {
    onConfigChange({ ...config, theme });
  };

  const handleSizeChange = (size) => {
    onConfigChange({ ...config, size: parseInt(size) });
  };

  const handleDifficultyChange = (difficulty) => {
    onConfigChange({ ...config, difficulty });
  };

  const handleNewGame = () => {
    setLoading(true);
    onNewGame();
    setTimeout(() => setLoading(false), 1000);
  };

  const getThemeDescription = (theme) => {
    const descriptions = {
      nature: 'Forest, mountains, rivers, and wildlife',
      animals: 'Wild animals from around the world',
      space: 'Planets, stars, and cosmic objects',
      food: 'Delicious dishes and ingredients',
      sports: 'Athletic activities and games',
      deer: 'Species of deer from around the world'
    };
    return descriptions[theme] || '';
  };

  return (
    <Panel>
      <Title>Game Settings</Title>
      
      <Section>
        <SectionTitle>Theme</SectionTitle>
        <Select 
          value={config.theme} 
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          {themes.map(theme => (
            <option key={theme} value={theme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </option>
          ))}
        </Select>
        <ThemePreview>
          {getThemeDescription(config.theme)}
        </ThemePreview>
      </Section>

      <Section>
        <SectionTitle>Grid Size</SectionTitle>
        <Select 
          value={config.size} 
          onChange={(e) => handleSizeChange(e.target.value)}
        >
          <option value={8}>8x8 (Small)</option>
          <option value={10}>10x10 (Medium)</option>
          <option value={12}>12x12 (Large)</option>
          <option value={15}>15x15 (Extra Large)</option>
          <option value={18}>18x18 (Huge)</option>
          <option value={20}>20x20 (Massive)</option>
        </Select>
      </Section>

      <Section>
        <SectionTitle>Difficulty</SectionTitle>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={config.difficulty === 'easy'}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            />
            <span>Easy</span>
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="difficulty"
              value="medium"
              checked={config.difficulty === 'medium'}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            />
            <span>Medium</span>
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={config.difficulty === 'hard'}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            />
            <span>Hard</span>
          </RadioLabel>
        </RadioGroup>
      </Section>

      <Button 
        onClick={handleNewGame}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'New Game'}
      </Button>
    </Panel>
  );
};

export default ConfigurationPanel; 