import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListItem from './ListItem';
import { H5 } from './Headers';

const StyledList = styled.ul`
    list-style-type: none;  
    border: ${props => `1px solid ${props.theme.tertiary}`}; 
    border-radius: 5px;  
    padding: 0; 
`;

class List extends React.Component {

    render() {

        const ListItemComponent = this.props.renderBy;
        const items = this.props.items.map((item, index) => (
            <ListItemComponent onClick={this.props.onItemClick.bind(null, item)} 
                      key={index} item={item}>
                {item}
            </ListItemComponent>
        ));

        const TitleComponent = this.props.renderTitleBy;
        const title = this.props.title 
            ? <TitleComponent>{this.props.title}</TitleComponent>
            : null;
        return (
            <div>
                {title}
                <StyledList className={this.props.className}>{items}</StyledList>
            </div>
        );

    }

};

List.defaultProps = {
    renderBy: ListItem,
    renderTitleBy: H5,
    onItemClick: () => {}
};

List.propTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func,
    renderBy: PropTypes.func,
    title: PropTypes.string,
    renderTitleBy: PropTypes.func
};

export default List; 