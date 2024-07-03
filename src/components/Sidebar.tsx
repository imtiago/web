import { useCallback } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Divider, Slide } from '@chakra-ui/react';
import { itemNav } from './NavConfig';
import { useAuth } from '../context/AuthContext';
import ButtonItem from './ButtonItem';
import { ArrowLeft, LogOut } from 'lucide-react';
import ProfileCard from './ProfileCard';

interface ISidebarProps {
  isOpenSidebar: boolean;
  onToggleSidebar: () => void;
  navConfig: itemNav[];
}

export default function Sidebar({ isOpenSidebar, onToggleSidebar, navConfig }: ISidebarProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const style = isOpenSidebar ? '' : 'hidden';

  const match = (path: string) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  const onLogout = useCallback(async () => {
    await signOut();
  }, []);

  const newNavConfig = navConfig.filter((item) => {
    return item;
  });

  return (
    <Slide direction="left" in={isOpenSidebar} style={{ position: 'relative' }} unmountOnExit>
      <Box className={` relative mr-5 flex flex-col gap-2 border-r py-2 pl-4 pr-8 ${style} `}>
        <Box
          className="absolute right-0 z-10 flex h-12 translate-x-1/2 translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border p-0.5"
          role="button"
          onClick={() => onToggleSidebar()}
        >
          <Box className=" absolute z-20 h-14 w-5 -translate-x-1/2 bg-white" />
          <Box className=" absolute z-20 h-[46px] w-2 -translate-x-1/3 bg-white" />
          <ArrowLeft size={28} color="black" className="z-30" />
        </Box>

        <ProfileCard user={user} />
        <Divider variant="dashed" />
        <Box className={`flex flex-col gap-1 `}>
          {newNavConfig.map((item) => {
            const isActive = match(item.path);
            return (
              <ButtonItem
                label={item.title}
                key={item.title}
                isActive={isActive}
                // @ts-ignore
                icon={item.icon}
                onClick={() => navigate(item.path)}
              />
            );
          })}
          <ButtonItem label="Sair" onClick={() => onLogout()} icon={<LogOut />} />
        </Box>
      </Box>
    </Slide>
  );
}
