import { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';
import { tryRefreshUserPermissions } from './AzureUtils';
import { getPowerBIToken, refreshAADToken } from "../authConfig";
import '../styles/PowerBI.css';
import { msalInstance } from '..';

/**
 * Properties of the PowerBI component.
 * 
 * @param {string} reportID - The ID of the Power BI report.
 * @param {string} groupId - The ID of the Power BI group.
 * @param {string} customEmbedUrl - The URL of the Power BI custom embed is necessary.
 * @param {string} pageName - The name of the page in the Power BI report.
 * @param {string} accessToken - The access token provided on login request.
 * @param {0 | 1} tokenType - The type of the access token. 1 == Embed, 0 == AAD. Default is 0.
 */
interface Props {
  reportId: string,
  groupId: string,
  customEmbedUrl?: string,
  pageName: string,
  accessToken: string,
  tokenType?: 0 | 1
}

/**
 * The Power BI component that displays pages and reports.
 * 
 * @param {interface} Props - The properties of the Power BI component. 
 * @returns {JSX.Element} - Returns the Power BI component.  
 */
const PowerBI = ({ reportId, groupId, customEmbedUrl, pageName, accessToken: initialAccessToken, tokenType }: Props): JSX.Element => {
  const [report, setReport] = useState<Report | null>(null);
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [powerBIToken, setPowerBIToken] = useState("");

  const embedUrl = !customEmbedUrl
    ? `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1GLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19`
    : customEmbedUrl;

  const errorHandler = async (event: any) => {
    console.log(event);
    if (event.detail?.message?.includes("401")) {
      const account = msalInstance.getAllAccounts()[0];

      if (!account) {
          // If no account found, ask the user to log in
          await msalInstance.loginPopup();
      }
      tryRefreshUserPermissions(accessToken);
    }
  };

  useEffect(() => {
      const fetchToken = async () => {
          try {
              const token = await getPowerBIToken();
              if (token) setPowerBIToken(token);
          } catch (error) {
              console.error('Error getting PowerBI token:', error);
          }
      }
      fetchToken();
  }, []);

  // Refresh tokens every 50 minutes.
  useEffect(() => {
    const refreshInterval = 50 * 60 * 1000;
  
    const refreshTokensAndReloadReport = async () => {
      try {
        const [powerBiToken, aadToken] = await Promise.all([
          getPowerBIToken(),
          refreshAADToken()
        ]);
  
        if (powerBiToken) setPowerBIToken(powerBiToken);
        if (aadToken) setAccessToken(aadToken);
      } catch (error) {
        console.error('Error refreshing tokens: ', error);
      }
    };
  
    const interval = setInterval(() => {
      refreshTokensAndReloadReport();
    }, refreshInterval);
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Refreshes the component every three hours.
  useEffect(() => {
    const refreshInterval =  3 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      if (report) {
        report.reload().catch((error) => {
          console.error("Error reloading report:", error);
        });
      }
    }, refreshInterval);

    return () => {
      clearInterval(interval);
    }
  }, [report]);

  return (
    <PowerBIEmbed
      embedConfig={{
        type: 'report',
        id: reportId,
        embedUrl: embedUrl,
        accessToken: powerBIToken,
        tokenType: tokenType === 1 ? models.TokenType.Embed : models.TokenType.Aad,
        pageName: pageName,
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false
            }
          },
          navContentPaneEnabled: false,
          background: models.BackgroundType.Transparent,
        }
      }}

      eventHandlers={
        new Map([
          ['loaded', function () { console.log('Report loaded'); }],
          ['rendered', function () { console.log('Report rendered'); }],
          ['error', errorHandler],
          ['visualClicked', () => console.log('visual clicked')],
          ['pageChanged', (event) => console.log(event)],
        ])
      }

      cssClassName={"reportClass"}

      getEmbeddedComponent={(embeddedReport) => {
        setReport(embeddedReport as Report);
      }}
    />
  )
}

export default PowerBI;