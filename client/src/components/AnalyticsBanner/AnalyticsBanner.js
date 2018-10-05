import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../platform/Button';
import { acceptConsent, rejectConsent, event } from '../../utils/AnalyticsManager';

const ANALYTICS_BANNER_CATEGORY = 'AnalyticsBanner';

const AnalyticsBannerContainer = styled.div`
  display: flex; 
  justify-content: space-between;
  font-size: 0.875rem; 
`; 

const AnalyticsTextContainer = styled.span`
  flex: 1.25; 
`;

const AnalyticsButtonContainer = styled.div`
  flex: 0.75; 
  display: flex; 
  justify-content: space-evenly; 
`;

const AcceptButton = styled(Button)`
  color: ${props => props.theme.secondary};
  background: none; 
  font-weight: bold; 
  border: ${props => `1px solid ${props.theme.secondary}`};
  padding: 0.5rem; 
  text-decoration: none; 
`;

const DeclineButton = styled(Button)`
  text-decoration: none; 
  font-size: 0.75rem; 
  color: ${props => props.theme.secondary};
`;

const LearnMoreLink = styled(Link)`
    color: ${props => props.theme.background};
`;

class AnalyticsBanner extends React.Component {


    constructor(props) {
        super(props);

        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
    }

    accept() {
        event({
            category: ANALYTICS_BANNER_CATEGORY,
            action: 'Accepted analytics'
        });
        acceptConsent(); 
        this.props.closeToast(); 
    }

    reject() {
        event({
            category: ANALYTICS_BANNER_CATEGORY,
            action: 'Rejected analytics'
        });
        rejectConsent(); 
        this.props.closeToast();
    }

    render() {
        return (

            <AnalyticsBannerContainer>
                <AnalyticsTextContainer>
                    This site uses cookies to improve your experience. <LearnMoreLink to="/privacy">Learn more</LearnMoreLink>
                </AnalyticsTextContainer>

                <AnalyticsButtonContainer>
                <DeclineButton onClick={this.reject} link>Decline</DeclineButton>
                <AcceptButton onClick={this.accept}>Accept</AcceptButton>
                </AnalyticsButtonContainer>
                
            </AnalyticsBannerContainer>

        );
    }

};

export default AnalyticsBanner; 