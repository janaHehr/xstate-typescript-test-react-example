import styled from "styled-components";

export const StyledScreen = styled.div`
  padding: 1rem;
  padding-top: 2rem;
  background: white;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  > header {
    margin-bottom: 1rem;
  }

  button {
    background: #4088da;
    appearance: none;
    border: none;
    text-transform: uppercase;
    color: white;
    letter-spacing: 0.5px;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 20rem;
    align-self: flex-end;
    cursor: pointer;
    font-size: 0.75rem;

    + button {
      margin-left: 0.5rem;
    }

    &[data-variant="good"] {
      background-color: #7cbd67;
    }
    &[data-variant="bad"] {
      background-color: #ff4652;
    }
  }

  textarea {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #dedede;
    font-size: 1rem;
  }

  [data-testid="close-button"] {
    position: absolute;
    top: 0;
    right: 0;
    appearance: none;
    height: 2rem;
    width: 2rem;
    line-height: 0;
    border: none;
    background: transparent;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
      content: "×";
      font-size: 1.5rem;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const StyledApp = styled.main`
  height: 100vh;
  width: 100vw;
  background: #f5f8f9;
  display: flex;
  justify-content: center;
  align-items: center;

  &,
  * {
    position: relative;
    box-sizing: border-box;
  }
`;
