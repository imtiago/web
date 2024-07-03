import { ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface IPageProps extends BoxProps {
  children: ReactNode;
  title?: string;
}

const Page = ({ title, children }: IPageProps) => (
  <Box className="h-full overflow-y-auto">
    <header>
      <title>{`Web ${title ? ' - ' + title : ''}`}</title>
    </header>
    {children}
  </Box>
);

export default Page;
