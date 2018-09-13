import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OperatorInfo from '../OperatorInfo/OperatorInfo';
import { isFavourite, updateFavourite } from '../../utils/FavouriteUtil';

const StyledStopInfoContainer = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
    padding: 1rem; 
    border-bottom: ${props => `1px solid ${props.theme.tertiary}`};
`;

const LocationOperatorContainer = styled.div`
    display: flex;
    flex-direction: column; 
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
`;

class StopInfo extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { isFavourite: isFavourite(this.props.stopId) };
        this.favourite = this.favourite.bind(this);
        this.unFavourite = this.unFavourite.bind(this);
    }

    componentWillUnmount() {
        updateFavourite(this.props.stopId, this.state.isFavourite);
    }

    favourite() {
        this.setState({ isFavourite: true });
    }

    unFavourite() {
        this.setState({ isFavourite: false });
    }

    render() {

        let isFavIcon, isNotFavIcon; 

        if (this.state.isFavourite) {
            isFavIcon = <FontAwesomeIcon onClick={this.unFavourite} icon="heart" />;
        } else {
            isNotFavIcon = <FontAwesomeIcon onClick={this.favourite} icon={['far', 'heart']} />;
        }

        return (
            <StyledStopInfoContainer>
                <LocationOperatorContainer>
                    <LocationContainer>
                        <StopNameHeading>{this.props.stopName}</StopNameHeading>
                        <StopIDContainer>#{this.props.stopId}</StopIDContainer>
                    </LocationContainer>
                    <OperatorInfo operators={this.props.operators} />
                </LocationOperatorContainer>

                {isFavIcon} {isNotFavIcon}
            </StyledStopInfoContainer>
        );
    }
}

StopInfo.propTypes = {
    stopId: PropTypes.string,
    stopName: PropTypes.string,
    operators: PropTypes.array
};

export default StopInfo;

