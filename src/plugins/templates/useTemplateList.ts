import api from "@src/utils/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useTemplateList = () => {
  const [templates, setTemplates] = useState<{ title: string }[]>([]);
  const [templateError, setError] = useState('');
  const [isTemplateLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    api.get("/template/list", { signal: controller.signal })
      .then(response => {
        setTemplates(response.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { templates, templateError, isTemplateLoading };
}
