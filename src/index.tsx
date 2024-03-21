import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { darkTheme } from '@src/theme';
import { msalConfig } from '@src/authConfig';
import reportWebVitals from '@src/reportWebVitals';
import App from '@src/App';
import '@styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <ChakraProvider theme={darkTheme}>
        <ColorModeScript initialColorMode={darkTheme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
