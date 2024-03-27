import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Slides } from './types';

/**
 * The type returned from the webhook.
 * 
 * @param {Slides[]} mainSlides - The list of slides in the main folder.
 * @param {string} slideError - The error message if the main folder cannot be retrieved.
 */
type typeMainSlides = {
  mainSlides: Slides[];
  slideError: string;
}

/**
 * This webhook is used to retieve the list of main slides from the backend.
 * 
 * @returns {typeMainSlides} - This webhook returns the array of slides from static/main 
 */
const useMainSlides = (): typeMainSlides => {
  const [mainSlides, setMainSlides] = useState<Slides[]>([]);
  const [slideError, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    axios.get('/api/static/All', { signal: controller.signal })
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
