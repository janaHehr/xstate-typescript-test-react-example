import React from 'react';
import { App } from './App';
import { render, fireEvent, screen } from '@testing-library/react';
import { createModel } from '@xstate/test';
import { feedbackMachine } from './machines/feedbackMachine';

describe('app', () => {
  feedbackMachine.states.question.meta = {
    test: () => {
      expect(screen.getByTestId('question-screen')).toBeInTheDocument();
    }
  };
  feedbackMachine.states.form.meta = {
    test: () => {
      expect(screen.getByTestId('form-screen')).toBeInTheDocument();
    }
  };
  feedbackMachine.states.thanks.meta = {
    test: () => {
      expect(screen.getByTestId('thanks-screen')).toBeInTheDocument();
    }
  };
  feedbackMachine.states.closed.meta = {
    test: () => {
      expect(screen.getByText('Done')).toBeInTheDocument();
    }
  };

  const testModel = createModel(feedbackMachine, {
    events: {
      CLICK_GOOD: () => {
        fireEvent.click(screen.getByText('Good'));
      },
      CLICK_BAD: () => {
        fireEvent.click(screen.getByText('Bad'));
      },
      CLOSE: () => {
        fireEvent.click(screen.getByTestId('close-button'));
      },
      SUBMIT: {
        exec: async (_, event) => {
          fireEvent.change(screen.getByTestId('response-input'), {
            target: { value: event.value }
          });
          fireEvent.click(screen.getByTestId('submit-button'));
        },
        cases: [{ value: 'something' }, { value: '' }]
      }
    }
  });

  const testPlans = testModel.getSimplePathPlans();

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, () => {
          const rendered = render(<App />);
          return path.test(rendered);
        });
      });
    });
  });

  it('component covers all states', () => {
    testModel.testCoverage();
  });
});
