import { extendTheme, ThemeConfig } from "@chakra-ui/react";

/**
 * Initialize the Chakra UI theme as 'dark'.
 */
const config: ThemeConfig = {
    initialColorMode: 'dark'
};

/**
 * Dark theme of Chakra UI.
 */
export const darkTheme = extendTheme({
    config,
    colors: {
        gray: {
            50: '#f8f9fa',
            100: '#e9ecef',
            200: '#dee2e6',
            300: '#ced4da',
            400: '#adb5bd',
            500: '#6c757d',
            600: '#495057',
            700: '#343a40',
            800: '#212529',
            900: '#111',
        }
    }
});

/**
 * Light theme of Chakra UI.
 */
export const lightTheme = extendTheme({
    config: {
        initialColorMode: 'light',
    },
    colors: {
        white: {
            0: '#fae0e4',
            50: '#fae0e4',
            100: '#f7cad0',
            200: '#f9bec7',
            300: '#fbb1bd',
            400: '#ff99ac',
            500: '#ff85a1',
            600: '#ff7096',
            700: '#ff5c8a',
            800: '#ff477e',
            900: '#ff0a54',
        }
    }
});