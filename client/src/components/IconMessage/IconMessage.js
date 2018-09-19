import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoadingContainer = styled.div`
    padding: 2rem; 
    font-size: 3rem; 
    text-align: center; 
`;

const LoadingTextContainer = styled.div`
    font-size: 1rem; 
    font-weight: lighter;
    color: ${props => props.theme.secondary};
`;

export default props => {
    const { icon, children, ...otherProps } = props; 

    return (
        <LoadingContainer>
                <FontAwesomeIcon icon={icon} {...otherProps} />
                <LoadingTextContainer>{children}</LoadingTextContainer>
        </LoadingContainer>
    );
}