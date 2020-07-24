import React from 'react';
import { App } from './App';
import { Machine } from 'xstate';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { createModel } from '@xstate/test';
import { FeedbackContext, FeedbackSchema, FeedbackEvents } from './machines/feedbackMachine';

describe('app', () => {
  const feedbackMachine = Machine<
  FeedbackContext,
  FeedbackSchema,
  FeedbackEvents
>({
    id: 'feedback',
    initial: 'question',
    states: {
      question: {
        on: {
          CLICK_GOOD: 'thanks',
          CLICK_BAD: 'form',
          CLOSE: 'closed'
        },
        meta: {
          test: () => {
            expect(screen.getByTestId('question-screen')).toBeInTheDocument();
          }
        }
      },
      form: {
        on: {
          SUBMIT: [
            {
              target: 'thanks',
              cond: (_, e) => e.value.length
            }
          ],
          CLOSE: 'closed'
        },
        meta: {
          test: () => {
            expect(screen.getByTestId('form-screen')).toBeInTheDocument();
          }
        }
      },
      thanks: {
        on: {
          CLOSE: 'closed'
        },
        meta: {
          test: () => {
            expect(screen.getByTestId('thanks-screen')).toBeInTheDocument();
          }
        }
      },
      closed: {
        type: 'final',
        meta: {
          test: () => {
            expect(screen.getByText('Done')).toBeInTheDocument();
          }
        }
      }
    }
  });

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
      afterEach(cleanup);

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
