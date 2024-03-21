import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Pages } from "@hooks/usePages";

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
 * Represents the Display object that will be returned to the client.
 * @param {number} ID - The ID of the display.
 * @param {string} Main - Main branch of the department.
 * @param {string} Sub - Department name of the display.
 * @param {string} Department - Child department of the display.
 * @param {string} Display - Name of the display.
 * @param {string} Background - Background Image of the display. (link to image)
 */
export interface Displays {
  ID: number;
  Main: string;
  Sub: string;
  Department: string;
  Display: string;
  Background: string;
  Page?: Pages;
  Page_ID?: number;
}

/**
 * The webhook that fetches the displays from the backend.
 * 
 * @param {DisplayQuery} displayQuery - The query parameters sent to the backend.
 */
const useDisplays = ({ id, department, searchText }: DisplayQuery) => {
  const [displays, setDisplay] = useState<Displays[]>([]);
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

    if (id) {
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
    setDisplay([]);
  };

  return { displays, error, displayLoading };
}

export default useDisplays
