import { useEffect, useRef, useState } from 'react';
import { models, service, factories } from 'powerbi-client';
import { getPowerBIToken } from '@src/components/AzureUtils';
import { PowerBITypes } from './types';

type Props = {
  type: PowerBITypes;
  reportId: string,
  groupId: string,
  customEmbedUrl?: string,
  pageName?: string
}

const PowerBIEmbed = ({ type, reportId, groupId, customEmbedUrl, pageName }: Props) => {
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState<any>();
  const embedContainer = useRef(null);

  const embedUrl = !customEmbedUrl
    ? `https://app.powerbi.com/${type}Embed?${type}Id=${reportId}&groupId=${groupId}&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1GLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19`
    : customEmbedUrl;

  const fetchPBIToken = async () => {
    try {
      const token = await getPowerBIToken();
      if (token) setAccessToken(token);
    } catch (error) {
      console.error('Error getting PowerBI token:', error);
    }
  }

  useEffect(() => {
    fetchPBIToken();

    const interval = setInterval(async () => {
      await fetchPBIToken();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (embedContainer.current && accessToken !== "") {
      const embedConfig = {
        type,
        id: reportId,
        embedUrl,
        accessToken,
        tokenType: models.TokenType.Aad,
        pageName,
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false
            }
          },
          navContentPaneEnabled: false,
          background: models.BackgroundType.Transparent,
          layoutType: models.LayoutType.Custom,
          customLayout: {
            displayOption: models.DisplayOption.FitToPage,
          },
        },
      }

      const powerbiService = new service.Service(
        factories.hpmFactory,
        factories.wpmpFactory,
        factories.routerFactory
      );
      try {
        const report = powerbiService.embed(embedContainer.current, embedConfig);
        report.on('loaded', () => {
          console.log('Report loaded successfully');
        });
        report.on('rendered', () => {
          console.log('Report rendered successfully');
        });
        report.on('error', (event) => {
          const errorMsg = event.detail;
          console.error('Power BI Error:', errorMsg);
          setError(errorMsg);
        });
      } catch (err) {
        console.error('Embedding Error:', err);
        setError('An error occurred while embedding the report.');
      }
    }
  }, [accessToken]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {error ? (
        <div style={{ 
          background: 'white',
          color: 'red' 
        }}>
          <p>Error embedding Power BI report:</p>
          <pre>{error}</pre>
        </div>
      ) : (
        <div
          ref={embedContainer}
          style={{ height: '100%', width: '100%' }}
        ></div>
      )}
    </div>
  );
};

export default PowerBIEmbed;
