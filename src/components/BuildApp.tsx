import { Text } from "@chakra-ui/react";
import useApps, { Apps, PowerBIApp, PowerPointApp } from "@src/webhooks/useApps";
import { emptyPowerBI, PowerBITypes } from "./admin/PowerBIForm";
import { emptyPowerPoint } from "./admin/PowerPointForm";
import PowerBI from "./PowerBI";
import Slideshow from "./Slideshow";

interface Props {
  type?: Apps;
  id: number;
  slideShowKey: number;
}

const BuildApp = ({ type, id, slideShowKey }: Props) => {
  const { apps, isAppLoading } = useApps({ app: type, ids: [id]});
  
  if (type === Apps.PowerBI && !isAppLoading) {
    const app: PowerBIApp = apps[0] || emptyPowerBI;  
    let appType: 'report' | 'dashboard' | 'tile' | 'visual' | 'qna';
    switch(app.Type) {
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
    const app: PowerPointApp = apps[0] || emptyPowerPoint;
    return (
      <Slideshow
        key={slideShowKey}
        main={app.Main}
        location={app.Department}
      />
    )
  }
  return (
    <Text>Error loading application</Text>
  )
}

export default BuildApp;
