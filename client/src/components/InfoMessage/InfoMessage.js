import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InfoMessageContainer = styled.div`
    font-size: 0.875rem; 
    background: ${props => props.theme.background}; 
    padding: 0.5rem;
    border-radius: 5px;  
    color: ${props => props.theme.foreground}; 
    border: ${props => `1px solid ${props.theme.tertiary}`};
    display: flex; 
    flex-direction: row; 
    align-items: center; 
`;

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 1rem; 
    margin-right: 0.5rem; 
`

export default props => (
    <InfoMessageContainer>
        <StyledIcon icon="info-circle" /> <span>{props.children}</span>
    </InfoMessageContainer>
);