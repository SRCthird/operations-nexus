import axios, { CanceledError } from "axios";
import { useEffect, useState, useRef } from "react";
import { Apps } from "@apps";

interface Props {
  app?: Apps;
  ids?: number[];
}

export const useApps = ({ app, ids }: Props) => {
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
