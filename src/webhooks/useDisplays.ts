import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { DisplayQuery } from "../pages/Home";

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
}

/**
 * The object returned by displays from the webhook.
 * 
 * @param {Displays} displays - The array of the Display objects
 * @param {string} error - The error message recieved from the backend.
 * @param {boolean} isLoading - Whether or not the data is currently being fetched.
 */
type useDisplays = {
  displays: Displays[];
  error: string;
  isLoading: boolean;
}

/**
 * The webhook that fetches the displays from the backend.
 * 
 * @param {DisplayQuery} displayQuery - The query parameters sent to the backend.
 * @returns {useDisplays}
 */
const useDisplay = (displayQuery: DisplayQuery): useDisplays => {
  const [displays, setDisplay] = useState<Displays[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const requestConfig: AxiosRequestConfig = displayQuery.department?.Department === "All" ? {} : {
    params: { 
      departments: displayQuery.department?.Department,
      search: displayQuery.searchText
    },
  };

  const dependencies: any[] = [displayQuery];

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    console.log("Request config:", requestConfig);
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
  }, dependencies ? [...dependencies] : []);

  return { displays, error, isLoading };
}

export default useDisplay;
