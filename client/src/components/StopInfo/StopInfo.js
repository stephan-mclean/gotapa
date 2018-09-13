import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import OperatorInfo from '../OperatorInfo/OperatorInfo';

const StyledStopInfoContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column; 
    border-bottom: ${props => `1px solid ${props.theme.tertiary}`};
`;

const LocationContainer = styled.div`
    display: inline-block; 
    margin-bottom: 0.5rem; 
`; 

const StopNameHeading = styled.span`
    display: inline-block;
    margin-right: 0.5rem; 
    font-weight: bold; 
`;

const StopIDContainer = styled.span`
    color: ${props => props.theme.secondary}; 
`

const StopInfo = ({ stopId, stopName, operators, isFavourite }) => {

    return (
        <StyledStopInfoContainer>

            <LocationContainer>

                <StopNameHeading>{stopName}</StopNameHeading>
                <StopIDContainer>#{stopId}</StopIDContainer>

            </LocationContainer>

            <OperatorInfo operators={operators} />
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

