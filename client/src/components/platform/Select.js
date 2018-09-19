import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from './List';

const Container = styled.div`
    outline: none; 
    display: flex; 
    flex-direction: ${props => props.inline ? 'row' : 'column'};
    align-items: ${props => props.inline ? 'center' : 'default'};
`;

const StyledInputContainer = styled.div` 
    margin-bottom: 0.5rem;
    width: ${props => !props.inline ? '100%' : 'auto'}; 
    display: ${props => props.inline ? 'inline-block' : 'block'};
    position: relative; 
    background: ${props => props.theme.background};
`;

const StyledSelect = styled.div`
    color: ${props => props.theme.secondary};
    padding: 0.5rem;
    border: ${props => `1px solid ${props.theme.tertiary}`}; 
    border-radius: 5px; 
`;

const Label = styled.label`
    margin-right: 0.5rem;  
    display: ${props => props.inline ? 'inline' : 'block'};
    margin-bottom: 0.5rem; 
    font-weight: bold; 
`;

const StyledList = styled(List)`
    position: absolute;
    width: 100%; 
    background: ${props => props.theme.background};
    margin-top: 0; 
    border-top: none; 
    z-index: 100; 
`;

class Select extends React.Component {

    constructor(props) {
        super(props);

        this.state = { value: props.value, placeholder: this.props.placeholder || 'Select', showOptions: false };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange() {
        this.setState({ value: 'value' });
    }

    onFocus() {
        console.log('select focused');

        this.setState({ showOptions: true });
    }

    onBlur() {
        console.log('select blurred');
        this.setState({ showOptions: false });
    }

    render() {

        const { inline, children, ...withoutChildren } = this.props; 

        let label; 
        if (this.props.label) {
            label = <Label htmlFor={this.props.id} {...{ inline }}>{this.props.label}</Label>
        }

        let options; 

        if (this.state.showOptions) {
            if (this.props.renderOptionsBy) {

                const customListItem = props => (
                    <li {...props}>{props.item[this.props.renderOptionsBy]}</li>
                );
    
                options = <StyledList items={this.props.options} renderBy={customListItem}></StyledList>
    
            } else {
                console.log('regular options');
                options = <StyledList items={this.props.options} />
            }
        }

        return (
            <Container inline={inline} tabIndex="1" onFocus={this.onFocus} onBlur={this.onBlur}>
                {label}
                <StyledInputContainer inline={inline}>
                    
                    <StyledSelect {...withoutChildren}>
                        {this.state.value || this.state.placeholder}
                    </StyledSelect>

                    {options}
                </StyledInputContainer>
            </Container>
        );
    }

};

Select.propTypes = {
    renderOptionsBy: PropTypes.string,
    options: PropTypes.array
};


export default Select; 