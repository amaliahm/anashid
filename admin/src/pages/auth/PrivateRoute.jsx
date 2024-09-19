import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.account_type !== 'admin') {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default PrivateRoute;
