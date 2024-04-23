import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CanceledError } from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import NotFound from '@pages/NotFound';
import Admin from '@pages/Admin';
import Home from '@pages/Home';
import { useDisplays } from '@core/Display';
import { useDepartments }  from '@core/Department';
import useAccount from '@hooks/useAccount';
import useAdmin from '@hooks/useAdmin';
import BuildTemplate from '@templates';
import api from './utils/api';

interface Props {
  token: string;
}

/**
 * Pages routes the application into multiple pages and handles logging and tokens.
 * 
 * @returns {JSX.Element} - Returns the page specified by the path.
 */
const Pages = ({ token }: Props): JSX.Element => {
  const { displays } = useDisplays({});
  const { departments } = useDepartments({});
  const [versions, setVersions] = useState<Map<string, number>>(new Map());
  const user = useAccount();
  const admin = useAdmin({ email: user.username });

  // Use effect to remount slideshows if there is an update
  useEffect(() => {
    const getKey = async (department: string): Promise<number> => {
      let version: number = 0;
      try {
        const response = await api.get(`/departments/${department}`);
        version = response.data.PPTXVersion;
      } catch (err: any) {
        if (err instanceof CanceledError) return 0;
        console.error(err.message);
      }
      return version;
    };

    const fetchKeys = setInterval(async () => {
      const keys: [string, number][] = await Promise.all(
        departments.map(async (department) => {
          const version = await getKey(department.department);
          return [department.department, version];
        })
      );
      setVersions(new Map(keys));
    }, 5 * 60 * 1000); // Update keys every 5 minutes

    return function cleanup() {
      clearInterval(fetchKeys);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {displays.map((display) => (
          <Route
            key={display.id}
            path={`/${display.display}`}
            element={
              <BuildTemplate
                key={display.id}
                slideShowKey={
                  (versions.get(display.department) || 0) +
                  (versions.get("All") || 0)
                }
                token={token}
                display={display}
              />
            }
          />
        ))}
        {(!admin.isLoading && admin.result) &&
          <Route
            path="/admin"
            element={<Admin title="Test" />}
          />
        }
        {!admin.isLoading &&
          < Route path="/*" element={<NotFound />} />
        }
      </Routes>
    </Router>
  );
}

export default Pages
