import React from 'react';
import { StyledScreen } from "./styles";
import { useKeyDown } from "../hooks/useKeyDown";

type QuestionProps = {
  onClickGood: () => void, onClickBad: () => void, onClose: () => void
};

export const Question: React.FC<QuestionProps> = ({ onClickGood, onClickBad, onClose }) => {
  useKeyDown('Escape', onClose);
  return (
    <StyledScreen data-testid="question-screen">
      <header>How was your experience?</header>
      <button
        onClick={onClickGood}
        data-testid="good-button"
        data-variant="good"
      >
        Good
        </button>
      <button onClick={onClickBad} data-testid="bad-button" data-variant="bad">
        Bad
        </button>
      <button data-testid="close-button" title="close" onClick={onClose} />
    </StyledScreen>
  );
}