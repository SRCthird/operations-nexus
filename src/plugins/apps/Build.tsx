import { Box, Spinner } from "@chakra-ui/react";
import { Apps, useApps } from '@apps';
import PowerBI, { emptyPowerBI, App_PowerBI, PowerBITypes } from "./PowerBI";
import Slideshow, { emptyPowerPoint, App_PowerPoint } from "./PowerPoint";

interface Props {
  type?: Apps;
  id: number;
  slideShowKey: number;
}

const BuildApp = ({ type, id, slideShowKey }: Props) => {
  const { apps, isAppLoading } = useApps({ app: type, ids: [id] });

  if (type === Apps.PowerBI && !isAppLoading) {
    const app: App_PowerBI = apps[0] || emptyPowerBI;
    let appType: 'report' | 'dashboard' | 'tile' | 'visual' | 'qna';
    switch (app.Type) {
      case PowerBITypes.Dashboard: {
        appType = 'dashboard';
        break;
      }
      case PowerBITypes.Title: {
        appType = 'tile';
        break;
      }
      case PowerBITypes.Visual: {
        appType = 'visual';
        break;
      }
      case PowerBITypes.QNA: {
        appType = 'qna';
        break;
      }
      default: {
        appType = 'report';
        break;
      }
    }
    return (
      <PowerBI
        type={appType}
        reportId={app.PowerBI_ID}
        groupId={app.Group_ID}
        customEmbedUrl={app.Custom_Embed}
        pageName={app.Page_Name}
      />
    )
  }
  if (type === Apps.PowerPoint) {
    const app: App_PowerPoint = apps[0] || emptyPowerPoint;
    return (
      <Slideshow
        key={slideShowKey}
        main={app.Main}
        location={app.Department}
      />
    )
  }
  return (
    <Box paddingLeft={'40%'} paddingTop={'10vh'}>
      <Spinner padding={'20%'} boxSize={'50px'} />
    </Box>
  )
}

export default BuildApp;
