import { useState } from "react";
import "@styles/Admin.css"
import axios, { CanceledError } from "axios";
import AdminBody from "@components/AdminBody";
import { DisplayQuery } from "@core/Display";
import { DepartmentsForm, Nexus_Department, DepartmentList, emptyDepartment } from "@core/Department";

const DepartmentsBody = (): JSX.Element => {
  const [key, updateKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({});
  const [data, setData] = useState({ ...emptyDepartment });

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
    if (Data.ID === 0) return;
    const controller = new AbortController();
    axios.patch(`/api/departments/${Data.ID}`, Data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (ID: string) => {
    if (+ID === 0) return;
    const controller = new AbortController();
    axios.delete(`/api/departments/${ID}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const resetForm = () => {
    setData({ ...emptyDepartment });
  }

  const remount = () => updateKey(key + 1);

  return (
    <AdminBody
      resetForm={resetForm}
      onSearch={(searchText: string) => {
        setDisplayQuery({ searchText });
      }}
      handleCreate={handleCreate}
      handleRead={
        <DepartmentList
          key={key}
          searchText={displayQuery.searchText}
          selectedDepartment={displayQuery.department}
          onSelectDepartment={
            (department) => {
              setData({
                ID: department.ID,
                Main: department.Main,
                Department: department.Department,
                Background: department.Background,
                PPTXVersion: department.PPTXVersion
              });
              toggleSelected(true);
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={data.Department || "Select a department"}
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
          id={data.ID}
          editMode={editMode}
          onChange={
            (department) => {
              setData({
                ID: department.ID,
                Main: department.Main,
                Department: department.Department,
                Background: department.Background,
                PPTXVersion: department.PPTXVersion
              });
            }
          }
        />
      }
      remount={remount}
    />
  )
}

export default DepartmentsBody
