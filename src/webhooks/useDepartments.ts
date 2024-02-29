import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";

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
const useDepartment = (searchText?: string): typeDepartments => {
  const [departments, setDepartment] = useState<Departments[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const requestConfig: AxiosRequestConfig = searchText ? {} : {
      params: {
        search: searchText
      },
    };

    const controller = new AbortController();
    setLoading(true);
    let url: string;
    searchText ?
      url = `/api/departments/?search=${searchText}`:
      url = '/api/departments';
    axios.get(url, { signal: controller.signal })
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
  }, [searchText]);

  return { departments, error, isLoading }
}

export default useDepartment;
