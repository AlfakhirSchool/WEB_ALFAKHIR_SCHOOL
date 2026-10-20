/** sessionStorage flag: splash already shown in this tab. */
export const LOADER_KEY = "alf-loaded";

/** Inline <head> script, runs before hydration: hide the splash for repeat visits, reduced motion, or `?no-loader`. */
export const loaderBootScript = `try{if(sessionStorage.getItem("${LOADER_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches||/[?&]no-loader/.test(location.search))document.documentElement.setAttribute("data-alf-seen","")}catch(e){}`;
