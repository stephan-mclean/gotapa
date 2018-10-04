import ReactGA from 'react-ga';

const EXPLICIT_CONSENT_KEY = 'GOTAPA_ANALYTICS_CONSENT';
const EXPLICIT_DENIAL_KEY = 'GOTAPA_ANALYTICS_DENIAL';
const IMPLICIT_CONSENT_KEY = 'GOTAPA_ANALYTICS_IMPLICIT_CONSENT';

const explicitConsent = () => localStorage.getItem(EXPLICIT_CONSENT_KEY) === 'true';
const explicitDenial = () => localStorage.getItem(EXPLICIT_DENIAL_KEY) === 'true';
const implicitConsent = () => localStorage.getItem(IMPLICIT_CONSENT_KEY) === 'true';
let initialized = false; 

const initialize = () => {
    console.log('initialize');
    initialized = true; 
    /*ReactGA.initialize('UA-126874455-1', {
        debug: true
    });*/ 
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
        console.log('page view', page);
        //ReactGA.pageView(page);
    }
};

const event = args => {
    if (canAddEvent()) {
        console.log('event', args);
        //ReactGA.event(args);
    }
}

export {
    shouldShowAnalyticsConsentBanner,
    acceptConsent,
    rejectConsent,
    pageView,
    event
};

