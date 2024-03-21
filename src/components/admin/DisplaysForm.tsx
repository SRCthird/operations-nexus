import { FormControl, FormLabel, Input, FormHelperText, Select, Box, Text, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import "@styles/Admin.css"
import { Form } from "react-bootstrap";
import useDisplays, { Displays } from "@hooks/useDisplays";
import usePages, { Pages } from "@hooks/usePages";
import useDepartment from "@hooks/useDepartments";
import ThreeOnTwoForm from "@components/admin/ThreeOnTwoForm";
import { CheckIcon, CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface Props {
  id: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  onChange: (value: Displays) => void;
}

const emptyDisplay:Displays ={
  ID: 0,
  Main: "",
  Sub: "",
  Department: "",
  Background: "",
  Display: "",
  Page: undefined,
  Page_ID: 0
}

const DisplaysForm = ({ id, editMode, setEditMode, submit, setSubmit, onChange }: Props) => {
  const [key, setKey] = useState(0);
  const [data, setData] = useState<Displays>({...emptyDisplay});
  const [submitPage, setSubmitPage] = useState(false);
  const [viewPage, setViewPage] = useState(false);

  const { departments, departmentLoading } = useDepartment({});
  const { displays } = useDisplays({ id });
  const display:Displays = displays[0] ?? emptyDisplay;
  const { pages } = usePages({ page: data.Page });

  useEffect(() => {
    if (display.ID !== 0) {
      setData({
        ID: display.ID,
        Main: display.Main,
        Sub: display.Sub,
        Department: display.Department,
        Background: display.Background,
        Display: display.Display,
        Page: display.Page,
        Page_ID: display.Page_ID
      });
    }
  }, [display]);

  return (
    <Box className="Admin-Form">
      <Form>
        <FormControl isDisabled={true}>
          <FormLabel>Id</FormLabel>
          <Input value={data.ID} />
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Main</FormLabel>
          <Input value={data.Main}
            onChange={(value) => {
              setData({ ...data, Main: value.target.value });
              onChange({ ...data, Main: value.target.value });
            }}
          />
          <FormHelperText>The main branch this display is under.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Sub</FormLabel>
          <Input value={data.Sub}
            onChange={(value) => {
              setData({ ...data, Sub: value.target.value });
              onChange({ ...data, Sub: value.target.value });
            }}
          />
          <FormHelperText>The sub-department this display is under.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Department</FormLabel>
          <Select value={data.Department}
            onChange={(value) => {
              setData({ ...data, Department: value.target.value });
              onChange({ ...data, Department: value.target.value });
            }}
          >
            {departmentLoading && <option value={data.Department}>{data.Department}</option>}
            {departments.map(department => (
              <option key={department.ID} value={department.Department}>{department.Department}</option>
            ))}
          </Select>
          <FormHelperText>The name of the area where this display will be used.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Display</FormLabel>
          <Input value={data.Display}
            onChange={(value) => {
              setData({ ...data, Display: value.target.value });
              onChange({ ...data, Display: value.target.value });
            }}
          />
          <FormHelperText>The name of the display.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Background</FormLabel>
          <Input value={data.Background}
            onChange={(value) => {
              setData({ ...data, Background: value.target.value });
              onChange({ ...data, Background: value.target.value });
            }}
          />
          <FormHelperText>The icon to be displayed next to the department.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Page Layout</FormLabel>
          <Select
            value={data.Page || ""}
            onChange={(value) => {
              setData({ ...data, Page: value.target.value as Pages });
              onChange({ ...data, Page: value.target.value as Pages });
            }}
          >
            {!data.Page && <option value={""}></option>}
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
            value={data.Page_ID}
            onChange={(value) => {
              setData({ ...data, Page_ID: +value.target.value });
              onChange({ ...data, Page_ID: +value.target.value });
            }}
          >
            {pages.map((page) => (
              <option key={page.ID} value={page.ID}>
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
          {data.Page === Pages.ThreeOnTwo &&
            <ThreeOnTwoForm
              key={key}
              pageID={data.Page_ID || 0}
              editMode={editMode}
              setEditMode={setEditMode}
              submit={submitPage}
              setSubmit={setSubmitPage}
              getPageID={(newID) => {
                setData({ ...data, Page_ID: newID });
                onChange({ ...data, Page_ID: newID });
              }}
              parentID={data.ID}
            />
          }
        </Box>
      </Box>
    </Box>
  )

}

export default DisplaysForm
