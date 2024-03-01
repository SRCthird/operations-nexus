import {FormControl, FormLabel, Input, useMediaQuery, FormHelperText} from "@chakra-ui/react"
import { useState } from "react";
import "../styles/Admin.css"
import { Form } from "react-bootstrap";
import axios, { CanceledError } from "axios";
import { DisplayQuery } from "../webhooks/useDisplays";
import { Departments } from "../webhooks/useDepartments";
import AdminBody from "./AdminBody";
import DepartmentList from "./DepartmentList";

/**
 * Admin view of the Departments table
 *
 * @returns {JSX.Element} - returns the AdminDepartments element
 */
const AdminDepartments = (): JSX.Element => {
  const [key, updateKey] = useState(0);
  const [isSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formID, setFormID] = useState(-1);
  const [formMain, setFormMain] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formBackground, setFormBackground] = useState("");
  const [formPPTXVersion, setFormPPTXVersion] = useState(0);
  const [error, setError] = useState('');
  const [SizeSmall, SizeMed, SizeLarge, SizeXL] = useMediaQuery(['(max-width: 600px)', '(max-width: 900px)', '(max-width: 1280px)', '(min-width: 1280px)']);
  const layout = SizeMed ? '1fr' : '30vw 1fr';
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({
    department: null,
    searchText: ''
  });

  const handleCreate = (Data: Departments) => {
    console.log(Data);
    const { ID: _, ...newData } = Data;
    const controller = new AbortController();
    axios.post(`/api/departments`, newData)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (Data: Departments) => {
    console.log(Data);
    if (Data.ID === -1) return;
    const controller = new AbortController();
    axios.patch(`/api/departments/${Data.ID}`, Data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (ID: number) => {
    if (ID === -1) return;
    const controller = new AbortController();
    axios.delete(`/api/departments/${ID}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const data: Departments = {
    ID: formID,
    Main: formMain,
    Department: formDepartment,
    Background: formBackground,
    PPTXVersion: formPPTXVersion
  }

  const resetForm = () => {
    setFormID(-1);
    setFormMain("");
    setFormDepartment("");
    setFormBackground("");
    setFormPPTXVersion(0);
  }

  const remount = () => updateKey(key + 1);

  return (
    <AdminBody
      resetForm={resetForm}
      onSearch={(searchText: string) => {
        setDisplayQuery({ ...displayQuery, department: null, searchText });
      }}
      handleCreate={handleCreate}
      handleRead={
        <DepartmentList
          key={key}
          searchText={displayQuery.searchText}
          selectedDepartment={displayQuery.department}
          onSelectDepartment={
            (department) => {
              setFormID(department.ID);
              setFormMain(department.Main);
              setFormDepartment(department.Department);
              setFormBackground(department.Background);
              setFormPPTXVersion(department.PPTXVersion);
              toggleSelected(true);
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={formDepartment || "Select a display"}
      setEditMode={(toggle: boolean) => {
        setEditMode(toggle);
      }}
      editMode={editMode}
      error={error}
      data={data}
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
            <FormLabel>Department</FormLabel>
            <Input value={formDepartment}
              onChange={(value) => {
                setFormDepartment(value.target.value);
              }}
            />
            <FormHelperText>The name of the area where this display will be used.</FormHelperText>
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
      remount={remount}
    />
  )

}

export default AdminDepartments
