import React from 'react';
import { useKeyDown } from '../hooks/useKeyDown';
import { StyledScreen } from './styles';

type ThanksProps = {
    onClose: () => void,
};
export const Thanks: React.FC<ThanksProps> = ({ onClose }) => {
    useKeyDown('Escape', onClose);

    return (
        <StyledScreen data-testid="thanks-screen">
            <header>Thanks for your feedback.</header>
            <button data-testid="close-button" title="close" onClick={onClose} />
        </StyledScreen>
    );
}