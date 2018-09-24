import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from '../platform/List';
import Button from '../platform/Button';

const ButtonPageContainer = styled.div`
    display: flex; 
    flex-direction: row; 
`;

const PageNumberContainer = styled.span`
    margin: auto; 
    color: ${props => props.theme.secondary};
    font-size: 0.875rem; 
`;

class Pager extends React.Component {


    constructor(props) {
        super(props);

        this.goToPage = this.goToPage.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);

        const currentPage = 1; 
        let numberOfPages = Math.floor(props.items.length / props.itemsPerPage);
        const leftoverItems = props.items.length % props.itemsPerPage;
        if (leftoverItems) {
            numberOfPages++;
        }

        const currentItems = this.doPage([...props.items], props.itemsPerPage, currentPage); 

        this.state = { currentItems, currentPage, numberOfPages };
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

    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            const currentItems = this.doPage([...this.props.items], this.props.itemsPerPage, this.state.currentPage);
            this.setState({ currentItems }); // TODO: refactor this, could cause a loop
        }
    }

    render() {
        const RenderBy = this.props.renderBy;
        return (
            <div>
                <RenderBy items={this.state.currentItems} />


                <ButtonPageContainer>

                    {this.state.currentPage > 1 && <Button link left onClick={this.goToPrevious}>Previous</Button>}

                    <PageNumberContainer>Page {this.state.currentPage} of {this.state.numberOfPages}</PageNumberContainer>

                    { ((this.state.currentPage - 1) * this.props.itemsPerPage) < (this.props.items.length - this.props.itemsPerPage) 
                        && <Button link right onClick={this.goToNext}>Next</Button>
                    }

                </ButtonPageContainer>

                
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