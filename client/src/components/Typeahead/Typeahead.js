import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from '../platform/Input';
import List from '../platform/List';

const TypeaheadInput = styled(Input)`
    margin-bottom: 0.5rem; 
`

class Typeahead extends React.Component {

    constructor(props) {
        super(props);

        this.state = { value: '', showOptions: false, blurTimeout: null };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onOptionSelected = this.onOptionSelected.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    }

    onBlur(e) {
        // TODO: Bit of a hack, find a better way to handle this. 
        if (!this.state.blurTimeout) {
            const blurTimeout = setTimeout(() => {
                this.setState({ showOptions: false, blurTimeout: null });
                this.props.onBlur(e);
            }, 100);

            this.setState({ blurTimeout: blurTimeout });
        }
        
    }

    onFocus(e) {
        this.setState({ showOptions: true });
        this.props.onFocus(e);
    }

    onOptionSelected(e) {
        
        if (this.state.blurTimeout) {
            clearTimeout(this.state.blurTimeout);
            this.setState({ blurTimeout: null });
        }
        
        this.props.onOptionSelected(e); 
    }

    render() {

        const RenderOptionsBy = this.props.renderOptionsBy; 
        const options = this.state.showOptions && (this.props.options && this.props.options.length) 
            ? <RenderOptionsBy items={this.props.options} onItemClick={this.onOptionSelected}></RenderOptionsBy>   
            : null;  

        const RenderSearchBy = this.props.renderSearchBy; 
        return (
            <div>
                <RenderSearchBy 
                       label={this.props.label} 
                       placeholder={this.props.placeholder}
                       value={this.state.value}
                       onKeyUp={this.props.onKeyUp} 
                       onChange={this.onChange}
                       onBlur={this.onBlur} 
                       onFocus={this.onFocus}></RenderSearchBy>
                {options}
            </div>
        );
    }

}; 

Typeahead.defaultProps = {
    renderSearchBy: TypeaheadInput,
    renderOptionsBy: List,
    onChange: () => {},
    onKeyUp: () => {},
    onBlur: () => {},
    onFocus: () => {}
};

Typeahead.propTypes = {
    options: PropTypes.array,
    onOptionSelected: PropTypes.func,
    renderOptionsBy: PropTypes.func,
    renderSearchBy: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default Typeahead; 