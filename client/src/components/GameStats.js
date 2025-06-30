import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const CompletionStatus = styled.div`
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  ${props => props.complete ? `
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  ` : `
    background: #fff3cd;
    color: #856404;
    border: 2px solid #ffeaa7;
  `}
`;

const CompletionIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 8px;
`;

const TipsSection = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #e3f2fd;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
`;

const TipsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 8px;
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #1565c0;
  font-size: 14px;
  line-height: 1.5;
`;

const GameStats = ({ totalWords, foundWords, isComplete }) => {
  const remainingWords = totalWords - foundWords;
  const completionPercentage = totalWords > 0 ? Math.round((foundWords / totalWords) * 100) : 0;

  return (
    <Container>
      <Title>Game Progress</Title>
      
      <StatsGrid>
        <StatItem>
          <StatValue>{foundWords}</StatValue>
          <StatLabel>Words Found</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{remainingWords}</StatValue>
          <StatLabel>Words Remaining</StatLabel>
        </StatItem>
      </StatsGrid>

      <CompletionStatus complete={isComplete}>
        <CompletionIcon>
          {isComplete ? '🎉' : '🔍'}
        </CompletionIcon>
        {isComplete 
          ? 'Puzzle Complete!' 
          : `${completionPercentage}% Complete`
        }
      </CompletionStatus>

      {!isComplete && (
        <TipsSection>
          <TipsTitle>💡 Tips</TipsTitle>
          <TipsList>
            <li>Words can be found horizontally, vertically, and diagonally</li>
            <li>Words can be read forwards or backwards</li>
            <li>Click and drag to select multiple letters</li>
            <li>Look for common letter patterns</li>
          </TipsList>
        </TipsSection>
      )}
    </Container>
  );
};

export default GameStats; 