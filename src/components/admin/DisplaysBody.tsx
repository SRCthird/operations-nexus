import { useState } from "react";
import DisplayList from "@src/components/DisplayList";
import "@styles/Admin.css"
import axios, { CanceledError } from "axios";
import { DisplayQuery, Displays } from "@hooks/useDisplays";
import Body from "@components/admin/Body";
import DisplaysForm from "@components/admin/DisplaysForm";

const DisplaysBody = () => {
  const [key, updateKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<Displays>({
    ID: 0,
    Main: "",
    Sub: "",
    Department: "",
    Background: "",
    Display: "",
    Page: undefined,
    Page_ID: 0
  })
  const [submit, setSubmit] = useState(false);

  const [error, setError] = useState('');
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({});

  const handleCreate = (data: Displays) => {
    setSubmit(true);
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
    setSubmit(true);
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
      Page: undefined,
      Page_ID: 0
    })
  }

  const remount = () => updateKey(key + 1);

  return (
    <Body
      resetForm={resetForm}
      onSearch={(searchText: string) => {
        setDisplayQuery({ searchText });
      }}
      handleCreate={handleCreate}
      handleRead={
        <DisplayList
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
                Page: display.Page,
                Page_ID: display.Page_ID || 0
              });
              toggleSelected(true);
              remount();
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
          submit={submit}
          setSubmit={setSubmit}
          onChange={
            (display) => {
              setData({
                ID: display.ID,
                Main: display.Main,
                Sub: display.Sub,
                Department: display.Department,
                Background: display.Background,
                Display: display.Display,
                Page: display.Page,
                Page_ID: display.Page_ID || 0
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
