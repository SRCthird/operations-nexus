import { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';
import { tryRefreshUserPermissions } from './AzureUtils';
import { getPowerBIToken, refreshAADToken } from "./AzureUtils"; 
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
  type?: 'report' | 'dashboard' | 'tile' | 'visual' | 'qna';
  reportId: string,
  groupId: string,
  customEmbedUrl?: string,
  pageName?: string
}

/**
 * The Power BI component that displays pages and reports.
 * 
 * @param {interface} Props - The properties of the Power BI component. 
 * @returns {JSX.Element} - Returns the Power BI component.  
 */
const PowerBI = ({ type, reportId, groupId, customEmbedUrl, pageName }: Props): JSX.Element => {
  const [report, setReport] = useState<Report | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [powerBIToken, setPowerBIToken] = useState("");

  const embedUrl = !customEmbedUrl
    ? `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1GLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19`
    : customEmbedUrl;
  
  const viewType = type? type: 'report';

  /** Refreshes the access token.*/ 
  const fetchAADToken = async () => {
    try {
        const token = await refreshAADToken();
        if (token) setAccessToken(token);
    } catch (error) {
        console.error('Error getting AAD token:', error);
    }
  }

  /** Refreshes the Power BI token.*/ 
  const fetchPBIToken = async () => {
      try {
          const token = await getPowerBIToken();
          if (token) setPowerBIToken(token);
      } catch (error) {
          console.error('Error getting PowerBI token:', error);
      }
  }

  /**
   * Handles the error of the Power BI report.
   * 
   * @param {any} event - The event object. 
   * @returns {Promise<void>} - Returns an asyn void.
   */
  const errorHandler = async (event: any): Promise<void> => {
    console.log(event);
    if (event.detail?.message?.includes("401")) {
      const account = msalInstance.getAllAccounts()[0];

      if (!account) {
          // If no account found, ask the user to log in
          await msalInstance.loginPopup();
      }
      fetchAADToken();
      tryRefreshUserPermissions(accessToken);
    }
  };

  // Refresh Power BI token every 50 minutes.
  useEffect(() => {
    fetchPBIToken();

    const refreshInterval = 50 * 60 * 1000;

    const interval = setInterval(() => {
      fetchPBIToken();
    }, refreshInterval);
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Refreshes the report every hour.
  useEffect(() => {
    const refreshInterval =  60 * 60 * 1000;

    const interval = setInterval(() => {
      if (report) {
        console.log('Attempting to reload report...');
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
        type: viewType,
        id: reportId,
        embedUrl: embedUrl,
        accessToken: powerBIToken,
        tokenType: models.TokenType.Aad,
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