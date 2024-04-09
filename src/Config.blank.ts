
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
 * End point URL for Action Tracker Sharepoint API
 */
export const sharePointApiUrl: string = "https://<!-- your company -->.sharepoint.com/sites/<!-- your site --> /_api/web/lists/GetByTitle('<!-- your list -->')";

/**
 * Client Id (Application Id) of the AAD app.
 */
export const clientId: string = "";

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
  "https://graph.microsoft.com/Sites.Read.All"
  // Add more scopes here if needed
];
