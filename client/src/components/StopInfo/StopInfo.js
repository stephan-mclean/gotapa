import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Pill } from '../Pill/Pill';
import { H6 } from '../platform/Headers';

const StyledStopInfoContainer = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between; 
    align-items: center;   
`;

const LocationContainer = styled.div`
    display: inline-block; 
`; 

const StopNameHeading = styled(H6)`
    display: inline-block;
    margin-right: 0.5rem; 
`;

const StopIDContainer = styled.span`
    color: ${props => props.theme.secondary}; 
`

const StopInfo = ({ stopId, stopName, operators, isFavourite }) => {

    const theOperators = operators.map((operator, index) => {

        return (
            <Pill key={index} background={operator.bg} color={operator.fg}>
                {operator.name}
            </Pill>
        ); 
    });

    return (
        <StyledStopInfoContainer>

            <LocationContainer>

                <StopNameHeading>{stopName}</StopNameHeading>
                <StopIDContainer>#{stopId}</StopIDContainer>

            </LocationContainer>

            <div>
                {theOperators}
            </div>
        </StyledStopInfoContainer>
    );
};

StopInfo.propTypes = {
    stopId: PropTypes.string,
    stopName: PropTypes.string,
    operators: PropTypes.array,
    isFavourite: PropTypes.func
};

export default StopInfo;

