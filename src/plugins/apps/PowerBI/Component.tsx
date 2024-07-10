import { useEffect, useRef, useState } from 'react';
import { models, service, factories } from 'powerbi-client';
import { getPowerBIToken } from '@src/components/AzureUtils';
import { PowerBITypes } from './types';
import { Embed } from 'embed';
import { powerBiConfig } from '@src/Config';

type Props = {
  type: PowerBITypes;
  reportId: string,
  groupId: string,
  customEmbedUrl?: string,
  pageName?: string
}
const PowerBIEmbed = ({ type, reportId, groupId, customEmbedUrl, pageName }: Props) => {
  const [accessToken, setAccessToken] = useState("");
  const [report, setReport] = useState<Embed>();
  const embedContainer = useRef<HTMLInputElement | null>(null);

  const embedUrl = !customEmbedUrl
    ? `https://app.powerbi.com/${type}Embed?${type}Id=${reportId}&groupId=${groupId}&config=${btoa(JSON.stringify(powerBiConfig))}`
    : customEmbedUrl;


  useEffect(() => {
    const fetchPBIToken = async () => {
      try {
        const token = await getPowerBIToken();
        if (token) setAccessToken(token);
      } catch (error) {
        console.error('Error getting PowerBI token:', error);
      }
    }
    fetchPBIToken();
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
      setReport(() => {
        if (embedContainer.current === null) return;
        try {
          const _report = powerbiService.embed(
            embedContainer.current,
            embedConfig
          )
          _report.on('loaded', () => {
            console.log('Report loaded successfully');
          });
          _report.on('rendered', () => {
            console.log('Report rendered successfully');
          });
          _report.on('error', (event) => {
            const errorMsg = event.detail;
            console.error('Power BI Error:', errorMsg);
          });
          return _report;
        } catch (err) {
          console.error('Embedding Error:', err);
        }
      });
    }
    // eslint-disable-next-line
  }, [accessToken]);

  return (
    <div
      ref={embedContainer}
      style={{ height: '100%', width: '100%' }}
    ></div>
  );
};

export default PowerBIEmbed;
