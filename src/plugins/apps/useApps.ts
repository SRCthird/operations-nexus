import api from "@src/utils/api";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { emptyApp } from "./empty";
import { App, Apps } from "./types";

interface Props {
  id?: number;
  name?: string;
  type?: Apps;
}

export const useApps = ({ id, name, type }: Props) => {
  const [apps, setApps] = useState<App[]>([emptyApp]);
  const [app, setApp] = useState<App>(emptyApp);
  const [appError, setError] = useState('');
  const [isAppLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id === 0) return;
    if (name === "") return;
    const controller = new AbortController();
    setLoading(true);
    const endpoint = id ? `/app/${id}`
      : name ? `/app/name/${encodeURIComponent(name)}`
        : type ? `/app/type/${type}`
          : "/app/";
    api.get(endpoint, { signal: controller.signal })
      .then(response => {
        if (id || name) {
          setApp(response.data);
        } else {
          setApps(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [name]);

  return { app, apps, appError, isAppLoading };
}
