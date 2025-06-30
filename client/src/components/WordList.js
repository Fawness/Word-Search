import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const WordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const WordItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${props => props.found ? `
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);

    &::before {
      content: '✓';
      position: absolute;
      top: 4px;
      right: 4px;
      font-size: 12px;
      font-weight: bold;
    }
  ` : `
    background: #f8f9fa;
    color: #666;
    border: 2px solid #e9ecef;

    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 40px 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const ProgressText = styled.div`
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const WordList = ({ words, foundWords }) => {
  const progress = words.length > 0 ? (foundWords.length / words.length) * 100 : 0;

  return (
    <Container>
      <Title>Words to Find</Title>
      
      <ProgressText>
        {foundWords.length} of {words.length} words found
      </ProgressText>
      
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>

      {words.length === 0 ? (
        <EmptyState>
          No words to find yet. Start a new game!
        </EmptyState>
      ) : (
        <WordGrid>
          {words.map((word, index) => (
            <WordItem 
              key={index} 
              found={foundWords.includes(word)}
            >
              {word}
            </WordItem>
          ))}
        </WordGrid>
      )}
    </Container>
  );
};

export default WordList; 