import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

export interface PowerPointApp {
    ID: number;
    Type: string;
    PowerBI_ID: string;
    Group_ID: string;
    Custom_Embed?: string;
    Page_Name?: string;
}

const usePowerPoints = (ids?: number[]) => {
  const [pptApps, setApps] = useState<any[]>([]);
  const [pptError, setError] = useState('');
  const [isPptLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    axios.get(`/api/app/power-bi/?id=${ids?.join(",") ?? ""}`, { signal: controller.signal })
      .then(response => {
        setApps(response.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [ids]);

  return { pptApps, pptError, isPptLoading };
}

export default usePowerPoints;
