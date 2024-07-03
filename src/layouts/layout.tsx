import { Box, Divider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import navConfig from '../components/NavConfig';
import { useState } from 'react';
import TopBar from '../components/TopBar';

export default function Layout() {
  const [openSlide, setOpenSlide] = useState(true);
  const toggleSlide = () => {
    setOpenSlide(!openSlide);
  };
  return (
    <Box className="flex h-screen ">
      <Box>
        <Sidebar navConfig={navConfig} isOpenSidebar={openSlide} onToggleSidebar={toggleSlide} />
      </Box>
      <Box className="flex flex-1 flex-col gap-2">
        <TopBar stateSlideBar={!openSlide} onToggleSidebar={toggleSlide} />
        <Divider variant="dashed" />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
