import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Nexus_Display } from '@core/Display';

/**
 * The query object used to specify displays from the backend.
 * 
 * @param {String?} department - The selected department.
 * @param {string?} searchText - The search text entered by the user in SearchInput.tsx.
 */
export interface DisplayQuery {
  id?: number;
  department?: string;
  searchText?: string;
}

/**
 * The webhook that fetches the displays from the backend.
 * 
 * @param {DisplayQuery} displayQuery - The query parameters sent to the backend.
 */
export const useDisplays = ({ id, department, searchText }: DisplayQuery) => {
  const [displays, setDisplay] = useState<Nexus_Display[]>([]);
  const [error, setError] = useState('');
  const [displayLoading, setLoading] = useState(false);

  useEffect(() => {
    const requestConfig: AxiosRequestConfig = department === "All" ? {} : {
      params: {
        departments: department,
        search: searchText
      },
    };

    const controller = new AbortController();
    setLoading(true);

    if (id !== undefined) {
      axios.get(`/api/display/${id}`, { signal: controller.signal })
        .then(response => {
          setDisplay([response.data]);
          setLoading(false);
        })
        .catch(err => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    } else {
      axios.get('/api/display', { signal: controller.signal, ...requestConfig })
      .then(response => {
        setDisplay(response.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

      return () => controller.abort();
    }
  }, [department, searchText, id]);

  if (typeof displays !== "object") {
    setDisplay([] as Nexus_Display[]);
  };

  return { displays, error, displayLoading };
}
