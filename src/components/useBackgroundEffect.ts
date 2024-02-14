import { useEffect } from 'react';

const useBackgroundEffect = (backgroundColor: string, backgroundGradient: string) => {
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

