import {Box, FormControl, Grid, Heading, FormLabel, Input, FormHelperText, Button,} from "@chakra-ui/react"
import { useState } from "react";
import "../styles/Admin.css"
import AdminBody from "../components/AdminBody";
import { DisplayQuery, Displays } from "../webhooks/useDisplays";
import { Departments } from "../webhooks/useDepartments";
import axios, { CanceledError } from "axios";
import DisplayList from "../components/DisplayList";
import { Form } from "react-bootstrap";

interface Prod {
  title: string;

}

const Admin = ({ title }: Prod): JSX.Element => {
  const [key, setKey] = useState(0);
  const [isSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [display, setDisplay] = useState(0);
  const [formID, setFormID] = useState(-1);
  const [formMain, setFormMain] = useState("");
  const [formSub, setFormSub] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formDisplay, setFormDisplay] = useState("");
  const [formBackground, setFormBackground] = useState("");
  const [error, setError] = useState("");
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({
    department: null,
    searchText: ''
  });

  const resetForm = () => {
    setFormID(-1);
    setFormMain("");
    setFormSub("");
    setFormDepartment("");
    setFormDisplay("");
    setFormBackground("");
  }

  return (
    <Box className="Admin-Container">
      <Grid className="Admin-Title" templateColumns={'1fr 200px 200px 200px'} gap={'15px'} padding={'15px'}>
        <Heading as="h1" h="max-content">{title}</Heading>
        <Button alignSelf={'center'} onClick={() => { setDisplay(0) }}> Departments</Button>
        <Button alignSelf={'center'} onClick={() => { setDisplay(1) }}> Displays</Button>
        <Button alignSelf={'center'} onClick={() => { setDisplay(2) }}> Actions</Button>
      </Grid>
      <AdminBody
        resetForm={resetForm}
        onSearch={(searchText: string) => {
          setDisplayQuery({ ...displayQuery, department: null, searchText });
        }}
        handleCreate={(Data: Displays) => {
          console.log(Data);
          const { ID: _, ...newData } = Data;
          const controller = new AbortController();
          axios.post(`/api/display`, newData)
            .catch(err => {
              if (err instanceof CanceledError) return;
              setError(err.message);
            });
          return () => controller.abort();
        }}
        handleRead={
          <DisplayList
            key={key}
            searchText={displayQuery.searchText}
            selectedDisplay={displayQuery.department}
            onSelectDisplay={
              (display) => {
                setFormID(display.ID);
                setFormMain(display.Main);
                setFormSub(display.Sub);
                setFormDepartment(display.Department);
                setFormDisplay(display.Display);
                setFormBackground(display.Background);
                toggleSelected(true);
              }
            }
          />
        }
        handleUpdate={(Data: Displays) => {
          console.log(Data);
          if (Data.ID === -1) return;
          const controller = new AbortController();
          axios.patch(`/api/display/${Data.ID}`, Data)
            .catch(err => {
              if (err instanceof CanceledError) return;
              setError(err.message);
            });
          return () => controller.abort();
        }}
        handleDelete={(ID: number) => {
          if (ID === -1) return;
          const controller = new AbortController();
          axios.delete(`/api/display/${ID}`)
            .catch(err => {
              if (err instanceof CanceledError) return;
              setError(err.message);
            });
          resetForm();
          return () => controller.abort();
        }}
        header={formDisplay || "Select a display"}
        setEditMode={(toggle: boolean)=>{
          setEditMode(toggle);
        }}
        editMode={editMode}
        error={error}
        data={{
          ID: formID,
          Main: formMain,
          Sub: formSub,
          Department: formDepartment,
          Display: formDisplay,
          Background: formBackground,
        }}
        form={
          <Form className="Admin-Form">
            <FormControl isDisabled={true}>
              <FormLabel>Id</FormLabel>
              <Input value={formID === -1 ? "" : formID} />
            </FormControl>
            <FormControl isDisabled={!editMode}>
              <FormLabel>Main</FormLabel>
              <Input value={formMain}
                onChange={(value) => {
                  setFormMain(value.target.value);
                }}
              />
              <FormHelperText>The main branch this display is under.</FormHelperText>
            </FormControl>
            <FormControl isDisabled={!editMode}>
              <FormLabel>Sub</FormLabel>
              <Input value={formSub}
                onChange={(value) => {
                  setFormSub(value.target.value);
                }}
              />
              <FormHelperText>The sub-department this display is under.</FormHelperText>
            </FormControl>
            <FormControl isDisabled={!editMode}>
              <FormLabel>Department</FormLabel>
              <Input value={formDepartment}
                onChange={(value) => {
                  setFormDepartment(value.target.value);
                }}
              />
              <FormHelperText>The name of the area where this display will be used.</FormHelperText>
            </FormControl>
            <FormControl isDisabled={!editMode}>
              <FormLabel>Display</FormLabel>
              <Input value={formDisplay}
                onChange={(value) => {
                  setFormDisplay(value.target.value);
                }}
              />
              <FormHelperText>The name of the display.</FormHelperText>
            </FormControl>
            <FormControl isDisabled={!editMode}>
              <FormLabel>Background</FormLabel>
              <Input value={formBackground}
                onChange={(value) => {
                  setFormBackground(value.target.value);
                }}
              />
              <FormHelperText>The icon to be displayed next to the department.</FormHelperText>
            </FormControl>
          </Form>
        }
        remount={()=>setKey(key+1)}
      />
    </Box>
  )
}

export default Admin
