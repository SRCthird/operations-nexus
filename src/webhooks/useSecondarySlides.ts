import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Slides } from './useMainSlides';

/**
 * Properties of the Secondary Slides webhook.
 * 
 * @param {string} location - The name of the directory of slide in the backend.
 */
interface Props {
    location?: string
}

/**
 * The type returned from the webhook.
 * 
 * @param {Slides[]} secondarySlides - The list of slides in the secondary folder.
 * @param {string} slideError - The error message if the secondary folder cannot be retrieved.
 */
type typeSecondarySlides = {
    secondarySlides: Slides[];
    secondarySlideError: string;
}

/**
 * This webhook is used to retieve the list of secondary slides from the backend.
 * 
 * @param {interface} Props - The properties of the Secondary Slides webhook.
 * @returns {typeSecondarySlides} - The object returned from the webhook.
 */
const useSecondarySlides = ({location}:Props): typeSecondarySlides => {
    const [secondarySlides, setSecondarySlides] = useState<Slides[]>([]);
    const [secondarySlideError, setError] = useState('');

    useEffect(() => {
      const controller = new AbortController();
      axios.get(`/static/${location}`, { signal: controller.signal })
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
