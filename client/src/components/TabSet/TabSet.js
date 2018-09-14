import React from 'react';
import styled from 'styled-components';

const AllHeadingsContainer = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: space-evenly; 
    align-content: center;
    align-items: center; 
    border: ${props => `1px solid ${props.theme.tertiary}`};
    border-bottom: none; 
    border-radius: 5px; 
    padding: 0.5rem; 
`;

const Tab = ({ isDefault, onActive, children }) => {
    return children; 
};

const StyledTabHeading = styled.div`
    text-transform: uppercase; 
    border-bottom: ${props => props.active ? `1px solid ${props.theme.foreground}` : 'none'};
`;

const TabHeading = ({ children, ...otherProps }) => (
    <StyledTabHeading {...otherProps}>{children}</StyledTabHeading>
)

const TabBody = ({ children }) => children; 

class TabSet extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.children);

        const headings = [];
        const bodies = [];

        React.Children.forEach(props.children, tab => {
            React.Children.forEach(tab.props.children, tabChild => {
                if (tabChild.type === TabHeading) {
                    headings.push(tabChild);
                } else if (tabChild.type === TabBody) {
                    bodies.push(tabChild)
                }
            });
        });

        this.state = { activeTab: 0, headings: headings, bodies: bodies };
    }

    onHeadingClick(index) {
        console.log('heading click', index);

        this.setState({ activeTab: index });
    }

    render() {

        const headings = this.state.headings.map((Heading, index) => {
            console.log(Heading);
            return (
                <div key={'Tabheading' + index} onClick={this.onHeadingClick.bind(this, index)}>
                    <Heading.type {...Heading.props} active={index === this.state.activeTab} />
                </div>
            )
        });

        const ActiveTabBody = this.state.bodies[this.state.activeTab];

        return (
            <div>

                <AllHeadingsContainer>
                    {headings}
                </AllHeadingsContainer>

                <ActiveTabBody.type {...ActiveTabBody.props} />

            </div>
        )
    }

};

export {
    TabSet,
    Tab,
    TabHeading,
    TabBody
};