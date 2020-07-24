import React from "react";
import { useReducer } from "react";
import { StyledScreen } from "./styles";

type QuestionScreenProps = {
  onClickGood: () => void, onClickBad: () => void, onClose: () => void
};
const QuestionScreen: React.FC<QuestionScreenProps> = ({ onClickGood, onClickBad, onClose }) => {
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

type FormScreenProps = {
  onSubmit: ({value:any}) => void, onClose: () => void,
};
const FormScreen: React.FC<FormScreenProps> = ({ onSubmit, onClose }) => {

  return (
    <StyledScreen
      as="form"
      data-testid="form-screen"
      onSubmit={e => {
        e.preventDefault();
        const { response } = e.target.elements;

        onSubmit({
          value: response
        });
      }}
    >
      <header>Care to tell us why?</header>
      <textarea
        data-testid="response-input"
        name="response"
        placeholder="Complain here"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            e.stopPropagation();
          }
        }}
      />
      <button data-testid="submit-button">Submit</button>
      <button
        data-testid="close-button"
        title="close"
        type="button"
        onClick={onClose}
      />
    </StyledScreen>
  );
}

type ThanksScreenProps = {
  onClose: () => void,
};
const ThanksScreen: React.FC<ThanksScreenProps> = ({ onClose }) => {

  return (
    <StyledScreen data-testid="thanks-screen">
      <header>Thanks for your feedback.</header>
      <button data-testid="close-button" title="close" onClick={onClose} />
    </StyledScreen>
  );
}

const feedbackReducer = (state, event) => {
  switch (state) {
    case 'question':
      switch (event.type) {
        case 'GOOD':
          return 'thanks';
        case 'BAD':
          return 'form';
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    case 'form':
      switch (event.type) {
        case 'SUBMIT':
          return 'thanks';
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    case 'thanks':
      switch (event.type) {
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    default:
      return state;
  }
}

export const Feedback: React.FC = () => {
  const [state, send] = useReducer(feedbackReducer, 'question');

  switch (state) {
    case 'question':
      return (
        <QuestionScreen
          onClickGood={() => send({ type: 'GOOD' })}
          onClickBad={() => send({ type: 'BAD' })}
          onClose={() => send({ type: 'CLOSE' })}
        />
      );
    case 'form':
      return (
        <FormScreen
          onSubmit={value => send({ type: 'SUBMIT', value })}
          onClose={() => send({ type: 'CLOSE' })}
        />
      );
    case 'thanks':
      return <ThanksScreen onClose={() => send({ type: 'CLOSE' })} />;
    case 'closed':
    default:
      return null;
  }
}

export const App: React.FC = () => <Feedback />;
