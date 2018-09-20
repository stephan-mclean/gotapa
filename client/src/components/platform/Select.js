import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
    margin-right: 1rem;  
    display: ${props => props.inline ? 'inline' : 'block'};
    margin-bottom: 0.5rem; 
    font-weight: bold; 
`;

const StyledSelect = styled.select`
    padding: 0.5rem;
    border: ${props => `1px solid ${props.theme.tertiary}`}; 
    border-radius: 5px; 
    outline: none; 
    flex: 1 0 auto;
    text-align: left; 
    font-size: 1rem; 
    color: ${props => props.theme.secondary};

    :focus {
        border: ${props => `1px solid ${props.theme.secondary}`}; 
    }
`;

const StyledInputContainer = styled.div`
    display: inline-flex; 
    position: relative; 
    margin-bottom: 0.5rem;
    width: ${props => !props.inline ? '100%' : 'auto'}; 
`;

class Select extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { inline } = this.props; 

        let label; 
        if (this.props.label) {
            label = <Label htmlFor={this.props.id} {...{ inline }}>{this.props.label}</Label>
        }

        const { children, ...withoutChildren } = this.props; 
        return (
            <div>
                {label}
                <StyledInputContainer inline={inline}>
                    <StyledSelect {...withoutChildren}>{children}</StyledSelect>
                </StyledInputContainer>
            </div>
        );

    }

};

export default Select; 