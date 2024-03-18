import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

/**
 * The pages available for selection in the admin menu.
 */
export enum Pages {
  ThreeOnTwo = 'ThreeOnTwo',
  FullDisplay = 'FullDisplay'
}

interface Props {
  page?: Pages;
  ids?: number[];
}
const usePages = ({ page, ids }: Props) => {
  const [pages, setPages] = useState<any[]>([]);
  const [pageError, setError] = useState('');
  const [isPageLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const idArray = ids ? ids : [];
    axios.get(`/api/page/${page}/?id=${idArray.join(",")}`, { signal: controller.signal })
      .then(response => {
        if (JSON.stringify(pages) !== JSON.stringify(response.data)) {
          setPages(response.data);
        }
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 404) {
          setError(err.message);
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
    return () => controller.abort();
  }, [ids, page, pages]);

  return { pages, pageError, isPageLoading };
}

export default usePages;
