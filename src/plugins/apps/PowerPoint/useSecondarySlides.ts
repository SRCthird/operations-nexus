import api from "@src/utils/api";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface Props {
  location?: string
}

const useSecondarySlides = ({ location }: Props) => {
  const [secondarySlides, setSecondarySlides] = useState<string[]>([]);
  const [secondarySlideError, setError] = useState('');

  useEffect(() => {
    if (location === "") return;
    const controller = new AbortController();
    api.get(`/static/${location}`, { signal: controller.signal })
      .then(response => {
        setSecondarySlides(response.data);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, [location]);

  return { secondarySlides, secondarySlideError }
}

export default useSecondarySlides;
