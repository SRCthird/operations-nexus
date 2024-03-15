import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import "@styles/Admin.css"
import { Form } from "react-bootstrap";
import useDepartment, { Departments } from "@src/webhooks/useDepartments";

interface Props {
  id: number;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  editMode: boolean;
  onChange: (value: Departments) => void;
}

const emptyDepartment:Departments = {
  ID: 0,
  Main: "",
  Department: "",
  Background: "",
  PPTXVersion: 0
}

/**
 * Admin view of the Departments table
 *
 * @returns {JSX.Element} - returns the AdminDepartments element
 */
const DepartmentsForm = ({ id, submit, setSubmit, editMode, onChange }: Props): JSX.Element => {
  const { departments, isLoading } = useDepartment({department: `${id}`});
  const department: Departments = departments[0] ?? emptyDepartment; 

  const [formID, setFormID] = useState(0);
  const [formMain, setFormMain] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formBackground, setFormBackground] = useState("");
  const [formPPTXVersion, setFormPPTXVersion] = useState(0); 
  
  useEffect(()=>{
    if (id===0) {
      setFormID(0);
      setFormMain("");
      setFormDepartment("");
      setFormBackground("");
      setFormPPTXVersion(0);
    } else {
      setFormID(department.ID);
      setFormMain(department.Main);
      setFormDepartment(department.Department);
      setFormBackground(department.Background);
      setFormPPTXVersion(department.PPTXVersion);
    }
  },[department, id]);
  
  const data: Departments = {
    ID: formID,
    Main: formMain,
    Department: formDepartment,
    Background: formBackground,
    PPTXVersion: formPPTXVersion
  }

  return (
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
              onChange({...data, Main: value.target.value });
          }}
        />
        <FormHelperText>The main branch this display is under.</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Department</FormLabel>
        <Input value={formDepartment}
          onChange={(value) => {
            setFormDepartment(value.target.value);
              onChange({...data, Department: value.target.value });
          }}
        />
        <FormHelperText>The name of the area where this display will be used.</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Background</FormLabel>
        <Input value={formBackground}
          onChange={(value) => {
            setFormBackground(value.target.value);
              onChange({...data, Background: value.target.value });
          }}
        />
        <FormHelperText>The icon to be displayed next to the department.</FormHelperText>
      </FormControl>
    </Form>
  )

}

export default DepartmentsForm
