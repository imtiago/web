import systemRoutes, { ISystemRoute } from '../utils/systemRoutes';
import { FileVideo, User, Video } from 'lucide-react';

export interface itemNav extends ISystemRoute {
  icon: string | JSX.Element;
}

export const getItemNav = (path: string) => navConfig.find((item) => item.path === path);

const navConfig: itemNav[] = [
  {
    icon: <User />,
    ...systemRoutes.profile,
  },
  {
    icon: <Video />,
    ...systemRoutes.movie,
  },
  {
    icon: <FileVideo />,
    ...systemRoutes.rent,
  },
];

export default navConfig;
