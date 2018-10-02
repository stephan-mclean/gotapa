import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.div`
    border-top: ${props => `1px solid ${props.theme.tertiary}`};
    padding: 0.5rem; 
`;

const BuildInfoContainer = styled.div`
    color: ${props => props.theme.secondary};
    font-size: 0.75rem; 
    font-weight: lighter; 
    font-style: italic; 
    display: inline-block; 
`;

const FooterLink = styled(Link)`
    font-size: 0.875rem; 
    color: ${props => props.theme.secondary};
    text-decoration-color: ${props => props.theme.secondary};
    font-weight: lighter; 
    margin-right: 0.5rem; 
`;

export default () => (
    <FooterContainer>
        <div>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/terms">Terms Of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </div>
        <BuildInfoContainer>
            {process.env.HEROKU_RELEASE_VERSION} {process.env.HEROKU_RELEASE_CREATED_AT} 
        </BuildInfoContainer>
    </FooterContainer>
);