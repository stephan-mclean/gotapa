import styled from 'styled-components';

export const Pill = styled.div`
    background: ${props => props.background || 'red'}; 
    color: ${props => props.color || 'white'};
    font-size: 0.75rem; 
    font-weight: regular;  
    border-radius: 5px; 
    padding: 0.5rem;
    margin-left: 0.5rem; 
    margin-right: 0.5rem; 
    display: inline-block;  
`; 