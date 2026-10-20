import type { Config } from "tailwindcss";

// Token values live in app/theme.css (per data-site theme) so one class set (bg-surface, text-primary, font-headline-lg…)
// renders the Serene (portal/SMP) or Warm (SD) design system from the Stitch exports.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      "colors": {
        "primary-fixed-dim": "rgb(var(--c-primary-fixed-dim) / <alpha-value>)",
        "primary-container": "rgb(var(--c-primary-container) / <alpha-value>)",
        "tertiary-fixed": "rgb(var(--c-tertiary-fixed) / <alpha-value>)",
        "primary-fixed": "rgb(var(--c-primary-fixed) / <alpha-value>)",
        "secondary-fixed": "rgb(var(--c-secondary-fixed) / <alpha-value>)",
        "on-tertiary-container": "rgb(var(--c-on-tertiary-container) / <alpha-value>)",
        "surface-dim": "rgb(var(--c-surface-dim) / <alpha-value>)",
        "surface-container-highest": "rgb(var(--c-surface-container-highest) / <alpha-value>)",
        "on-error": "rgb(var(--c-on-error) / <alpha-value>)",
        "on-tertiary-fixed": "rgb(var(--c-on-tertiary-fixed) / <alpha-value>)",
        "inverse-primary": "rgb(var(--c-inverse-primary) / <alpha-value>)",
        "on-surface": "rgb(var(--c-on-surface) / <alpha-value>)",
        "on-background": "rgb(var(--c-on-background) / <alpha-value>)",
        "on-error-container": "rgb(var(--c-on-error-container) / <alpha-value>)",
        "on-secondary-container": "rgb(var(--c-on-secondary-container) / <alpha-value>)",
        "surface-variant": "rgb(var(--c-surface-variant) / <alpha-value>)",
        "inverse-surface": "rgb(var(--c-inverse-surface) / <alpha-value>)",
        "on-primary": "rgb(var(--c-on-primary) / <alpha-value>)",
        "outline": "rgb(var(--c-outline) / <alpha-value>)",
        "background": "rgb(var(--c-background) / <alpha-value>)",
        "on-secondary": "rgb(var(--c-on-secondary) / <alpha-value>)",
        "tertiary-container": "rgb(var(--c-tertiary-container) / <alpha-value>)",
        "on-primary-fixed": "rgb(var(--c-on-primary-fixed) / <alpha-value>)",
        "on-tertiary-fixed-variant": "rgb(var(--c-on-tertiary-fixed-variant) / <alpha-value>)",
        "surface-bright": "rgb(var(--c-surface-bright) / <alpha-value>)",
        "surface-container": "rgb(var(--c-surface-container) / <alpha-value>)",
        "error": "rgb(var(--c-error) / <alpha-value>)",
        "surface-container-high": "rgb(var(--c-surface-container-high) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--c-on-surface-variant) / <alpha-value>)",
        "tertiary": "rgb(var(--c-tertiary) / <alpha-value>)",
        "secondary-fixed-dim": "rgb(var(--c-secondary-fixed-dim) / <alpha-value>)",
        "surface-tint": "rgb(var(--c-surface-tint) / <alpha-value>)",
        "on-secondary-fixed-variant": "rgb(var(--c-on-secondary-fixed-variant) / <alpha-value>)",
        "primary": "rgb(var(--c-primary) / <alpha-value>)",
        "tertiary-fixed-dim": "rgb(var(--c-tertiary-fixed-dim) / <alpha-value>)",
        "outline-variant": "rgb(var(--c-outline-variant) / <alpha-value>)",
        "on-primary-container": "rgb(var(--c-on-primary-container) / <alpha-value>)",
        "secondary": "rgb(var(--c-secondary) / <alpha-value>)",
        "surface-container-lowest": "rgb(var(--c-surface-container-lowest) / <alpha-value>)",
        "surface-container-low": "rgb(var(--c-surface-container-low) / <alpha-value>)",
        "error-container": "rgb(var(--c-error-container) / <alpha-value>)",
        "surface": "rgb(var(--c-surface) / <alpha-value>)",
        "inverse-on-surface": "rgb(var(--c-inverse-on-surface) / <alpha-value>)",
        "on-primary-fixed-variant": "rgb(var(--c-on-primary-fixed-variant) / <alpha-value>)",
        "on-secondary-fixed": "rgb(var(--c-on-secondary-fixed) / <alpha-value>)",
        "on-tertiary": "rgb(var(--c-on-tertiary) / <alpha-value>)",
        "secondary-container": "rgb(var(--c-secondary-container) / <alpha-value>)"
      },
      "spacing": {
        "space-xl": "var(--sp-space-xl)",
        "margin-mobile": "var(--sp-margin-mobile)",
        "space-sm": "var(--sp-space-sm)",
        "margin-tablet": "var(--sp-margin-tablet)",
        "space-lg": "var(--sp-space-lg)",
        "gutter-mobile": "var(--sp-gutter-mobile)",
        "gutter": "var(--sp-gutter)",
        "space-xs": "var(--sp-space-xs)",
        "space-md": "var(--sp-space-md)",
        "margin": "var(--sp-margin)"
      },
      "borderRadius": {
        "DEFAULT": "var(--r-DEFAULT)",
        "lg": "var(--r-lg)",
        "xl": "var(--r-xl)",
        "full": "var(--r-full)"
      },
      "fontFamily": {
        "headline-lg-mobile": [
          "var(--ff-headline-lg-mobile)"
        ],
        "caption": [
          "var(--ff-caption)"
        ],
        "body-lg": [
          "var(--ff-body-lg)"
        ],
        "subheading": [
          "var(--ff-subheading)"
        ],
        "headline-sm": [
          "var(--ff-headline-sm)"
        ],
        "display-hero": [
          "var(--ff-display-hero)"
        ],
        "display-hero-mobile": [
          "var(--ff-display-hero-mobile)"
        ],
        "headline-lg": [
          "var(--ff-headline-lg)"
        ],
        "body-md": [
          "var(--ff-body-md)"
        ],
        "headline-md": [
          "var(--ff-headline-md)"
        ],
        "label-md": [
          "var(--ff-label-md)"
        ],
        "label-lg": [
          "var(--ff-label-lg)"
        ],
        "body-sm": [
          "var(--ff-body-sm)"
        ],
        "title-md": [
          "var(--ff-title-md)"
        ],
        "title-lg": [
          "var(--ff-title-lg)"
        ],
        "label-sm": [
          "var(--ff-label-sm)"
        ],
        "display-mobile": [
          "var(--ff-display-mobile)"
        ],
        "display": [
          "var(--ff-display)"
        ]
      },
      "fontSize": {
        "headline-lg-mobile": [
          "var(--fs-headline-lg-mobile)",
          {
            "lineHeight": "var(--lh-headline-lg-mobile)",
            "letterSpacing": "var(--ls-headline-lg-mobile)",
            "fontWeight": "var(--fw-headline-lg-mobile)"
          }
        ],
        "caption": [
          "var(--fs-caption)",
          {
            "lineHeight": "var(--lh-caption)",
            "letterSpacing": "var(--ls-caption)",
            "fontWeight": "var(--fw-caption)"
          }
        ],
        "body-lg": [
          "var(--fs-body-lg)",
          {
            "lineHeight": "var(--lh-body-lg)",
            "letterSpacing": "var(--ls-body-lg)",
            "fontWeight": "var(--fw-body-lg)"
          }
        ],
        "subheading": [
          "var(--fs-subheading)",
          {
            "lineHeight": "var(--lh-subheading)",
            "letterSpacing": "var(--ls-subheading)",
            "fontWeight": "var(--fw-subheading)"
          }
        ],
        "headline-sm": [
          "var(--fs-headline-sm)",
          {
            "lineHeight": "var(--lh-headline-sm)",
            "letterSpacing": "var(--ls-headline-sm)",
            "fontWeight": "var(--fw-headline-sm)"
          }
        ],
        "display-hero": [
          "var(--fs-display-hero)",
          {
            "lineHeight": "var(--lh-display-hero)",
            "letterSpacing": "var(--ls-display-hero)",
            "fontWeight": "var(--fw-display-hero)"
          }
        ],
        "display-hero-mobile": [
          "var(--fs-display-hero-mobile)",
          {
            "lineHeight": "var(--lh-display-hero-mobile)",
            "letterSpacing": "var(--ls-display-hero-mobile)",
            "fontWeight": "var(--fw-display-hero-mobile)"
          }
        ],
        "headline-lg": [
          "var(--fs-headline-lg)",
          {
            "lineHeight": "var(--lh-headline-lg)",
            "letterSpacing": "var(--ls-headline-lg)",
            "fontWeight": "var(--fw-headline-lg)"
          }
        ],
        "body-md": [
          "var(--fs-body-md)",
          {
            "lineHeight": "var(--lh-body-md)",
            "letterSpacing": "var(--ls-body-md)",
            "fontWeight": "var(--fw-body-md)"
          }
        ],
        "headline-md": [
          "var(--fs-headline-md)",
          {
            "lineHeight": "var(--lh-headline-md)",
            "letterSpacing": "var(--ls-headline-md)",
            "fontWeight": "var(--fw-headline-md)"
          }
        ],
        "label-md": [
          "var(--fs-label-md)",
          {
            "lineHeight": "var(--lh-label-md)",
            "letterSpacing": "var(--ls-label-md)",
            "fontWeight": "var(--fw-label-md)"
          }
        ],
        "label-lg": [
          "var(--fs-label-lg)",
          {
            "lineHeight": "var(--lh-label-lg)",
            "letterSpacing": "var(--ls-label-lg)",
            "fontWeight": "var(--fw-label-lg)"
          }
        ],
        "body-sm": [
          "var(--fs-body-sm)",
          {
            "lineHeight": "var(--lh-body-sm)",
            "letterSpacing": "var(--ls-body-sm)",
            "fontWeight": "var(--fw-body-sm)"
          }
        ],
        "title-md": [
          "var(--fs-title-md)",
          {
            "lineHeight": "var(--lh-title-md)",
            "letterSpacing": "var(--ls-title-md)",
            "fontWeight": "var(--fw-title-md)"
          }
        ],
        "title-lg": [
          "var(--fs-title-lg)",
          {
            "lineHeight": "var(--lh-title-lg)",
            "letterSpacing": "var(--ls-title-lg)",
            "fontWeight": "var(--fw-title-lg)"
          }
        ],
        "label-sm": [
          "var(--fs-label-sm)",
          {
            "lineHeight": "var(--lh-label-sm)",
            "letterSpacing": "var(--ls-label-sm)",
            "fontWeight": "var(--fw-label-sm)"
          }
        ],
        "display-mobile": [
          "var(--fs-display-mobile)",
          {
            "lineHeight": "var(--lh-display-mobile)",
            "letterSpacing": "var(--ls-display-mobile)",
            "fontWeight": "var(--fw-display-mobile)"
          }
        ],
        "display": [
          "var(--fs-display)",
          {
            "lineHeight": "var(--lh-display)",
            "letterSpacing": "var(--ls-display)",
            "fontWeight": "var(--fw-display)"
          }
        ]
      }
    },
  },
  plugins: [],
};
export default config;
