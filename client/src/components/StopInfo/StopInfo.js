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
    padding: 0.75rem; 
    border-bottom: ${props => `1px solid ${props.theme.tertiary}`};
`;

const LocationOperatorContainer = styled.div`
    display: flex;
    flex-direction: column; 
    max-width: 100%; 
`;

const LocationContainer = styled.div`
    display: inline-block; 
    margin-bottom: ${props => props.shouldShowOperators ? '0.5rem' : '0'}; 
    max-width: 100%; 
    overflow: hidden; 
    text-overflow: ellipsis; 
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
        const { canUpdateFavourite, shouldShowOperators, ...displayOnlyProps } = this.props; 
        updateFavourite(displayOnlyProps, this.state.isFavourite);
    }

    favourite(e) {
        e.preventDefault(); 
        e.stopPropagation(); 
        this.setState({ isFavourite: true }, () => this.props.onFavourite(this.props.stopId));
    }

    unFavourite(e) {
        e.preventDefault(); 
        e.stopPropagation(); 
        this.setState({ isFavourite: false }, () => this.props.onUnFavourite(this.props.stopId));
    }

    render() {

        let isFavIcon, isNotFavIcon; 

        if (this.props.canUpdateFavourite) {
            if (this.state.isFavourite) {
                isFavIcon = <FontAwesomeIcon onClick={this.unFavourite} icon="heart" />;
            } else {
                isNotFavIcon = <FontAwesomeIcon onClick={this.favourite} icon={['far', 'heart']} />;
            }
        }

        return (
            <StyledStopInfoContainer>
                <LocationOperatorContainer>
                    <LocationContainer shouldShowOperators={this.props.shouldShowOperators}>
                        <StopNameHeading>{this.props.stopName}</StopNameHeading>
                        <StopIDContainer>#{this.props.stopId}</StopIDContainer>
                    </LocationContainer>
                    {this.props.shouldShowOperators && <OperatorInfo operators={this.props.operators} />}
                </LocationOperatorContainer>

                {isFavIcon} {isNotFavIcon}
            </StyledStopInfoContainer>
        );
    }
}

StopInfo.defaultProps = {
    canUpdateFavourite: false,
    shouldShowOperators: true,
    onFavourite: () => {},
    onUnFavourite: () => {}
};

StopInfo.propTypes = {
    stopId: PropTypes.string,
    stopName: PropTypes.string,
    operators: PropTypes.array,
    canUpdateFavourite: PropTypes.bool,
    shouldShowOperators: PropTypes.bool,
    onFavourite: PropTypes.func,
    onUnFavourite: PropTypes.func
};

export default StopInfo;

