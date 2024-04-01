import { AddIcon } from "@chakra-ui/icons";
import { Box, Grid, Input, Spinner } from "@chakra-ui/react";
import { useSlideshow, PowerPointListItem } from "@core/SlideShow";

interface Props {
  handleFileChange: (event: any) => void;
  handleUpload: () => void;
  handleDownload: (filename: string) => void;
  handleDelete: (filename: string) => void;
  department: string;
}

export const SlideShowForm = ({ handleFileChange, handleUpload, handleDownload, handleDelete, department }: Props) => {
  const { powerPoints, pptxError, isLoading } = useSlideshow(department);
  
  return (
    <Box className="Admin-Form">
      <Grid templateColumns={'1fr 34px'} padding={'15px'} gap={'16px'}>
        <Input type="file" accept=".pptx" onChange={handleFileChange} />
        <AddIcon boxSize={'34px'} onClick={handleUpload} />
      </Grid>
      {isLoading &&
        <Box paddingLeft={'40%'} paddingTop={'10vh'}>
          <Spinner padding={'20%'} boxSize={'50px'} />
        </Box>
      }
      {powerPoints.map(powerPoint => {
        return (
          <PowerPointListItem
            key={powerPoint.length}
            title={powerPoint}
            onDownload={() => {
              handleDownload(powerPoint);
            }}
            onDelete={() => {
              handleDelete(powerPoint);
            }}
          />
        )
      })}
    </Box>
  )
}
