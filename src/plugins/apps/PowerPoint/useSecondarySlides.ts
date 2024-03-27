import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Slides } from './types';

/**
 * Properties of the Secondary Slides webhook.
 * 
 * @param {string} location - The name of the directory of slide in the backend.
 */
interface Props {
  location?: string
}

const useSecondarySlides = ({ location }: Props) => {
  const [secondarySlides, setSecondarySlides] = useState<Slides[]>([]);
  const [secondarySlideError, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    axios.get(`/api/static/${location}`, { signal: controller.signal })
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
