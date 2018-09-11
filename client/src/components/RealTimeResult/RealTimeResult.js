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

    @media only screen and (max-width: 991px) {
        padding: 0.5rem; 
    }
`;

const RouteContainer = styled.div`
    display: inline-block;
`;

const OriginDestinationContainer = styled.span`
    color: ${props => props.theme.secondary}; 
    @media only screen and (max-width: 991px) {
        display: inline-flex; 
        flex-direction: column; 
        text-align: center;
        align-items: center;
        font-weight: lighter;
        font-size: 0.75rem;
    }
`;

const DueTimeContainer = styled.span`
    display: flex; 
    flex-direction: column; 
`; 

const TimeContainer = styled.span`
    font-size: 1.5rem; 
    align-self: center; 
`;

const MinutesContainer = styled.span`
    color: ${props => props.theme.secondary};  
    font-size: 0.75rem; 
`;

const RealTimeResult = ({ route, operator, origin, destination, dueTime }) => (
    <StyledRealTimeResultContainer>

        <RouteContainer>
            <Pill background={operator.bg} color={operator.fg}>{route}</Pill>
        </RouteContainer>
        <OriginDestinationContainer>{origin} <FontAwesomeIcon icon="long-arrow-alt-right" /> {destination}</OriginDestinationContainer>
        <DueTimeContainer>
            <TimeContainer>{dueTime}</TimeContainer>
            {dueTime !== 'Due' && <MinutesContainer>minutes</MinutesContainer>}
        </DueTimeContainer>

    </StyledRealTimeResultContainer>
); 



export default RealTimeResult; 