import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { Grid, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  onDelete: ()=>void;
  onDownload: ()=>void;
}

const PowerPointListItem = ({ title, onDelete, onDownload }: Props) => {
  return (
    <Grid 
      templateColumns={'1fr 34px 34px'}
      padding={'15px'}
      gap={'16'}
    >
      <Text fontWeight={'medium'}>{title}</Text>
      <DownloadIcon boxSize={'34px'} onClick={onDownload} />
      <DeleteIcon boxSize={'34px'} onClick={onDelete}/>
    </Grid>
  )
}

export default PowerPointListItem;
