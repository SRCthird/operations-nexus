import { Box, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { App_IFrame } from './types';
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { App } from "../types";
import { emptyIFrame } from "./empty";

interface Props {
  app: App_IFrame;
  setApp: Dispatch<SetStateAction<App>>;
  editMode: boolean;
}

export const IFrameForm = ({ app, setApp, editMode }: Props) => {
  const [iFrame, setIFrame] = useState<App_IFrame>(app || emptyIFrame);

  useEffect(() => {
    setApp(prev => ({
      ...prev,
      iFrame: iFrame
    }))
    // eslint-disable-next-line
  }, [iFrame])

  return (
    <Box>
      <FormControl isDisabled={!editMode}>
        <FormLabel>URL</FormLabel>
        <Input value={app.url}
          onChange={(value) => {
            setIFrame(prev => ({ 
              ...prev, 
              url: value.target.value 
            }));
          }}
        />
        <FormHelperText>The link to your desired webpage. Keep in mind that some websites aren't compatible with iFrames</FormHelperText>
      </FormControl>
    </Box>
  );
}
