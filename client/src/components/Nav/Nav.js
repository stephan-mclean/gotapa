import React from 'react';
import styled from 'styled-components';
import { H5 } from '../platform/Headers';

const StyledNav = styled.nav`
    display: flex; 
    align-items: center; 
    height: 2rem;
    padding: 1rem;      
    background: ${props => props.theme.foreground}; 
`;

const StyledHeader = styled(H5)`
    display: inline; 
    margin: auto; 
    color: ${props => props.theme.background}; 
`;

export default props => (
    <StyledNav>
        <StyledHeader>{props.children}</StyledHeader>
    </StyledNav>
);