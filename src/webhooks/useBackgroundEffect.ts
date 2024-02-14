import { useEffect } from 'react';

/**
 * Sets the background based off the given information.
 *
 * @param {string} backgroundColor The main color of the background.
 * @param {string} backgroundGradient The optional gradient color.
 *
 * @returns {void}
 */
const useBackgroundEffect = (backgroundColor: string, backgroundGradient?: string): void => {
    useEffect(() => {
        if (backgroundGradient) {
            document.body.style.background = `linear-gradient(to right, ${backgroundColor}, ${backgroundGradient})`;
        } else {
            document.body.style.background = backgroundColor;
        }
        return () => {
            document.body.style.background = "none";
        };
    }, [backgroundColor, backgroundGradient]);
}

export default useBackgroundEffect;

