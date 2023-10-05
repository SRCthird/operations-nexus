import { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';
import { tryRefreshUserPermissions } from './AzureUtils';
import { getPowerBIToken } from "../authConfig";
import '../styles/PowerBI.css';

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
const PowerBI = ({ reportId, groupId, customEmbedUrl, pageName, accessToken, tokenType }: Props): JSX.Element => {
  const [report, setReport] = useState<Report | null>(null);
  const [powerBIToken, setPowerBIToken] = useState("");

  const embedUrl = !customEmbedUrl
    ? `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1GLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19`
    : customEmbedUrl;

  const errorHandler = (event: any) => {
    console.log(event);
    if (event.detail?.message?.includes("401")) {
      tryRefreshUserPermissions(accessToken);
    }
  };

  // Refreshes the PowerBI token on load of the page.
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

  // Refreshes the component every hour.
  useEffect(() => {
    const refreshInterval = 60 * 60 * 1000; // every hours

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