import { useState } from "react";
import "@styles/Admin.css"
import axios, { CanceledError } from "axios";
import AdminBody from "@components/AdminBody";
import { DisplayQuery, Displays, DisplaysForm, emptyDisplay, DisplayPanel } from "@core/Display";

const DisplaysBody = () => {
  const [key, updateKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<Displays>({...emptyDisplay});
  const [error, setError] = useState('');
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({});

  const handleCreate = (data: Displays) => {
    const { ID: _, ...newData } = data;
    const controller = new AbortController();
    axios.post(`/api/display`, newData)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (data: Displays) => {
    if (data.ID === 0) return;
    const controller = new AbortController();
    axios.patch(`/api/display/${data.ID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (ID: string) => {
    if (+ID === 0) return;
    const controller = new AbortController();
    axios.delete(`/api/display/${ID}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const resetForm = () => {
    setData({
      ID: 0,
      Main: "",
      Sub: "",
      Department: "",
      Background: "",
      Display: "",
      Template: undefined,
      Template_ID: 0
    })
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
                ID: display.ID,
                Main: display.Main,
                Sub: display.Sub,
                Department: display.Department,
                Background: display.Background,
                Display: display.Display,
                Template: display.Template,
                Template_ID: display.Template_ID || 0
              });
              toggleSelected(true);
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={data.Display || "Select a display"}
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
          id={data.ID}
          editMode={editMode}
          setEditMode={setEditMode}
          onChange={
            (display) => {
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
          }
        />
      }
      remount={remount}
    />
  )

}

export default DisplaysBody
