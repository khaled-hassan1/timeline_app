// assets/js/constants.js

const AppURLs = {
  // Base URL for the website (useful for canonical links, sitemaps etc.)
  BASE_URL: "https://timeline.sa/",

  // --- Navigation Links ---
  HOME: "index.html",
  ABOUT_SECTION: "index.html#about", // Link to specific section on home page
  SERVICES_SECTION: "index.html#services", // Link to specific section on home page
  AWARDS: "awards.html",
  PRODUCTION: "production.html",
  EVENT_MANAGEMENT_SECTION: "index.html#eventManagementTitle", // Link to specific section on home page
  TIME_LAPSE_SECTION: "index.html#timeLapseTitle", // Link to specific section on home page
  OUR_BUSINESS: "our_business.html",
  CONTACT: "contact.html",
  PRIVACY_POLICY: "privacy.html",

  // --- Social Media & External Links ---
  YOUTUBE_PROFILE: "https://www.youtube.com/@timelinesa3835", // Please verify this YouTube link, it seems unusual
  EMAIL_CONTACT: "mailto:info@timeline.sa",
  VIMEO_PROFILE: "https://vimeo.com/timelinepe",
  TWITTER_X_PROFILE: "https://x.com/timeline_sa",
  INSTAGRAM_PROFILE: "https://www.instagram.com/timeline_sa/",
  DESIGNRUSH_PROFILE: "https://www.designrush.com/agency/profile/timeline-for-production-events",

  // --- Core Asset Paths (Relative to BASE_URL or root) ---
  // These are often kept static in HTML for faster loading/SEO, but can be centralized.
  // Favicons:
  FAVICON_96x96: "assets/img/logo/favicon-96x96.png",
  FAVICON_SVG: "assets/img/logo/favicon.svg",
  FAVICON_ICO: "assets/img/logo/favicon.ico",
  APPLE_TOUCH_ICON: "assets/img/logo/apple-touch-icon.png",
  WEB_MANIFEST: "assets/img/logo/site.webmanifest",

  // Open Graph / Twitter Images:
  OG_IMAGE: "assets/img/og-image.jpg",
  TWITTER_IMAGE: "assets/img/twitter-image.jpg",

  // --- Schema.org URLs ---
  SCHEMA_URL_OUR_BUSINESS: "https://timeline.sa/our-business.html",
  SCHEMA_URL_ORGANIZATION: "https://timeline.sa",

  // --- Vimeo Video Embeds (iframe src) ---
  // Make sure these match the specific video content
  VIMEO_SANAD: "https://player.vimeo.com/video/1051586854?badge=0&autopause=0&player_id=0&app_id=58479",
  VIMEO_RIYADH_VALLEY: "https://player.vimeo.com/video/1051615435?badge=0&autopause=0&player_id=0&app_id=58479",
  VIMEO_RAS_AL_KHAIR: "https://player.vimeo.com/video/981221019?badge=0&autopause=0&player_id=0&app_id=58479",
  VIMEO_TADAWUL_INFOGRAPHICS: "https://player.vimeo.com/video/1007228244?badge=0&autopause=0&player_id=0&app_id=58479",
  VIMEO_SAUDI_EXIM: "https://player.vimeo.com/video/980741484?badge=0&autopause=0&player_id=0&app_id=58479",
  VIMEO_ACWA_POWER: "https://player.vimeo.com/video/976641531?badge=0&autopause=0&player_id=0&app_id=58479",
  VIMEO_MADINA: "https://player.vimeo.com/video/976640101?badge=0&autopause=0&player_id=0&app_id=58479",
  VIMEO_MONSHAAT: "https://player.vimeo.com/video/976639830?badge=0&autopause=0&player_id=0&app_id=58479",
  VIMEO_ALANDALUS_PROPERTY: "https://player.vimeo.com/video/976617923?badge=0&autopause=0&player_id=0&app_id=58479",


  // Note: Vimeo embed URLs are usually specific to each video content.
  // While they *could* be put here, it often adds more complexity to dynamically load them
  // via JavaScript compared to the benefit, as they rarely change.
  // For now, I recommend keeping iframe src attributes directly in the HTML.
};