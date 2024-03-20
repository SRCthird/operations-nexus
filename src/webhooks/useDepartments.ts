import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";

/**
 * The query object used to specify departments from the backend.
 * 
 * @param {String?} department - The selected department.
 * @param {string?} searchText - The search text entered by the user in SearchInput.tsx.
 */
export interface DepartmentQuery {
  department?: string;
  searchText?: string;
}

/**
 * Represents the Department object that will be returned to Home.tsx.
 * 
 * @param {number} ID - The ID of the department.
 * @param {string} Main - Main branch of the department.
 * @param {string} Department - Name of department.
 * @param {string} Background - Background Image of the department. (link to image)
 */
export interface Departments {
  ID: number;
  Main: string;
  Department: string;
  Background: string;
  PPTXVersion: number;
}

/**
 * @param {Departments} department - The Department object to be returned to Home.tsx.
 * @param {string} errpr - The error message recieved from the backend.
 * @param {boolean} isLoading - Whether or not the data is currently being fetched.
 */
type typeDepartments = {
  departments: Departments[];
  error: string;
  departmentLoading: boolean;
}

/**
 * The webhook that fetches the departments from the backend.
 * 
 * @returns {typeDepartments} Returns the array of Departments objects, errors and a boolean: isLoading.
 */
const useDepartment = ({ department, searchText }: DepartmentQuery): typeDepartments => {
  const [departments, setDepartment] = useState<Departments[]>([]);
  const [error, setError] = useState('');
  const [departmentLoading, setLoading] = useState(false);


  useEffect(() => {
    let url: string;
    if (department){
        url = `/api/departments/${department}`;
    } else {
      searchText ?
        url = `/api/departments/?search=${searchText}` :
        url = '/api/departments';
    }
    const controller = new AbortController();
    setLoading(true);
    axios.get(url, { signal: controller.signal })
      .then(response => {
        if (department) {
          setDepartment([response.data]);
        } else {
          setDepartment(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [searchText, department]);

  if (typeof departments !== "object") {
    setDepartment([]);
  };

  return { departments, error, departmentLoading }
}

export default useDepartment;
