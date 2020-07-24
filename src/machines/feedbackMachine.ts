import { Machine } from "xstate";

// The hierarchical (recursive) schema for the states
export interface FeedbackSchema {
  states: {
    question: {};
    form: {};
    thanks: {};
    closed: {};
  };
}

// The events that the machine handles
export type FeedbackEvents =
  | { type: "CLICK_GOOD" }
  | { type: "CLICK_BAD" }
  | { type: "CLOSE" }
  | { type: "SUBMIT"; value:any };

// The context (extended state) of the machine
export interface FeedbackContext {}

export const feedbackMachine = Machine<
  FeedbackContext,
  FeedbackSchema,
  FeedbackEvents
>({
  id: "feedback",
  initial: "question",
  states: {
    question: {
      on: {
        CLICK_GOOD: "thanks",
        CLICK_BAD: "form",
        CLOSE: "closed",
      },
    },
    form: {
      on: {
        SUBMIT: [
          {
            target: "thanks",
          },
        ],
        CLOSE: "closed",
      },
    },
    thanks: {
      on: {
        CLOSE: "closed",
      },
    },
    closed: {
      type: "final",
    },
  },
});
