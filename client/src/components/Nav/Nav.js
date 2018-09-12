import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H5 } from '../platform/Headers';

const StyledNav = styled.nav`
    display: flex; 
    align-items: center; 
    height: 2rem;
    padding: 1rem;      
    background: ${props => props.theme.foreground}; 
`;

const StyledHeader = styled(H5)`
    display: inline; 
    margin: auto; 
    color: ${props => props.theme.background}; 
`;

// TODO: Replace the BackContainer with a Button component.
const BackContainer = styled.span`
    color: ${props => props.theme.background};
    cursor: pointer;  
`;

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.shouldShowBack = this.shouldShowBack.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = { shouldShowBack: this.shouldShowBack() };
    }

    componentDidMount() {
        this.props.history.listen(location => {
            this.setState({ shouldShowBack: this.shouldShowBack() });
        });
    }

    shouldShowBack() {
        return this.props.history.location.pathname !== '/';
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        let back; 

        if (this.state.shouldShowBack) {
            back = <BackContainer onClick={this.goBack}><FontAwesomeIcon icon="chevron-left" /></BackContainer>
        }

        return (
            <StyledNav>
                {back}
                <StyledHeader>{this.props.children}</StyledHeader>
            </StyledNav>
        );    
    }

}

export default withRouter(Nav);