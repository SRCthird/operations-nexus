
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