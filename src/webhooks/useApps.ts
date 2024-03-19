import axios, { CanceledError } from "axios";
import { useEffect, useState, useRef } from "react";

export interface PowerBIApp {
  ID: number;
  Type: string;
  PowerBI_ID: string;
  Group_ID: string;
  Custom_Embed?: string;
  Page_Name?: string;
}

export interface PowerPointApp {
  ID: number;
  Main: boolean;
  Department: string;
}

export enum Apps {
  PowerBI = 'PowerBI',
  PowerPoint = 'PowerPoint'
}

interface Props {
  app?: Apps;
  ids?: number[];
}

const useApps = ({ app, ids }: Props) => {
  const [apps, setApps] = useState<any[]>([]);
  const [appError, setError] = useState('');
  const [isAppLoading, setLoading] = useState(false);
  const prevAppsRef = useRef<any[]>();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios.get(`/api/app/${app}/?id=${ids?.join(",") ?? ""}`, { signal: controller.signal })
      .then(response => {
        if (JSON.stringify(prevAppsRef.current) !== JSON.stringify(response.data)) {
          setApps(response.data);
          prevAppsRef.current = response.data;
        }
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [app]);

  return { apps, appError, isAppLoading };
}

export default useApps;
