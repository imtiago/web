import {
  Avatar,
  Box,
  Fade,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { LogOut } from 'lucide-react';
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getItemNav } from './NavConfig';
import ButtonItem from './ButtonItem';
import systemRoutes from '../utils/systemRoutes';

interface ITopBarProps {
  onToggleSidebar: () => void;
  stateSlideBar: boolean;
}
const TopBar = ({ stateSlideBar, onToggleSidebar }: ITopBarProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const itemSelected = getItemNav(location.pathname);
  const navigate = useNavigate();

  const onLogout = useCallback(async () => {
    await signOut();
    navigate(systemRoutes.signIn.path);
  }, []);

  return (
    <Box className=" flex items-center justify-between p-3">
      <Box className="flex items-center gap-2">
        {stateSlideBar && (
          <Fade in={stateSlideBar} unmountOnExit>
            <Box
              onClick={() => onToggleSidebar()}
              className="flex size-12 cursor-pointer items-center  justify-center rounded-full bg-cyan-100"
            >
              {itemSelected?.icon}
            </Box>
          </Fade>
        )}

        <Text className="font-bold uppercase">{itemSelected?.title}</Text>
      </Box>
      <Box></Box>
      <Popover>
        <PopoverTrigger>
          <Box role="button" aria-label="Some box" className="rounded-full">
            <Avatar bg="#1e1b4b" color={'white'} name={user?.fullName} src="#" />
          </Box>
        </PopoverTrigger>
        <PopoverContent bg="#1e1b4b" color="white">
          <PopoverHeader fontWeight="semibold">{user?.fullName}</PopoverHeader>
          <PopoverArrow bg="white" />
          <PopoverCloseButton />
          <PopoverBody>
            <UnorderedList>
              <ButtonItem color={'white'} label="Sair" onClick={() => onLogout()} icon={<LogOut />} />
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default TopBar;
