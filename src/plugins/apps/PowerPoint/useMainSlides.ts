import api from "@src/utils/api";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useMainSlides = () => {
  const [mainSlides, setMainSlides] = useState<string[]>([]);
  const [slideError, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    api.get('/static/All', { signal: controller.signal })
      .then(response => {
        setMainSlides(response.data);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);

  return { mainSlides, slideError }
}

export default useMainSlides;
