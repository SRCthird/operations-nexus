import { clientId, authorityUrl, redirectUri, scopes} from "./Config";
import { Configuration, LogLevel  } from "@azure/msal-browser";
import { msalInstance } from "./index";

/**
 * msalConfig is used to configure the msal instance.
 * @return {Configuration} - This function returns all configurations necisary for the msal instance in JSON format.
 */
export const msalConfig: Configuration = {
    /**
     * Authority information
     * @param {string} clientId - The client ID
     * @param {string} authorityUrl - The authority URL
     * @param {string} redirectUri - The redirect URI
     */
    auth: {
        clientId: clientId,
        authority: authorityUrl,
        redirectUri: redirectUri,
    },
    /**
     * Caching information
     * @param {string} cacheLocation - The cache location of the session. Defaults of "sessionStorage"
     * @param {boolean} storeAuthStateInCookie - The storage of the authentication state in the cookie. Defaults of true
     */
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    },
    system: {
        loggerOptions: {
            /**
             * Logger callback function used by MSAL to log messages.
             * 
             * @param {LogLevel} level - Level of the log which can be: Error, Info, Verbose, or Warning. 
             *                           Specifies the severity/importance of the log.
             * @param {string} message - The message that needs to be logged.
             * @param {boolean} containsPii - Indicates whether the message contains sensitive data. 
             *                               If it does, MSAL won't log it unless configured to do so. 
             *                               In production environments, avoid logging PII for security reasons.
             * @returns {void}
             *
             * Note: Make sure to not log PII (Personally Identifiable Information) as it's a security concern. 
             * The containsPii parameter helps ensure sensitive information is not inadvertently logged.
             */
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
            logLevel: LogLevel.Info
        }
    }
};

/**
 * Used to get the access token for the Power BI API using the current logged user.
 * 
 * @return {Promise<string|null>} - This function returns the access token for the Power BI API.
 */
export const getPowerBIToken = async (): Promise<string|null>  => {
    try {
        const account = msalInstance.getAllAccounts()[0];

        if (!account) {
            // If no account found, ask the user to log in
            await msalInstance.loginPopup();
        }

        const response = await msalInstance.acquireTokenSilent({
            account: msalInstance.getAllAccounts()[0],
            scopes: ['https://analysis.windows.net/powerbi/api/.default'],
        });

        return response.accessToken;
    } catch (error) {
        console.error("Error obtaining token", error);
        return null;
    }
}

/**
 * Export skopes of the AAD app.
 */
export const loginRequest = {
    scopes: scopes
};

/**
 * The endpoint of the Microsoft Graph API.
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};