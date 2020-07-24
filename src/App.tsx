import React from "react";
import { useMachine } from '@xstate/react';
import { feedbackMachine } from './machines/feedbackMachine';
import { Form } from './screens/Form';
import { Question } from './screens/Question';
import { Thanks } from './screens/Thanks';

export const App: React.FC = () => {
  const [feedbackState, sendToFeedbackMachine] = useMachine(feedbackMachine, {
    // guards: {
    //   isCorrect: ctx => {
    //     return ctx.topSelectedItem.homeworld === ctx.bottomSelectedItem.url;
    //   }
    // }
  });

  return <>
    {feedbackState.matches('question') && (
      <Question
        onClickGood={() => sendToFeedbackMachine({ type: 'CLICK_GOOD' })}
        onClickBad={() => sendToFeedbackMachine({ type: 'CLICK_BAD' })}
        onClose={() => sendToFeedbackMachine({ type: 'CLOSE' })}
      />
    )}
    {feedbackState.matches('form') && (
      <Form
        onSubmit={value => sendToFeedbackMachine({ type: 'SUBMIT', value })}
        onClose={() => sendToFeedbackMachine({ type: 'CLOSE' })}
      />
    )}
    {feedbackState.matches('thanks') && (
      <Thanks onClose={() => sendToFeedbackMachine({ type: 'CLOSE' })} />
    )}
    {feedbackState.matches('closed') && (
      <div>Done</div>
    )}

  </>;
}