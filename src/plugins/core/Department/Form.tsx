import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import "@styles/Admin.css"
import { Form } from "react-bootstrap";
import { useDepartments, Nexus_Department, emptyDepartment } from "@core/Department";

/**
 * Properties of the Departments Admin Form
 *
 * @param {number} id - The ID of the currently selected item
 * @param {boolean} editMode - The boolean of if the form can be edited or not
 * @param {Departments => void} onChange - The lambda function that returns the changed values of the form
 */
interface Props {
  id: number;
  editMode: boolean;
  onChange: (value: Nexus_Department) => void;
}

/**
 * Admin Form of the Departments table
 *
 * @returns {JSX.Element} - returns the AdminDepartments element
 */
export const DepartmentsForm = ({ id, editMode, onChange }: Props): JSX.Element => {
  const { departments, departmentLoading } = useDepartments({ department: `${id}` });
  const department: Nexus_Department = departments[0] ?? emptyDepartment;
  const [data, setData] = useState({ ...emptyDepartment });

  useEffect(() => {
    if (id !== 0) {
      setData({
        ID: department.ID,
        Main: department.Main,
        Department: department.Department,
        Background: department.Background,
        PPTXVersion: department.PPTXVersion
      })
    }
  }, [department, id]);

  return (
    <Form className="Admin-Form">
      <FormControl isDisabled={true}>
        <FormLabel>Id</FormLabel>
        <Input value={data.ID === 0 ? "" : data.ID} />
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
        <FormLabel>Department</FormLabel>
        <Input value={data.Department}
          onChange={(value) => {
            setData({ ...data, Department: value.target.value });
            onChange({ ...data, Department: value.target.value });
          }}
        />
        <FormHelperText>The name of the area where this display will be used.</FormHelperText>
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
    </Form>
  )
}
