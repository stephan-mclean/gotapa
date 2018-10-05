import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faLongArrowAltRight, 
  faSpinner, 
  faSync, 
  faExclamationTriangle, 
  faHeart as faSolidHeart,
  faCircle,
  faChevronLeft,
  faInfoCircle,
  faMapPin 
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Nav from './components/Nav/Nav';
import PageContainer from './components/platform/PageContainer';
import Home from './components/Home/Home';
import Stop from './components/Stop/Stop';
import Favourites from './components/Favourites/Favourites';
import About from './components/About/About';
import Terms from './components/Terms/Terms';
import Privacy from './components/Privacy/Privacy';
import Footer from './components/Footer/Footer';
import Themes from './utils/ThemeUtil';
import AnalyticsBanner from './components/AnalyticsBanner/AnalyticsBanner';
import { shouldShowAnalyticsConsentBanner } from './utils/AnalyticsManager';

const StyledLink = styled(Link)`
  text-decoration: none; 
  color: ${props => props.theme.background};
`;

const Container = styled.div`
  min-height: 100%; 
  display: grid; 
  grid-template-rows: 4rem 1fr 4rem; 
  grid-template-columns: 100%; 
`;

library.add(faLongArrowAltRight, faSpinner, faSync, faExclamationTriangle, faHeart, 
  faSolidHeart, faCircle, faChevronLeft, faInfoCircle, faMapPin);

class App extends Component {

  componentDidMount() {

    if (shouldShowAnalyticsConsentBanner()) {
      toast.warn(<AnalyticsBanner />, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: false,
        closeButton: false,
        closeOnClick: false
      });  
    }

  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={Themes.main}>
          <Container>

            <Nav>
              <StyledLink to="/">GoTapa</StyledLink>
            </Nav>

            <PageContainer>
              <Route exact path="/" component={Home}></Route>
              <Route path="/stops/:stopId" component={Stop}></Route>
              <Route path="/favourites" render={props => <Favourites {...props} displayAll={true} />}></Route>
              <Route path="/about" component={About}></Route>
              <Route path="/terms" component={Terms}></Route>
              <Route path="/privacy" component={Privacy}></Route>

              <ToastContainer />
            </PageContainer>

            <Footer />
          </Container>
        </ThemeProvider>
      </Router>
    );
  }

}

export default App;
