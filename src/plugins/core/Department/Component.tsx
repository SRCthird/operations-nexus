import { useState } from "react";
import "@styles/Admin.css"
import { CanceledError } from "axios";
import AdminBody from "@components/AdminBody";
import { DisplayQuery } from "@core/Display";
import { DepartmentsForm, Nexus_Department, DepartmentList, emptyDepartment } from "@core/Department";
import api from "@src/utils/api";

const DepartmentsBody = (): JSX.Element => {
  const [key, updateKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({});
  const [data, setData] = useState({ ...emptyDepartment });

  const handleCreate = (Data: Nexus_Department) => {
    const { id: _, ...newData } = Data;
    const controller = new AbortController();
    api.post(`/departments`, newData)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (Data: Nexus_Department) => {
    if (Data.id === 0) return;
    const controller = new AbortController();
    api.patch(`/departments/${Data.id}`, Data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (ID: string) => {
    if (+ID === 0) return;
    const controller = new AbortController();
    api.delete(`/departments/${ID}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const resetForm = () => {
    setData({ ...emptyDepartment });
    remount();
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
                id: department.id,
                main: department.main,
                department: department.department,
                background: department.background,
                pptxVersion: department.pptxVersion
              });
              toggleSelected(true);
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={data.department || "Select a department"}
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
          id={data.id}
          editMode={editMode}
          onChange={
            (department) => {
              setData({
                id: department.id,
                main: department.main,
                department: department.department,
                background: department.background,
                pptxVersion: department.pptxVersion
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
