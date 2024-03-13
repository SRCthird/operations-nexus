import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useSlideshow = (department: string) => {
  const [powerPoints, setPowerPoints] = useState<string[]>([]);
  const [pptxError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    axios.get(`/api/powerpoint/${department}`, { signal: controller.signal })
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

export default useSlideshow;
