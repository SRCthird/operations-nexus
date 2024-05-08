import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import api from "@src/utils/api";

export const useSlideshow = (department: string) => {
  const [powerPoints, setPowerPoints] = useState<string[]>([]);
  const [pptxError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    api.get(`/powerpoint/${department}`, { signal: controller.signal })
      .then(response => {
        setPowerPoints(response.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [department]);

  return { powerPoints, pptxError, isLoading };
}
