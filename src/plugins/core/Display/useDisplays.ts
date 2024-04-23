import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { emptyDisplay, Nexus_Display } from '@core/Display';
import api from "@src/utils/api";

export interface DisplayQuery {
  id?: number;
  department?: string;
  searchText?: string;
}

export const useDisplays = ({ id, department, searchText }: DisplayQuery) => {
  const [displays, setDisplays] = useState<Nexus_Display[]>([emptyDisplay]);
  const [display, setDisplay] = useState<Nexus_Display>(emptyDisplay);
  const [error, setError] = useState('');
  const [displayLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id === 0) return;

    const endpoint = id !== undefined ? `/display/${id}` : '/display';

    const requestConfig: AxiosRequestConfig = department === "All" ? {} : {
      params: {
        departments: department,
        search: searchText
      },
    };

    const controller = new AbortController();
    setLoading(true);

    api.get(endpoint, { signal: controller.signal, ...requestConfig })
      .then(response => {
        if (id) {
          setDisplay(response.data);
        } else {
          setDisplays(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();

  }, [department, searchText, id]);

  return { display, displays, error, displayLoading };
}
