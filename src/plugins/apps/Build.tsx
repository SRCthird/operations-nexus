import { Box, Spinner } from "@chakra-ui/react";
import { App, Apps } from '@apps';
import PowerBI, { PowerBITypes } from "./PowerBI";
import Slideshow from "./PowerPoint";
import ActionTracker from "./ActionTracker";

interface Props {
  app?: App;
  slideShowKey: number;
}

const BuildApp = ({ app, slideShowKey }: Props) => {

  if (!app) {
    return (
      <Box paddingLeft={'40%'} paddingTop={'10vh'}>
        <Spinner padding={'20%'} boxSize={'50px'} />
      </Box>
    )
  }
  if (app.type === Apps.PowerBI) {
    return (
      <PowerBI
        type={app.powerBI?.type || PowerBITypes.report}
        reportId={app.powerBI?.reportID!}
        groupId={app.powerBI?.groupID!}
        customEmbedUrl={app.powerBI?.customEmbed}
        pageName={app.powerBI?.pageName}
      />
    )
  }
  if (app.type === Apps.PowerPoint) {
    return (
      <Slideshow
        key={slideShowKey}
        main={app.powerPoint?.main!}
        location={app.powerPoint?.department!}
      />
    )
  }
  if (app.type === Apps.ActionTracker) {
    return (
      <ActionTracker
        department={app.actionTracker?.department!}
        departmentField={app.actionTracker?.departmentField!}
        area={app.actionTracker?.area}
        areaField={app.actionTracker?.areaField}
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
