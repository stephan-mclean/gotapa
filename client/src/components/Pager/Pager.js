import React from 'react';
import PropTypes from 'prop-types';
import List from '../platform/List';
import Button from '../platform/Button';

class Pager extends React.Component {


    constructor(props) {
        super(props);

        this.goToPage = this.goToPage.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);

        const currentPage = 1; 
        const currentItems = this.doPage([...props.items], props.itemsPerPage, currentPage); 

        this.state = { currentItems, currentPage };
    }

    doPage(items, itemsPerPage, page) {

        if (items.length <= itemsPerPage) {
            return items; 
        }

        const startIndex = (page - 1) * itemsPerPage; 
        const endIndex = page * itemsPerPage; 


        return items.slice(startIndex, endIndex);
    }

    goToPage(page) {
        const items = [...this.props.items];
        const paged = this.doPage(items, this.props.itemsPerPage, page);

        this.setState({ currentItems: paged, currentPage: page });
    }

    goToNext() {
        this.goToPage(this.state.currentPage + 1);
    }

    goToPrevious() {
        this.goToPage(this.state.currentPage - 1);
    }

    render() {

        const RenderBy = this.props.renderBy;
        return (
            <div>
                PAGER
                <RenderBy items={this.state.currentItems}/>

                {this.state.currentPage > 1 && <Button link left onClick={this.goToPrevious}>Previous</Button>}
                {this.state.currentPage < (this.props.items.length - 1) && <Button link right onClick={this.goToNext}>Next</Button>}
            </div>
        );

    }

};

Pager.defaultProps = {
    itemsPerPage: 10,
    renderBy: List
};

Pager.propTypes = {
    items: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number,
    renderBy: PropTypes.func
};

export default Pager; 