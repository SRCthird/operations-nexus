import { FormControl, FormLabel, Input, FormHelperText, Select, Box, Text, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import "@styles/Admin.css"
import { Form } from "react-bootstrap";
import useDisplays, { Displays } from "@src/webhooks/useDisplays";
import usePages, { Pages } from "@src/webhooks/usePages";
import useDepartment from "@src/webhooks/useDepartments";
import ThreeOnTwo from "./ThreeOnTwo";
import { CheckIcon, CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface Props {
  id: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  onChange: (value: Displays) => void;
}

const emptyDisplay: Displays = {
  ID: 0,
  Main: "",
  Sub: "",
  Department: "",
  Display: "",
  Background: "",
  Page: undefined,
  Page_ID: undefined
}

const DisplaysForm = ({ id, editMode, setEditMode, submit, setSubmit, onChange }: Props) => {
  const [key, setKey] = useState(0);
  const { departments, departmentLoading } = useDepartment({});
  const { displays, displayLoading } = useDisplays({ id });
  const display = displays[0] ?? emptyDisplay;

  const [formID, setFormID] = useState(0);
  const [formMain, setFormMain] = useState("");
  const [formSub, setFormSub] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formDisplay, setFormDisplay] = useState("");
  const [formBackground, setFormBackground] = useState("");
  const [formPage, setFormPage] = useState<Pages | undefined>(undefined);
  const [formPageID, setFormPageID] = useState(0);
  const [viewPage, setViewPage] = useState(false);
  const [submitPage, setSubmitPage] = useState(false);

  const { pages } = usePages({ page: formPage });

  useEffect(() => {
    if (id === 0) {
      setFormID(0);
      setFormMain("");
      setFormSub("");
      setFormDepartment("");
      setFormDisplay("");
      setFormBackground("");
      setFormPage(undefined);
      setFormPageID(0);
    } else {
      setFormID(display.ID);
      setFormMain(display.Main);
      setFormSub(display.Sub);
      setFormDepartment(display.Department);
      setFormDisplay(display.Display);
      setFormBackground(display.Background);
      setFormPage(display.Page);
      setFormPageID(display.Page_ID || 0);
    }
  }, [display, id]);

  const data: Displays = {
    ID: formID,
    Main: formMain,
    Sub: formSub,
    Department: formDepartment,
    Display: formDisplay,
    Background: formBackground,
    Page: formPage,
    Page_ID: formPageID
  }
  return (
    <Box className="Admin-Form">
      <Form>
        <FormControl isDisabled={true}>
          <FormLabel>Id</FormLabel>
          <Input value={formID === 0 ? "" : formID} />
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Main</FormLabel>
          <Input value={formMain}
            onChange={(value) => {
              setFormMain(value.target.value);
              onChange({ ...data, Main: value.target.value });
            }}
          />
          <FormHelperText>The main branch this display is under.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Sub</FormLabel>
          <Input value={formSub}
            onChange={(value) => {
              setFormSub(value.target.value);
              onChange({ ...data, Sub: value.target.value });
            }}
          />
          <FormHelperText>The sub-department this display is under.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Department</FormLabel>
          <Select value={formDepartment}
            onChange={(value) => {
              setFormDepartment(value.target.value);
              onChange({ ...data, Department: value.target.value });
            }}
          >
            {departmentLoading && <option value={formDepartment}>{formDepartment}</option>}
            {departments.map(department => (
              <option key={department.ID} value={department.Department}>{department.Department}</option>
            ))}
          </Select>
          <FormHelperText>The name of the area where this display will be used.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Display</FormLabel>
          <Input value={formDisplay}
            onChange={(value) => {
              setFormDisplay(value.target.value);
              onChange({ ...data, Display: value.target.value });
            }}
          />
          <FormHelperText>The name of the display.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Background</FormLabel>
          <Input value={formBackground}
            onChange={(value) => {
              setFormBackground(value.target.value);
              onChange({ ...data, Background: value.target.value });
            }}
          />
          <FormHelperText>The icon to be displayed next to the department.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Page Layout</FormLabel>
          <Select
            value={formPage ?? ""}
            onChange={(value) => {
              setFormPage(value.target.value as Pages)
              onChange({ ...data, Page: value.target.value as Pages });
            }}
          >
            {formPage ?? <option value={""}></option>}
            {Object.values(Pages).map((pageName) => (
              <option key={pageName} value={pageName}>
                {pageName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Page ID</FormLabel>
          <Select
            value={formPageID ?? 0}
            onChange={(value) => {
              setFormPageID(+value.target.value)
              onChange({ ...data, Page_ID: +value.target.value });
            }}
          >
            {pages.map((page) => (
              <option selected={page.ID === formPageID} key={page.ID} value={page.ID}>
                {page.ID}
              </option>
            ))}
            <option value={0}>Create New</option>
          </Select>
        </FormControl>
      </Form>
      <Box padding={2} border={'1px'} borderRadius={5}>
        {!editMode &&
          <SimpleGrid templateColumns={'1fr 34px'} >
            <Text>Page Information</Text>
            {!viewPage && <ViewIcon onClick={
              () => setViewPage(true)
            } />}
            {viewPage && <ViewOffIcon onClick={
              () => setViewPage(false)
            } />}
          </SimpleGrid>
        }
        {editMode &&
          <SimpleGrid templateColumns={'1fr 34px 34px 34px'} >
            <Text>Page Information</Text>
            {!viewPage && <ViewIcon onClick={
              () => setViewPage(true)
            } />}
            {viewPage && <ViewOffIcon onClick={
              () => setViewPage(false)
            } />}
            <CheckIcon
              onClick={
                () => { 
                  setSubmitPage(true);
                  setEditMode(false);
                }
              }
            />
            <CloseIcon
              onClick={
                () => { 
                  setKey(key + 1);
                  setViewPage(false);
                  setEditMode(false);
                }
              }
            />
          </SimpleGrid>
        }
        <Box hidden={!viewPage}>
          {formPage === Pages.ThreeOnTwo &&
            <ThreeOnTwo
              key={key} 
              pageID={formPageID}
              editMode={editMode}
              submit={submitPage}
              setSubmit={setSubmitPage}
              getPageID={(newID) => {
                setFormPageID(newID);
                onChange({ ...data, Page_ID: newID });
              }}
              parentID={formID}
            />
          }
        </Box>
      </Box>
    </Box>
  )

}

export default DisplaysForm
