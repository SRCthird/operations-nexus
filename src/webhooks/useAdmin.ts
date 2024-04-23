import api from '@src/utils/api';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react'

const useAdmin = ({ email }: { email: string }) => {
  const [result, setResult] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    api.get('/admin/validate', { headers: { email: email } })
      .then(response => {
        setResult(response.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [email]);

  return { result, error, isLoading};
}

export default useAdmin;
