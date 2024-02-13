import { useLocation, Navigate } from 'react-router-dom';

const RedirectLogin = () => {
  const location = useLocation();

  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default RedirectLogin;

