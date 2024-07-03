import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import systemRoutes from '../utils/systemRoutes';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { itemNav } from './NavConfig';

interface INavSectionProps {
  navConfig: itemNav[];
}

export default function NavSection({ navConfig }: INavSectionProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const newNavConfig = navConfig.filter((item) => {
    return item;
  });

  const onLogout = useCallback(async () => {
    await signOut();
    navigate(systemRoutes.signIn.path);
  }, []);

  return (
    <Box>
      <Menu strategy="absolute" isOpen={true}>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
              {isOpen ? 'Close' : 'Open'}
            </MenuButton>
            <MenuList>
              {newNavConfig.map((item) => {
                return (
                  <MenuItem key={item.title} onClick={() => navigate(item.path)}>
                    {item.title}
                  </MenuItem>
                );
              })}
              <MenuItem onClick={() => onLogout()}>Sair</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
}
