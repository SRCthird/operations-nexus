import { msalInstance } from "@src/index";
import {InteractionRequiredAuthError} from '@azure/msal-browser';
import { loginRequest } from "@src/authConfig";

/**
 * Refreshes the permissions of the user.
 * 
 * @param {string} accessToken - The access token provided on login request.
 * @returns {void}
 */
export const tryRefreshUserPermissions = (accessToken: string): void => {
    fetch("https://api.powerbi.com/v1.0/myorg/RefreshUserPermissions", {
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        method: "POST"
    })
        .then(function (response) {
            if (response.ok) {
                console.log("User permissions refreshed successfully.");
            } else {
                if (response.status === 429) {
                    console.error("Permissions refresh will be available in up to an hour.");
                } else {
                    console.error(response);
                }
            }
        })
        .catch(function (error) {
            console.error("Failure in making API call." + error);
        });
}

/**
 * Used to get the access token for the Power BI API using the current logged user.
 * 
 * @return {Promise<string|null>} - This function returns the access token for the Power BI API.
 */
export const getPowerBIToken = async (): Promise<string>  => {
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
        return "";
    }
}

/**
 * 
 * @returns {Promise<string>} - This function returns the access token for the AAD API.
 */
export const refreshAADToken = async (): Promise<string> => {
    try {
        const account = msalInstance.getAllAccounts()[0];

        if (!account) {
            await msalInstance.loginPopup();
        }

        const response = await msalInstance.acquireTokenSilent({
            account: msalInstance.getAllAccounts()[0],
            scopes: loginRequest.scopes,
        });
        return response.accessToken;
    } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
            return msalInstance
                .acquireTokenPopup(loginRequest)
                .then((response) => {
                    if (response && response.accessToken) {
                        return response.accessToken;
                    }
                    return "";
                })
                .catch((e) => {
                    console.error("Login failed:\n", e);
                    alert("Login failed. Please try again.");
                    return "";
                });
        } else {
            console.error(error);
            return "";
        }
    }
};
