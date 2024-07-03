import { Avatar, Box, Text } from '@chakra-ui/react';
import { IUser } from '../utils/interfaces';

interface IProfileCardProps {
  user: IUser;
}
const ProfileCard = ({ user }: IProfileCardProps) => {
  return (
    <Box className="flex items-center gap-2 divide-x rounded-md border p-2">
      <Avatar size="md" bg="#1e1b4b" color={'white'} name={user?.fullName} src={user?.fullName} />{' '}
      <Box className="p-4">
        <Text>{user?.fullName}</Text>
      </Box>
    </Box>
  );
};

export default ProfileCard;
