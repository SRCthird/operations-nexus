import api from "@src/utils/api";
import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { emptyDepartment } from "./empty";
import { Nexus_Department, DepartmentQuery } from './types';

export const useDepartments = ({ department: _department, searchText }: DepartmentQuery) => {
  const [department, setDepartment] = useState<Nexus_Department>(emptyDepartment);
  const [departments, setDepartments] = useState<Nexus_Department[]>([emptyDepartment]);
  const [error, setError] = useState('');
  const [departmentLoading, setLoading] = useState(false);

  useEffect(() => {
    if (_department === "0" || _department === "") return;
    const endpoint = _department ? `/departments/${_department}` : '/departments';

    const requestConfig: AxiosRequestConfig =  {
      params: {
        search: searchText
      },
    };
    const controller = new AbortController();
    setLoading(true);
    api.get(endpoint, { signal: controller.signal, ...requestConfig })
      .then(response => {
        if (_department) {
          setDepartment(response.data);
        } else {
          setDepartments(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [searchText, _department]);

  return { department, departments, error, departmentLoading }
}
