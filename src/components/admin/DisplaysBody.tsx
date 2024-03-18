import { useState } from "react";
import DisplayList from "@src/components/DisplayList";
import "@styles/Admin.css"
import axios, { CanceledError } from "axios";
import { DisplayQuery, Displays } from "@src/webhooks/useDisplays";
import { Pages } from "@src/webhooks/usePages";
import Body from "./Body";
import DisplaysForm from "./DisplaysForm";

const DisplaysBody = () => {
  const [key, updateKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formID, setFormID] = useState(-1);
  const [formMain, setFormMain] = useState("");
  const [formSub, setFormSub] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formDisplay, setFormDisplay] = useState("");
  const [formBackground, setFormBackground] = useState("");
  const [formPage, setFormPage] = useState<Pages | undefined>(undefined);
  const [formPageID, setFormPageID] = useState<number | undefined>(undefined);
  const [submit, setSubmit] = useState(false);

  const [error, setError] = useState('');
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({
    department: undefined,
    searchText: undefined
  });

  const handleCreate = (Data: Displays) => {
    setSubmit(true);
    const { ID: _, ...newData } = Data;
    newData.Page_ID = formPageID;
    const controller = new AbortController();
    axios.post(`/api/display`, newData)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (Data: Displays) => {
    setSubmit(true);
    if (Data.ID === -1) return;
    Data.Page_ID = formPageID;
    const controller = new AbortController();
    axios.patch(`/api/display/${Data.ID}`, Data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (ID: string) => {
    if (+ID === -1) return;
    const controller = new AbortController();
    axios.delete(`/api/display/${ID}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const data: Displays = {
    ID: formID,
    Main: formMain,
    Sub: formSub,
    Department: formDepartment,
    Display: formDisplay,
    Background: formBackground,
    Page: formPage,
    Page_ID: formPageID
  }

  const resetForm = () => {
    setFormID(-1);
    setFormMain("");
    setFormSub("");
    setFormDepartment("");
    setFormDisplay("");
    setFormBackground("");
    setFormPage(undefined);
    setFormPageID(0);
  }

  const remount = () => updateKey(key + 1);

  return (
    <Body
      resetForm={resetForm}
      onSearch={(searchText: string) => {
        setDisplayQuery({department: undefined, searchText });
      }}
      handleCreate={handleCreate}
      handleRead={
        <DisplayList
          key={key}
          searchText={displayQuery.searchText}
          selectedDisplay={displayQuery.department}
          onSelectDisplay={
            (display) => {
              setFormID(display.ID);
              setFormMain(display.Main);
              setFormSub(display.Sub);
              setFormDepartment(display.Department);
              setFormDisplay(display.Display);
              setFormBackground(display.Background);
              setFormPage(display.Page);
              setFormPageID(display.Page_ID || 0);
              toggleSelected(true);
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={formDisplay || "Select a display"}
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
          id={formID}
          editMode={editMode}
          setEditMode={setEditMode}
          submit={submit}
          setSubmit={setSubmit}
          onChange={
            (display) => {
              setFormID(display.ID);
              setFormMain(display.Main);
              setFormSub(display.Sub);
              setFormDepartment(display.Department);
              setFormDisplay(display.Display);
              setFormBackground(display.Background);
              setFormPage(display.Page);
              setFormPageID(display.Page_ID);
            }
          }
        />
      }
      remount={remount}
    />
  )

}

export default DisplaysBody
