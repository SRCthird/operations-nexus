import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import useAccount from "@hooks/useAccount";
import { ActionTrackerApiUrl } from "@src/Config";
import { Box, Spinner } from "@chakra-ui/react";
import axios, { CanceledError } from "axios";

interface Props {
  department: string;
  departmentField: string;
  area?: string;
  areaField?: string;
}

const ActionTracker = ({ department, departmentField, area, areaField }: Props) => {
  const user = useAccount();
  const { instance } = useMsal();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const response = async () => {
      try {
        const request = {
          scopes: ['https://graph.microsoft.com/Sites.Read.All'],
          account: user
        };
        const result = await instance.acquireTokenSilent(request);
        setAccessToken(result.accessToken);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };
    response();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    let url = `${ActionTrackerApiUrl}?$filter=${departmentField} eq ${department}`; 
    if (area) url += ` and ${areaField} eq ${area}`;

    setLoading(true);
    const controller = new AbortController();
    axios.get(
      url,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controller.signal
      }
    )
      .then(result => {
        setData(result.data.value);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [accessToken]);

  return (
    <Box>
      {loading && <Spinner />}
      {data.map((item: any) => {
        return (
          <Box key={item.id}>
            <h3>{item.fields.Title}</h3>
            <p>{item.fields.Body}</p>
          </Box>
        );
      })}
      {error && <p color={'red'}>Error: {error}</p>}
    </Box>
  );
};

export default ActionTracker;
