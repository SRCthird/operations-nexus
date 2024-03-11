import { useEffect, useState } from "react";
import "../styles/Admin.css"
import axios, { CanceledError } from "axios";
import { DisplayQuery } from "../webhooks/useDisplays";
import AdminBody from "./AdminBody";
import DepartmentList from "./DepartmentList";
import PowerPointList from "./PowerPointList";

/**
 * Admin view of the Departments table
 *
 * @param {Props} - the properties of the PowerPoint Admin View
 *
 * @returns {JSX.Element} - returns the AdminDepartments element
 */
const AdminPowerPoints = (): JSX.Element => {
  const [key, updateKey] = useState(1);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [department, setDepartment] = useState("");
  const [data, setData] = useState(null);
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({
    department: null,
    searchText: ''
  });

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
    axios.post(`/api/powerpoint/${department}`, formData)
      .then(_ => {
        alert(`File uploaded successfully`);
        remount();
      })
      .catch(error => {
        alert(`Error uploading file ${error}`);
      });
  };

  //Placeholder function
  const handleCreate = (_: any) => { };

  const handleDownload = (filename: string) => {
    const [location, name] = filename.split("\\");
    const encodedName = encodeURIComponent(name);
    axios.get(`/api/powerpoint/${location}/${encodedName}`, {
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
    axios.delete(`/api/powerpoint/${location}/${encodedName}`)
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
        setDisplayQuery({ ...displayQuery, department: null, searchText });
      }}
      handleCreate={handleCreate}
      handleRead={
        <DepartmentList
          searchText={displayQuery.searchText}
          selectedDepartment={displayQuery.department}
          onSelectDepartment={
            (department) => {
              setDepartment(department.Department);
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
        <PowerPointList
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

export default AdminPowerPoints
