import axios, { CanceledError } from 'axios';
import { useEffect, useState } from 'react'

/**
 * Retrieve the set delay in milliseconds for slides.
 * 
 * @returns {object} The set delay in milliseconds as number and any errors as string.
 */
const useDelay = (): object => {
    const [delay, setDelay] = useState(30000); // Default delay is 30 seconds if error
    const [delayError, setError] = useState('');

    useEffect(() => {
      const controller = new AbortController();
      axios.get('/api/delay')
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
