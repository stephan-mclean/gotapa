import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pill } from '../Pill/Pill';

const StyledRealTimeResultContainer = styled.div`
    border: ${props => `1px solid ${props.theme.tertiary}`}; 
    border-radius: 5px; 
    padding: 1rem; 
    margin-bottom: 1rem; 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 
`;

const RouteContainer = styled.div`
    display: inline-block;
`;

const OriginDestinationContainer = styled.span`
    color: ${props => props.theme.secondary}; 
`;

const DueTimeContainer = styled.span`
    display: flex; 
    flex-direction: column; 
`; 

const TimeContainer = styled.span`
    font-size: 2rem; 
    align-self: center; 
`;

const MinutesContainer = styled.span`
    color: ${props => props.theme.secondary};  
`;

const RealTimeResult = ({ route, operator, origin, destination, dueTime }) => (
    <StyledRealTimeResultContainer>

        <RouteContainer>
            <Pill background={operator.bg} color={operator.fg}>{route}</Pill>
            <OriginDestinationContainer>{origin} <FontAwesomeIcon icon="long-arrow-alt-right" /> {destination}</OriginDestinationContainer>
        </RouteContainer>
        <DueTimeContainer>
            <TimeContainer>{dueTime}</TimeContainer>
            {dueTime !== 'Due' && <MinutesContainer>minutes</MinutesContainer>}
        </DueTimeContainer>

    </StyledRealTimeResultContainer>
); 



export default RealTimeResult; 