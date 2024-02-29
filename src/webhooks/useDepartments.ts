import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";

/**
 * The query object used to specify displays from the backend.
 * 
 * @param {string} searchText - The search text entered by the user in SearchInput.tsx.
 */
export interface DepartmentQuery {
  searchText: string;
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
  isLoading: boolean;
}

/**
 * The webhook that fetches the departments from the backend.
 * 
 * @returns {typeDepartments} Returns the array of Departments objects, errors and a boolean: isLoading.
 */
const useDepartment = (departmentQuery?: DepartmentQuery): typeDepartments => {
  const [departments, setDepartment] = useState<Departments[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const requestConfig: AxiosRequestConfig = departmentQuery?.searchText ? {} : {
      params: {
        search: departmentQuery?.searchText
      },
    };

    const controller = new AbortController();
    setLoading(true);

    axios.get('/api/departments', { signal: controller.signal, ...requestConfig })
      .then(response => {
        setDepartment(response.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [departmentQuery]);

  return { departments, error, isLoading }
}

export default useDepartment;
