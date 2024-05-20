import { AddIcon, ArrowLeftIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Grid, GridItem, Heading, useMediaQuery, useDisclosure, useColorMode } from "@chakra-ui/react"
import { useState, ReactNode } from "react";
import SearchInput from "@components/SearchInput";
import "@styles/Admin.css"
import DeleteConfirmation from "@components/DeleteConfirmation";

interface Props {
  resetForm: () => void;
  onSearch: (searchText: string) => void;
  handleCreate: (Data: any, location?: string) => void;
  handleRead: ReactNode;
  handleUpdate: (Data: any, location?: string) => void;
  handleDelete: (ID: string, location?: string) => void;
  header: string;
  setEditMode: (toggle: boolean) => void;
  editMode: boolean;
  toggleSelected: (toggle: boolean) => void;
  itemSelected: boolean;
  error: string;
  data: any;
  form: ReactNode;
  remount: () => void;
  hideAffects?: boolean;
}

const AdminBody = ({ resetForm, onSearch, toggleSelected, itemSelected, setEditMode, editMode, handleCreate, handleRead, handleUpdate, handleDelete, header, error, data, form, remount, hideAffects }: Props): JSX.Element => {
  const { colorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [createMode, setCreateMode] = useState(false);
  const [SizeMed] = useMediaQuery(['(max-width: 900px)']);
  const layout = SizeMed ? '1fr' : '30vw 1fr';

  const handleCheck = (Data: any) => {
    if (createMode) {
      handleCreate(Data);
    } else {
      handleUpdate(Data);
    }
    setCreateMode(false);
    setEditMode(false);
    remount();
  }

  return (
    <Grid className="Admin-Body"
      templateRows={'1fr'}
      templateColumns={layout}
      gap={16}
    >
      {(!SizeMed || !itemSelected) &&
        <Grid 
          className={colorMode === 'dark' ? "Admin-SideBar" : "Admin-SideBar-Light"} 
          gridTemplateRows={'40px 44px 5px 1fr'} 
          gap={5}
        >
          <SearchInput
            onSearch={(searchText: string) => {
              onSearch(searchText);
            }}
          />
          <Grid className="Admin-NewRecord" gridTemplateColumns={'34px 1fr 34px'}>
            <AddIcon
              visibility={hideAffects ? 'hidden' : 'visible'}
              boxSize={'25px'} 
              onClick={() => {
                setCreateMode(true);
                toggleSelected(true);
                setEditMode(true);
                resetForm();
              }} />
            <Box />
            <RepeatIcon boxSize={'25px'} onClick={() => remount()} />
          </Grid>
          <Box h="1" bgColor="teal" borderRadius="5px" />
          <Box 
            className="Admin-List"
          >
            {handleRead}
          </Box>
        </Grid>
      }
      {(!SizeMed || itemSelected) &&
        <Grid 
          className={colorMode === 'dark' ? "Admin-Right": "Admin-Right-Light"} 
          gridTemplateRows={'60px 1fr'} gap={5}
        >
          <Grid 
            className={colorMode === 'dark' ? "Admin-SelectedRecord" : "Admin-SelectedRecord-Light"} 
            templateColumns="repeat(10, 1fr)" 
            gap={0}
          >
            {SizeMed && <ArrowLeftIcon boxSize={'25px'}
              onClick={() => {
                toggleSelected(false);
                setEditMode(false);
              }}
            />}
            <GridItem colSpan={SizeMed ? 7 : 8}>
              <Heading marginTop={'-6px'} as="h2" size="lg" noOfLines={1}>
                {header}
              </Heading>
            </GridItem>
            {editMode ?
              <>
                <CheckIcon
                  boxSize={'25px'}
                  visibility={hideAffects ? 'hidden' : 'visible'}
                  onClick={() => { handleCheck(data); }}
                  justifySelf="end"
                />
                <CloseIcon
                  boxSize={'25px'}
                  visibility={hideAffects ? 'hidden' : 'visible'}
                  onClick={() => {
                    setEditMode(false);
                    setCreateMode(false);
                  }}
                  justifySelf="end"
                />
              </> :
              <>
                <EditIcon
                  boxSize={'25px'}
                  visibility={hideAffects ? 'hidden' : 'visible'}
                  onClick={() => {
                    setEditMode(true);
                    setCreateMode(false);
                  }}
                  justifySelf="end"
                />
                <DeleteIcon
                  boxSize={'25px'}
                  visibility={hideAffects ? 'hidden' : 'visible'}
                  onClick={onToggle}
                  justifySelf="end"
                />
              </>
            }
            <DeleteConfirmation
              isOpen={isOpen}
              onClose={onClose}
              onToggle={onToggle}
              message={`Are you sure you want to delete this item?`}
              onDelete={() => {
                handleDelete(data.ID);
                remount();
                onToggle();
              }}
            />
          </Grid>
          {form}
        </Grid>
      }
    </Grid>
  )

}

export default AdminBody
