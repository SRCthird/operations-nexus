import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Pages } from "./usePages";

/**
 * The query object used to specify displays from the backend.
 * 
 * @param {String?} department - The selected department.
 * @param {string?} searchText - The search text entered by the user in SearchInput.tsx.
 */
export interface DisplayQuery {
  //department: Departments | null;
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
 * The object returned by displays from the webhook.
 * 
 * @param {Displays} displays - The array of the Display objects
 * @param {string} error - The error message recieved from the backend.
 * @param {boolean} isLoading - Whether or not the data is currently being fetched.
 */
type typeDisplays = {
  displays: Displays[];
  error: string;
  isLoading: boolean;
}

/**
 * The webhook that fetches the displays from the backend.
 * 
 * @param {DisplayQuery} displayQuery - The query parameters sent to the backend.
 * @returns {typeDisplays}
 */
const useDisplay = ({ department, searchText }: DisplayQuery): typeDisplays => {
  const [displays, setDisplay] = useState<Displays[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const requestConfig: AxiosRequestConfig = department === "All" ? {} : {
      params: {
        departments: department,
        search: searchText
      },
    };

    const controller = new AbortController();
    setLoading(true);

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
  }, [department, searchText]);

  return { displays, error, isLoading };
}

export default useDisplay;
