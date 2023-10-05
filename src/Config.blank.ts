
/**
 * Tenant Id (Company Id) of the apps organization.
 */
export const tenantId: string = "";

/**
 * URL used for initiating authorization request
 */
export const authorityUrl: string = `https://login.microsoftonline.com/${tenantId}/`;

/**
 * End point URL for Power BI API
 */
export const powerBiApiUrl: string = "https://api.powerbi.com/";

/**
 * Client Id (Application Id) of the AAD app.
 */
export const clientId: string = "";

/**
 * Client Secret (Application Secret) of the AAD app.
 */
export const clientSecret: string = "";

/**
 * Id of the workspace where the report is hosted
 */
export const groupId: string[] = [
    ""
];

/**
 * Id of the report to be embedded
 */
export const reportId: string[] = [
    ""
];

/**
 * If a report has mulitple pages, this is the index of the page to be embedded.
 */
export const pageName: string[] = [
    ""
];

/**
 * Redirect URI of the AAD app. Must be http://localhost:port or https://{domain}
 */
export const redirectUri: string = "";

/**
 * Scopes of the AAD app.
 */
export const scopes: string[] = [
    "User.Read",
    "https://analysis.windows.net/powerbi/api/Report.Read.All",
    "https://analysis.windows.net/powerbi/api/Dashboard.Read.All",
    // Add more scopes here if needed
];
