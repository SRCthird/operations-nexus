import { FormControl, FormLabel, Input, FormHelperText, Select, Box, Text, SimpleGrid } from "@chakra-ui/react"
import { CheckIcon, CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import "@styles/Admin.css"
import { Form } from "react-bootstrap";
import { useDepartments } from "@core/Department";
import { useTemplates, Templates, TemplateForm } from "@templates";
import { useDisplays, emptyDisplay, Nexus_Display } from '@core/Display';

interface Props {
  id: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  onChange: (value: Nexus_Display) => void;
}

export const DisplaysForm = ({ id, editMode, setEditMode, onChange }: Props) => {
  const [key, setKey] = useState(0);
  const [data, setData] = useState<Nexus_Display>({ ...emptyDisplay });
  const [submitPage, setSubmitPage] = useState(false);
  const [viewPage, setViewPage] = useState(false);

  const { departments, departmentLoading } = useDepartments({});
  const { displays } = useDisplays({ id: id ?? 0 });
  const display: Nexus_Display = displays[0] ?? emptyDisplay;
  const { pages, isPageLoading } = useTemplates({ page: data.Template });

  useEffect(() => {
    if (!isPageLoading) {
      const pageExists = pages.some(page => page.ID === data.Template_ID);
      if (!pageExists) {
        setData({ ...data, Template_ID: 0 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageLoading]);

  useEffect(() => {
    if (display.ID !== 0) {
      setData({
        ID: display.ID,
        Main: display.Main,
        Sub: display.Sub,
        Department: display.Department,
        Background: display.Background,
        Display: display.Display,
        Template: display.Template,
        Template_ID: display.Template_ID || 0
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
            value={data.Template || ""}
            onChange={(value) => {
              setData({ ...data, Template: value.target.value as Templates });
              onChange({ ...data, Template: value.target.value as Templates });
            }}
          >
            {!data.Template && <option value={""}></option>}
            {Object.values(Templates).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Page ID</FormLabel>
          <Select
            value={data.Template_ID}
            onChange={(value) => {
              setData({ ...data, Template_ID: +value.target.value });
              onChange({ ...data, Template_ID: +value.target.value });
            }}
          >
            {pages.map((page) => (
              <option key={page.ID} value={page.ID}>
                {page.ID}
              </option>
            ))}
            {(!pages.some(page => page.ID === data.Template_ID) && data.Template_ID !== 0) &&
              <option value={data.Template_ID}>
                {data.Template_ID}
              </option>
            }
            <option value={0}>Create New</option>
          </Select>
        </FormControl>
      </Form>
      <Box padding={2} border={'1px'} borderRadius={5}>
        {editMode ? (
          <SimpleGrid templateColumns={'1fr 34px 34px 34px'} >
            <Text>Page Information</Text>
            {viewPage ?
              <ViewOffIcon
                onClick={() => setViewPage(false)}
              /> :
              <ViewIcon
                onClick={() => setViewPage(true)}
              />
            }
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
        ) : (
          <SimpleGrid templateColumns={'1fr 34px'} >
            <Text>Page Information</Text>
            {viewPage ?
              <ViewOffIcon
                onClick={() => setViewPage(false)}
              /> :
              <ViewIcon
                onClick={() => setViewPage(true)}
              />
            }
          </SimpleGrid>
        )}
        <Box hidden={!viewPage}>
          <TemplateForm
            key={key}
            data={data}
            editMode={editMode}
            setEditMode={setEditMode}
            submitPage={submitPage}
            setSubmitPage={setSubmitPage}
            setData={setData}
            onChange={onChange}
          />
        </Box>
      </Box>
    </Box>
  )

}
