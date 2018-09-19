import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from './List';

const Container = styled.div`
    outline: none; 
`;

const StyledInputContainer = styled.div` 
    margin-bottom: 0.5rem;
    width: 100%; 
`;

const StyledSelect = styled.div`
    padding: 0.5rem;
    border: ${props => `1px solid ${props.theme.tertiary}`}; 
    border-radius: 5px; 
`;

const Label = styled.label`
    margin-right: 1rem;  
    display: ${props => props.inline ? 'inline' : 'block'};
    margin-bottom: 0.5rem; 
    font-weight: bold; 
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
    
                options = <List items={this.props.options} renderBy={customListItem}></List>
    
            } else {
                console.log('regular options');
                options = <List items={this.props.options} />
            }
        }

        return (
            <Container tabIndex="1" onFocus={this.onFocus} onBlur={this.onBlur}>
                {label}
                <StyledInputContainer>
                    
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