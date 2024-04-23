import { FormControl, FormLabel, Input, FormHelperText, Select, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import "@styles/Admin.css"
import { Form } from "react-bootstrap";
import { useDepartments } from "@core/Department";
import { useTemplateList } from "@templates";
import { useDisplays, emptyDisplay, Nexus_Display } from '@core/Display';

interface Props {
  id: number;
  editMode: boolean;
  onChange: (value: Nexus_Display) => void;
}

export const DisplaysForm = ({ id, editMode, onChange }: Props) => {
  const [data, setData] = useState<Nexus_Display>({ ...emptyDisplay });
  const { departments, departmentLoading } = useDepartments({});
  const { display } = useDisplays({ id });
  const { templates } = useTemplateList();

  useEffect(() => {
    if (display.id === id) {
      setData(display);
    }
    // eslint-disable-next-line
  }, [display]);


  return (
    <Box className="Admin-Form">
      <Form>
        <FormControl isDisabled={true}>
          <FormLabel>Id</FormLabel>
          <Input value={data.id} />
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Main</FormLabel>
          <Input value={data.main}
            onChange={(value) => {
              setData({ ...data, main: value.target.value });
              onChange({ ...data, main: value.target.value });
            }}
          />
          <FormHelperText>The main branch this display is under.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Department</FormLabel>
          <Select value={data.department}
            onChange={(value) => {
              setData({ ...data, department: value.target.value });
              onChange({ ...data, department: value.target.value });
            }}
          >
            {departmentLoading && <option value={data.department}>{data.department}</option>}
            {departments.map(department => (
              <option key={department.id} value={department.department}>{department.department}</option>
            ))}
          </Select>
          <FormHelperText>The name of the area where this display will be used.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Display</FormLabel>
          <Input value={data.display}
            onChange={(value) => {
              setData({ ...data, display: value.target.value });
              onChange({ ...data, display: value.target.value });
            }}
          />
          <FormHelperText>The name of the display.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Background</FormLabel>
          <Input value={data.background}
            onChange={(value) => {
              setData({ ...data, background: value.target.value });
              onChange({ ...data, background: value.target.value });
            }}
          />
          <FormHelperText>The icon to be displayed next to the department.</FormHelperText>
        </FormControl>
        <FormControl isDisabled={!editMode}>
          <FormLabel>Template</FormLabel>
          <Select
            value={data.title || ""}
            onChange={(value) => {
              setData({ ...data, title: value.target.value });
              onChange({ ...data, title: value.target.value });
            }}
          >
            {!data.title && <option value={""}></option>}
            {templates.map((template) => (
              <option key={template.title} value={template.title}>
                {template.title}
              </option>
            ))}
          </Select>
          <FormHelperText>The template to be used for this display.</FormHelperText>
        </FormControl>
      </Form>
    </Box>
  )

}
