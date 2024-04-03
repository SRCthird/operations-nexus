import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Nexus_Department, DepartmentQuery } from './types';

export const useDepartments = ({ department, searchText }: DepartmentQuery) => {
  const [departments, setDepartment] = useState<Nexus_Department[]>([]);
  const [error, setError] = useState('');
  const [departmentLoading, setLoading] = useState(false);

  useEffect(() => {
    let url: string;
    if (department) {
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
