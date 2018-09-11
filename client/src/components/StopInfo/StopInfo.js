import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledStopInfoContainer = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between; 
    align-items: center;   
    border-bottom: ${props => `1px solid ${props.theme.tertiary}`};
`;

const LocationContainer = styled.div`
    display: inline-block; 
`; 

const StopNameHeading = styled.p`
    display: inline-block;
    margin-right: 0.5rem; 
    font-weight: bold; 
`;

const StopIDContainer = styled.span`
    color: ${props => props.theme.secondary}; 
`

const StopInfo = ({ stopId, stopName, operators, isFavourite }) => {

    const theOperators = operators.map((operator, index) => {

        return (
            <FontAwesomeIcon icon="circle" color={operator.bg} />
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

