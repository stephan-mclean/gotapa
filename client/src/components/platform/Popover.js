import React from 'react';
import styled from 'styled-components';

class Popover extends React.Component {

    constructor(props) {
        super(props);

        this.state = { showPopover: false };
    }

    onClick(e) {
        this.setState({ showPopover: !this.state.showPopover });
        this.props.onClick(e);
    }

    render() {
        let WrappedElement = this.props.wrappedElement; 
        let PopoverContent = this.props.popoverContent; 
    }

}

Popover.defaultProps = {
    onClick: () => {}
};
