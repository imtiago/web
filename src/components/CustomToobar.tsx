import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IToolbar {
  children: ReactNode;
  numSelected?: number;
}

export function CustomToolbar({ children }: IToolbar) {
  return <Box className="flex justify-between">{children}</Box>;
}
