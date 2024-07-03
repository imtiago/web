import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import systemRoutes from '../utils/systemRoutes';

const PrivateRoute = () => {
  const { isLogeed } = useAuth();
  return isLogeed ? <Outlet /> : <Navigate to={systemRoutes.signIn.path} />;
};

export default PrivateRoute;
