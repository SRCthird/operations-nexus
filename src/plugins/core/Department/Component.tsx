import { useState } from "react";
import "@styles/Admin.css"
import axios, { CanceledError } from "axios";
import AdminBody from "@components/AdminBody";
import { DisplayQuery } from "@core/Display";
import { DepartmentsForm, Nexus_Department, DepartmentList } from "@core/Department";

const DepartmentsBody = (): JSX.Element => {
  const [key, updateKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formID, setFormID] = useState(-1);
  const [formMain, setFormMain] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formBackground, setFormBackground] = useState("");
  const [formPPTXVersion, setFormPPTXVersion] = useState(0);
  const [error, setError] = useState('');
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({});

  const handleCreate = (Data: Nexus_Department) => {
    const { ID: _, ...newData } = Data;
    const controller = new AbortController();
    axios.post(`/api/departments`, newData)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (Data: Nexus_Department) => {
    if (Data.ID === -1) return;
    const controller = new AbortController();
    axios.patch(`/api/departments/${Data.ID}`, Data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (ID: string) => {
    if (+ID === -1) return;
    const controller = new AbortController();
    axios.delete(`/api/departments/${ID}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const data: Nexus_Department = {
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
        setDisplayQuery({department: undefined, searchText });
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
      header={formDepartment || "Select a department"}
      setEditMode={(toggle: boolean) => {
        setEditMode(toggle);
      }}
      editMode={editMode}
      toggleSelected={toggleSelected}
      itemSelected={itemSelected}
      error={error}
      data={data}
      form={
        <DepartmentsForm
          key={key}
          id={formID}
          editMode={editMode}
          onChange={
            (department) => {
              setFormID(department.ID);
              setFormMain(department.Main);
              setFormDepartment(department.Department);
              setFormBackground(department.Background);
              setFormPPTXVersion(department.PPTXVersion);
            }
          }
        />
      }
      remount={remount}
    />
  )

}

export default DepartmentsBody
