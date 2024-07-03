import { Avatar, Box, Text } from '@chakra-ui/react';
import Page from '../components/Page';
import { useAuth } from '../context/AuthContext';

interface IProfileProps {
  title?: string;
}
const Profile = ({ title }: IProfileProps) => {
  const { user } = useAuth();
  return (
    <Page title={title}>
      <Box className="flex w-min items-center gap-2 divide-x rounded-lg border-2 p-6">
        <Avatar size="2xl" bg="#1e1b4b" color={'white'} name={user?.fullName} src={user?.avatarUrl || user?.fullName} />
        <Box className="p-4">
          <Text className="font-bold">{user?.fullName}</Text>
          <Text>{user?.email}</Text>
        </Box>
      </Box>
    </Page>
  );
};

export default Profile;
