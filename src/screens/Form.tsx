import React from 'react';
import { StyledScreen } from "./styles";
import { useKeyDown } from "../hooks/useKeyDown";

type FormProps = {
    onSubmit: ({ value: any }) => void, onClose: () => void,
};
export const Form: React.FC<FormProps> = ({ onSubmit, onClose }) => {
    useKeyDown('Escape', onClose);

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