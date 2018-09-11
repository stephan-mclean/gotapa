import styled from 'styled-components';

export default styled.button`
    background: ${props => props.theme.tertiary};
    color: ${props => props.theme.foreground};
    text-transform: uppercase; 
    font-size: 0.875rem; 
    padding: 1rem; 
    border: none; 
    font-family: 'Poppins', sans-serif;
    border-radius: 5px; 
    outline: none; 
    cursor: pointer;

    :active {
        background: ${props => props.theme.secondary}; 
    }
    
`;