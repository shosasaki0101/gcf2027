// Google Analytics and Google Tag Manager utility functions
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, string | number | boolean>
    ) => void;
    dataLayer: any[];
  }
}

// Google Analytics measurement ID
export const GA_MEASUREMENT_ID = 'G-FJ6HX9NFCP';

// Google Tag Manager container ID
export const GTM_CONTAINER_ID = 'GTM-5XKBL3B2';

// Initialize dataLayer for GTM
export const initializeDataLayer = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
};

// Push events to GTM dataLayer
export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const config: Record<string, string | number | boolean> = {
      event_category: category,
    };
    
    if (label !== undefined) {
      config.event_label = label;
    }
    
    if (value !== undefined) {
      config.value = value;
    }
    
    window.gtag('event', action, config);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('click', 'button', `${buttonName}${location ? ` - ${location}` : ''}`);
};

// Track section navigation
export const trackSectionView = (sectionName: string) => {
  trackEvent('view', 'section', sectionName);
  
  // Also push to GTM dataLayer
  pushToDataLayer({
    event: 'section_view',
    section_name: sectionName,
    event_category: 'navigation',
    event_action: 'section_view'
  });
};

// Track speaker modal opens
export const trackSpeakerModalOpen = (speakerName: string) => {
  trackEvent('open', 'modal', `speaker - ${speakerName}`);
  
  // Also push to GTM dataLayer
  pushToDataLayer({
    event: 'speaker_modal_open',
    speaker_name: speakerName,
    event_category: 'engagement',
    event_action: 'modal_open'
  });
};

// Track registration button clicks
export const trackRegistrationClick = (location: string) => {
  trackEvent('click', 'registration', location);
  
  // Also push to GTM dataLayer
  pushToDataLayer({
    event: 'registration_click',
    click_location: location,
    event_category: 'conversion',
    event_action: 'registration_click'
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('click', 'external_link', linkText || url);
  
  // Also push to GTM dataLayer
  pushToDataLayer({
    event: 'external_link_click',
    link_url: url,
    link_text: linkText || url,
    event_category: 'outbound',
    event_action: 'click'
  });
};

// GTM-specific tracking functions
export const trackGTMEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  pushToDataLayer({
    event: eventName,
    ...parameters
  });
};

// Track page views for GTM
export const trackGTMPageView = (pagePath: string, pageTitle?: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle || document.title
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string, formLocation?: string) => {
  trackEvent('submit', 'form', formName);
  
  pushToDataLayer({
    event: 'form_submit',
    form_name: formName,
    form_location: formLocation,
    event_category: 'form',
    event_action: 'submit'
  });
};

// Track video interactions
export const trackVideoInteraction = (action: 'play' | 'pause' | 'complete', videoTitle?: string) => {
  trackEvent(action, 'video', videoTitle);
  
  pushToDataLayer({
    event: 'video_interaction',
    video_action: action,
    video_title: videoTitle,
    event_category: 'video',
    event_action: action
  });
};
