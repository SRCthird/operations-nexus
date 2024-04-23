import api from '@src/utils/api';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react'

/**
 * The return type of the useDelay webhook.
 * 
 * @param {number} delay - The number of milliseconds to delay.
 * @param {string} delayError - The error message if the delay cannot be retrieved.
 */
type typeDelay = {
  delay: number;
  delayError: string;
}

/**
 * Retrieve the set delay in milliseconds for slides.
 * 
 * @returns {typeDelay} The set delay in milliseconds as number and any errors as string.
 */
const useDelay = (): typeDelay => {
    const [delay, setDelay] = useState(30000); // Default delay is 30 seconds if error
    const [delayError, setError] = useState('');

    useEffect(() => {
      const controller = new AbortController();
      api.get('/delay')
        .then(response => {
          setDelay(response.data);
        })
        .catch(err => {
          if (err instanceof CanceledError) return;
          setError(err.message);
      });
      return () => controller.abort();
    }, []);
    
    return { delay, delayError };
}

export default useDelay;
