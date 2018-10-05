import ReactGA from 'react-ga';

const EXPLICIT_CONSENT_KEY = 'GOTAPA_ANALYTICS_CONSENT';
const EXPLICIT_DENIAL_KEY = 'GOTAPA_ANALYTICS_DENIAL';
const IMPLICIT_CONSENT_KEY = 'GOTAPA_ANALYTICS_IMPLICIT_CONSENT';

const explicitConsent = () => localStorage.getItem(EXPLICIT_CONSENT_KEY) === 'true';
const explicitDenial = () => localStorage.getItem(EXPLICIT_DENIAL_KEY) === 'true';
const implicitConsent = () => localStorage.getItem(IMPLICIT_CONSENT_KEY) === 'true';
let initialized = false; 

const initialize = () => {
    initialized = true; 
    ReactGA.initialize('UA-126874455-1', {
        debug: process.env.NODE_ENV !== 'production'
    }); 
}

if (!explicitDenial() && (implicitConsent() || explicitConsent())) {
    initialize(); 
}

const canAddEvent = () => {
    if (explicitDenial()) {
        return false; 
    } else if (explicitConsent()) {
        return true; 
    } else if (implicitConsent()) {
        return true; 
    } else if (!initialized) {
        localStorage.setItem(IMPLICIT_CONSENT_KEY, 'true');
        initialize(); 
        
        return false; 
    }
};

const acceptConsent = () => {
    localStorage.setItem(EXPLICIT_CONSENT_KEY, 'true');
    localStorage.setItem(EXPLICIT_DENIAL_KEY, 'false');
    if (!initialized) {
        initialize(); 
    }
};

const rejectConsent = () => {
    localStorage.setItem(EXPLICIT_DENIAL_KEY, 'true');
    localStorage.setItem(EXPLICIT_CONSENT_KEY, 'false');
    localStorage.setItem(IMPLICIT_CONSENT_KEY, 'false');
}

const shouldShowAnalyticsConsentBanner = () => {
    return !explicitConsent() && !explicitDenial(); 
};

const pageView = page => {
    if (canAddEvent()) {
        ReactGA.pageview(page);
    }
};

const event = args => {
    if (canAddEvent()) {
        ReactGA.event(args);
    }
}

export {
    shouldShowAnalyticsConsentBanner,
    acceptConsent,
    rejectConsent,
    pageView,
    event
};

