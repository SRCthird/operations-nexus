import { Box, Spinner } from "@chakra-ui/react";
import { App, Apps } from '@apps';
import PowerBI, { PowerBITypes } from "./PowerBI";
import Slideshow from "./PowerPoint";
import { useEffect, useState } from "react";
import { minutes } from "@src/utils/time";
import IFrame from "./IFrame";

interface Props {
  app?: App;
  slideShowKey: number;
}

const BuildApp = ({ app, slideShowKey }: Props) => {
  const [ key, setKey ] = useState(0);
  useEffect(() => {

    const interval = setInterval(async () => {
      setKey(prev => prev + 1)
    }, minutes(30));

    return () => clearInterval(interval);
  }, []);

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
        key={key}
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
  if (app.type === Apps.IFrame) {
    return (
      <IFrame
        title={app.name}
        url={app.iFrame?.url!}
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
