import { useState } from "react";
import "@styles/Admin.css"
import axios, { CanceledError } from "axios";
import AdminBody from "@components/AdminBody";
import { DisplayQuery } from "@core/Display";
import { DepartmentList } from "@core/Department";
import { SlideShowForm } from "@core/SlideShow";
import api from "@src/utils/api";

const SlideShowsBody = () => {
  const [key, updateKey] = useState(1);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [department, setDepartment] = useState("");
  const [data, setData] = useState(null);
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({});

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.pptx')) {
      setData(file);
    } else {
      alert('Please select a .pptx file.');
    }
  };

  const handleUpload = () => {
    if (!data) {
      alert('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', data);
    api.post(`/powerpoint/${department}`, formData)
      .then(_ => {
        alert(`File uploaded successfully`);
        remount();
      })
      .catch(error => {
        setError(error);
        alert(`Error uploading file ${error}`);
      });
  };

  //Placeholder function
  const handleCreate = (_: any) => { };

  const handleDownload = (filename: string) => {
    const [location, name] = filename.split("\\");
    const encodedName = encodeURIComponent(name);
    api.get(`/powerpoint/${location}/${encodedName}`, {
      responseType: 'blob',
      signal: new AbortController().signal
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        if (axios.isCancel(error)) return;
        alert(`Error downloading file ${error}`);
      });
  };

  //Placeholder function
  const handleUpdate = (_: any) => { };

  const handleDelete = (filename: string) => {
    const [location, name] = filename.split("\\");
    const encodedName = encodeURIComponent(name);
    const controller = new AbortController();
    api.delete(`/powerpoint/${location}/${encodedName}`)
      .then(_ => {
        remount()
      })
      .catch(error => {
        if (error instanceof CanceledError) return;
        alert(`Error deleting file ${error}`);
      });
    return () => controller.abort();
  }

  const resetForm = () => { };

  const remount = () => {
    updateKey(key + 1);
  };

  return (
    <AdminBody
      resetForm={resetForm}
      onSearch={(searchText: string) => {
        setDisplayQuery({ department: undefined, searchText });
      }}
      handleCreate={handleCreate}
      handleRead={
        <DepartmentList
          searchText={displayQuery.searchText}
          selectedDepartment={displayQuery.department}
          onSelectDepartment={
            (department) => {
              setDepartment(department.department);
              toggleSelected(true);
              remount();
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={department || "Select a department"}
      setEditMode={(toggle: boolean) => {
        setEditMode(toggle);
      }}
      editMode={editMode}
      toggleSelected={toggleSelected}
      itemSelected={itemSelected}
      error={error}
      data={data}
      form={
        <SlideShowForm
          key={key}
          handleDownload={handleDownload}
          handleDelete={handleDelete}
          handleUpload={handleUpload}
          handleFileChange={handleFileChange}
          department={department}
        />
      }
      remount={remount}
      hideAffects={true}
    />
  )

}

export default SlideShowsBody
