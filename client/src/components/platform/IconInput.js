import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledInput = styled(Input)`
    padding-right: ${props => props.left ? '' : '1.5rem'};
    padding-left: ${props => props.left ? '2rem' : '1rem'}; 
`;

const StyledIcon = styled(FontAwesomeIcon)`
    position: absolute; 
    top: 0; 
    right: ${props => props.left ? 'auto' : '0.5rem'};
    left: ${props => props.left ? '0.5rem' : 'auto'};
    height: 100%; 
    text-align: center;  
`;

export default props => {
    
    const { icon, left, spin, pulse } = props; 
    return (
        <StyledInput {...props}>
            {!props.hideIcon && <StyledIcon { ...{ icon, left, spin, pulse } } />}
        </StyledInput>
    );
}; 