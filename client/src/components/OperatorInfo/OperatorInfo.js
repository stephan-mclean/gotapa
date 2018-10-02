import React from 'react';
import styled from 'styled-components';

const OperatorContainer = styled.span`
    font-size: 0.75rem; 
    color: ${props => props.theme.secondary};
    font-weight: lighter; 
    font-style: italic; 
    margin-right: 0.5rem; 
    max-width: 100%; 
    overflow: hidden; 
    text-overflow: ellipsis; 
`;

const OperatorInfo = ({ operators }) => {


    const operatorsToDisplay = operators.map(operator => {
        
        const routes = operator.routes.join(); 

        return <span key={operator.name + routes}>{operator.name} ({routes})</span>
    });

    return (
        <OperatorContainer>
            Operators: {operatorsToDisplay}
        </OperatorContainer>
    );

};

export default OperatorInfo; 