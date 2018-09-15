import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TabSetContainer = styled.div`
    margin-top: 0.5rem; 
`;

const AllHeadingsContainer = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: space-evenly; 
    align-content: center;
    align-items: center; 
    border: ${props => `1px solid ${props.theme.tertiary}`};
    border-radius: 5px; 
`;

const Tab = ({ children }) => children;

Tab.propTypes = {
    isDefault: PropTypes.bool,
    onActive: PropTypes.func
};

Tab.defaultProps = {
    onActive: () => {}
}

const TabHeading = styled.div`
    text-transform: uppercase; 
    font-weight: ${props => props.active ? 'bold' : 'default'};
    font-size: 0.875rem; 
    background: ${props => props.active ? props.theme.tertiary : ''}; 
    flex: 1; 
    text-align: center; 
    padding: 0.5rem; 
    border-right: ${props => `1px solid ${props.theme.tertiary}`}; 
    cursor: pointer;

    :last-child {
        border-right: none; 
    }

    :hover {
        font-weight: bold; 
    }
`;

const TabBody = styled.div`
    padding: 0.5rem; 
`; 

class TabSet extends React.Component {

    constructor(props) {
        super(props);

        const headings = [];
        const bodies = [];
        const activeCallBacks = []; 
        let activeTab = 0; 

        React.Children.forEach(props.children, (tab, index) => {
            
            if (tab.props.isDefault) {
                activeTab = index; 
            }

            activeCallBacks.push(tab.props.onActive);

            React.Children.forEach(tab.props.children, tabChild => {
                if (tabChild.type === TabHeading) {
                    headings.push(tabChild);
                } else if (tabChild.type === TabBody) {
                    bodies.push(tabChild)
                }
            });
        });

        this.state = { activeTab, headings, bodies, activeCallBacks };
    }

    onHeadingClick(index) {
        this.setState({ activeTab: index });
        this.state.activeCallBacks[index](); 
    }

    render() {

        const headings = this.state.headings.map((Heading, index) => {
            return (
                <Heading.type 
                    onClick={this.onHeadingClick.bind(this, index)} 
                    key={'Tabheading' + index} 
                    {...Heading.props} 
                    active={index === this.state.activeTab} />
            )
        });

        const ActiveTabBody = this.state.bodies[this.state.activeTab];

        return (
            <TabSetContainer>

                <AllHeadingsContainer>
                    {headings}
                </AllHeadingsContainer>

                <ActiveTabBody.type {...ActiveTabBody.props} />

            </TabSetContainer>
        )
    }

};

export {
    TabSet,
    Tab,
    TabHeading,
    TabBody
};