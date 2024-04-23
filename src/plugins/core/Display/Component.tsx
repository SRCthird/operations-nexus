import { useState } from "react";
import "@styles/Admin.css"
import { CanceledError } from "axios";
import AdminBody from "@components/AdminBody";
import { DisplayQuery, Nexus_Display, DisplaysForm, emptyDisplay, DisplayPanel } from "@core/Display";
import api from "@src/utils/api";

const DisplaysBody = () => {
  const [key, updateKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<Nexus_Display>({...emptyDisplay});
  const [error, setError] = useState('');
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({});

  const handleCreate = (data: Nexus_Display) => {
    const { id: _, ...newData } = data;
    const controller = new AbortController();
    api.post("/display", newData)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (data: Nexus_Display) => {
    if (data.id === 0) return;
    const controller = new AbortController();
    api.patch(`/display/${data.id}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (id: string) => {
    if (+id === 0) return;
    const controller = new AbortController();
    api.delete(`/display/${id}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const resetForm = () => {
    setData({...emptyDisplay});
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
        <DisplayPanel
          key={key}
          searchText={displayQuery.searchText}
          selectedDisplay={displayQuery.department}
          onSelectDisplay={
            (display) => {
              setData({
                id: display.id,
                main: display.main,
                department: display.department,
                background: display.background,
                display: display.display,
                title: display.title,
                template: display.template
              });
              toggleSelected(true);
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={data.display || "Select a display"}
      setEditMode={(toggle: boolean) => {
        setEditMode(toggle);
      }}
      editMode={editMode}
      toggleSelected={toggleSelected}
      itemSelected={itemSelected}
      error={error}
      data={data}
      form={
        <DisplaysForm
          key={key}
          id={data.id}
          editMode={editMode}
          onChange={
            (display) => {
              setData({
                id: display.id,
                main: display.main,
                department: display.department,
                background: display.background,
                display: display.display,
                title: display.title,
                template: display.template
              });
            }
          }
        />
      }
      remount={remount}
    />
  )

}

export default DisplaysBody
