import { Route, Routes } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import systemRoutes, { prefix } from '../utils/systemRoutes';
import Layout from '../layouts/layout';
import Profile from '../pages/Profile';
import Movies from '../pages/Movies';
import PrivateRoute from './privateRoute';
import Rents from '../pages/Rents';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={systemRoutes.signIn.path} element={<SignIn />} />

      <Route element={<PrivateRoute />}>
        <Route path={prefix} element={<Layout />}>
          <Route path={systemRoutes.profile.path} element={<Profile />} />
          <Route path={systemRoutes.movie.path} element={<Movies title={systemRoutes.movie.title} />} />
          <Route path={systemRoutes.rent.path} element={<Rents title={systemRoutes.rent.title} />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
