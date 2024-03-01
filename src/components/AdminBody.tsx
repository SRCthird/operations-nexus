import { AddIcon, ArrowLeftIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Grid, GridItem, Heading, useMediaQuery, useDisclosure } from "@chakra-ui/react"
import { useState, ReactNode } from "react";
import SearchInput from "../components/SearchInput";
import "../styles/Admin.css"
import DeleteConfirmation from "../components/DeleteConfirmation";

/**
 * Properties for the Admin Body
 *
 * @param {()=>void} resetForm - The lambda function to reset the form
 * @param {(searchText: string)=>void} onSearch - The lambda function to get the searched text
 * @param {(Data: any)=>void} handleCreate - The CRUD method of creating a new entry
 * @param {ReactNode} handleRead - The CRUD method of displaying a gallery of entries
 * @param {(Data: any)=>void} handleUpdate - The CRUD method of updating an entry
 * @param {(ID: number)=>void} handleDelete - The CRUD method of deleting an entry
 * @param {string} header - the header of the view/edit field
 * @param {(toggle: boolean)=>void} setEditMode - the useState which toggles the editMode
 * @param {boolean} editMode - determines the state of the view
 * @param {string} error - a string of any errors
 * @param {any} data - the data to be viewed in the view/edit screen
 * @param {ReactNode} form - the form to display the data
 * @param {()=>void} remound - the lambda function to remound/refresh the handleRead element
 */
interface Props {
  resetForm: () => void;
  onSearch: (searchText: string) => void;
  handleCreate: (Data: any) => void;
  handleRead: ReactNode;
  handleUpdate: (Data: any) => void;
  handleDelete: (ID: number) => void;
  header: string;
  setEditMode: (toggle: boolean) => void;
  editMode: boolean;
  error: string;
  data: any;
  form: ReactNode;
  remount: () => void;
}

/**
 * The body of the Admin form to create, read, update, and delete information.
 *
 * @param {Props} The properties of the Admin Body
 * @returns {JSX.Element} Returns the Admin Body element
 */
const AdminBody = ({ resetForm, onSearch, setEditMode, editMode, handleCreate, handleRead, handleUpdate, handleDelete, header, error, data, form, remount }: Props): JSX.Element => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [createMode, setCreateMode] = useState(false);
  const [itemSelected, setSelected] = useState(false);
  const [SizeSmall, SizeMed, SizeLarge, SizeXL] = useMediaQuery(['(max-width: 600px)', '(max-width: 900px)', '(max-width: 1280px)', '(min-width: 1280px)']);
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
        <Grid className="Admin-SideBar" gridTemplateRows={'40px 44px 1fr'} gap={5}>
          <SearchInput
            onSearch={(searchText: string) => {
              onSearch(searchText);
            }}
          />
          <Grid className="Admin-NewRecord" gridTemplateColumns={'34px 1fr 34px'}>
            <AddIcon boxSize={'25px'} onClick={() => {
              setCreateMode(true);
              resetForm();
              setSelected(true);
              setEditMode(true);
            }} />
            <Box />
            <RepeatIcon boxSize={'25px'} onClick={() => remount()} />
          </Grid>
          <Box h="1" bgColor="teal" borderRadius="5px" />
          <Box className="Admin-DepartmentList">
            {handleRead}
          </Box>
        </Grid>
      }
      {(!SizeMed || itemSelected) &&
        <Grid className="Admin-Right" gridTemplateRows={'60px 1fr'} gap={5}>
          <Grid className="Admin-SelectedRecord" templateColumns="repeat(10, 1fr)" gap={0}>
            {SizeMed && <ArrowLeftIcon boxSize={'25px'} onClick={() => { setSelected(false) }} />}
            <GridItem colSpan={SizeMed ? 7 : 8}>
              <Heading marginTop={'-6px'} as="h2" size="lg" noOfLines={1}>
                {header}
              </Heading>
            </GridItem>
            {editMode ?
              <>
                <CheckIcon
                  boxSize={'25px'}
                  onClick={() => { handleCheck(data); }}
                  justifySelf="end"
                />
                <CloseIcon
                  boxSize={'25px'}
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
                  onClick={() => {
                    setEditMode(true);
                    setCreateMode(false);
                  }}
                  justifySelf="end"
                />
                <DeleteIcon
                  boxSize={'25px'}
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
