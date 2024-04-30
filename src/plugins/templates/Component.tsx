import { useState } from "react";
import "@styles/Admin.css"
import { CanceledError } from "axios";
import AdminBody from "@components/AdminBody";
import { emptyTemplate } from "@templates/empty";
import api from "@src/utils/api";
import { Template } from "./types";
import TemplateList from "./components/templateList";
import { TemplateForm } from "./Form";

const TemplatesBody = () => {
  const [listKey, updateListKey] = useState(0);
  const [formKey, updateFormKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<Template>({...emptyTemplate});
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const handleCreate = (data: Template) => {
    const { id: _, ...newData } = data;
    const controller = new AbortController();
    api.post("/template", newData)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (data: Template) => {
    if (data.id === 0) return;
    const controller = new AbortController();
    api.patch(`/template/${data.id}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (id: string) => {
    if (+id === 0) return;
    const controller = new AbortController();
    api.delete(`/template/${id}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const resetForm = () => {
    setData({...emptyTemplate});
    remount();
  }

  const remount = () => {
    updateListKey(listKey + 1);
    updateFormKey(formKey + 1);
  } 

  return (
    <AdminBody
      resetForm={resetForm}
      onSearch={(searchText: string) => {
        setQuery(searchText);
      }}
      handleCreate={handleCreate}
      handleRead={
        <TemplateList
          key={listKey}
          searchText={query}
          selected={data.title}
          onSelect={
            (template) => {
              updateFormKey(formKey + 1);
              setData({
                id: template.id,
                title: template.title,
                design: template.design,
                background: template.background,
                gradient: template.gradient,
                transition: template.transition,
                apps: template.apps,
              });
              toggleSelected(true);
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={data.title || "Select a template"}
      setEditMode={(toggle: boolean) => {
        setEditMode(toggle);
      }}
      editMode={editMode}
      toggleSelected={toggleSelected}
      itemSelected={itemSelected}
      error={error}
      data={data}
      form={
        <TemplateForm
          key={formKey}
          template={data}
          setTemplate={setData}
          editMode={editMode}
        />
      }
      remount={remount}
    />
  )

}

export default TemplatesBody 
