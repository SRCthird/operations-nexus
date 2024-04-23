import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import "@styles/Admin.css"
import { Form } from "react-bootstrap";
import { useDepartments, Nexus_Department, emptyDepartment } from "@core/Department";

interface Props {
  id: number;
  editMode: boolean;
  onChange: (value: Nexus_Department) => void;
}

export const DepartmentsForm = ({ id, editMode, onChange }: Props): JSX.Element => {
  const { department, departmentLoading } = useDepartments({ department: `${id}` });
  const [data, setData] = useState({ ...emptyDepartment });

  useEffect(() => {
    if (id !== 0) {
      setData({
        id: department.id,
        main: department.main,
        department: department.department,
        background: department.background,
        pptxVersion: department.pptxVersion
      })
    }
  }, [department, id]);

  return (
    <Form className="Admin-Form">
      <FormControl isDisabled={true}>
        <FormLabel>Id</FormLabel>
        <Input value={data.id === 0 ? "" : data.id} />
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
        <Input value={data.department}
          onChange={(value) => {
            setData({ ...data, department: value.target.value });
            onChange({ ...data, department: value.target.value });
          }}
        />
        <FormHelperText>The name of the area where this display will be used.</FormHelperText>
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
    </Form>
  )
}
