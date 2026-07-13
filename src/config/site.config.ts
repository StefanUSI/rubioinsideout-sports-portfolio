/**
 * Centralized site configuration — single source of truth.
 *
 * Every brand-level constant (names, URLs, social links, contact info)
 * lives here so that nothing is hardcoded across components. This follows
 * the Config-Driven Development principle from the architecture guidelines.
 *
 * When adding a new social platform or brand asset, add it here first,
 * then import from this module wherever needed.
 */
export const SITE_CONFIG = {
  /** Canonical site URL without trailing slash */
  url: "https://rubioinsideout.ch",

  /** Brand name used in UI, meta, and JSON-LD */
  brandName: "rubioinsideout",

  /** Full author name for SEO and structured data */
  authorName: "Stefan Carlen",

  /** Legal name for copyright and legal notices */
  legalName: "Stefan Carlen",

  /** Author job title for JSON-LD Person schema */
  jobTitle: "Multi-sport athlete & content creator",

  social: {
    youtube: "https://youtube.com/@schtefel",
    instagram: "https://www.instagram.com/rubioinsideout/",
    instagramHandstands: "https://www.instagram.com/rubioupsidedown/",
  },

  contact: {
    /** Email username (split for obfuscation in LegalNotice) */
    emailUser: "carlenstefan",
    /** Email domain (split for obfuscation in LegalNotice) */
    emailDomain: "hotmail.com",
  },
} as const;
