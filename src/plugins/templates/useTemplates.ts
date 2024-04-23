import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api from "@src/utils/api";
import { Template } from "./types";
import { emptyTemplate } from "./empty";

type Props = {
  id?: number;
}

export const useTemplates = ({ id }: Props) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [template, setTemplate] = useState<Template>(emptyTemplate);
  const [pageError, setError] = useState('');
  const [isPageLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id === 0) return;
    const controller = new AbortController();

    const endpoint = id ? `/template/${id}` : '/template';
    setLoading(true);
    api.get(endpoint, { signal: controller.signal })
      .then(response => {
        if (id) {
          setTemplate(response.data);
        } else {
          setTemplates(response.data);
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
    // eslint-disable-next-line
  }, []);

  return { template, templates, pageError, isPageLoading };
}
