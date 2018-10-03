import ReactGA from 'react-ga';

const EXPLICIT_CONSENT_KEY = 'GOTAPA_ANALYTICS_CONSENT';
const EXPLICIT_DENIAL_KEY = 'GOTAPA_ANALYTICS_DENIAL';
const IMPLICIT_CONSENT_KEY = 'GOTAPA_ANALYTICS_IMPLICIT_CONSENT';

const explicitConsent = localStorage.getItem(EXPLICIT_CONSENT_KEY);
const explicitDenial = localStorage.getItem(EXPLICIT_DENIAL_KEY);
const implicitConsent = localStorage.getItem(IMPLICIT_CONSENT_KEY);
let initialized = false; 

if (!explicitDenial && (implicitConsent || explicitConsent)) {
    initialized = true; 
    ReactGA.initialize('UA-126874455-1');
}

const shouldShowAnalyticsConsentBanner = () => {
    return !explicitConsent && !explicitDenial; 
};

const pageView = page => {
    
};

export {
    shouldShowAnalyticsConsentBanner
};

