import { useNavigate } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import Page from '../components/Page';
import LoginForm, { TDataLogin } from '../components/forms/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import systemRoutes from '../utils/systemRoutes';
import { Box } from '@chakra-ui/react';

export default function SignIn() {
  const { isLogeed, signIn } = useAuth();
  const navigate = useNavigate();
  const onHandleSignIn = async (data: TDataLogin) => {
    const { identifier, password } = data;
    await signIn({ identifier, password });
  };

  useEffect(() => {
    if (isLogeed) navigate(systemRoutes.profile.path, { replace: true });
  }, [isLogeed]);

  return (
    <Page title="Login">
      <Box className="flex h-screen items-center justify-center bg-[url('src/assets/img/work.jpeg')]">
        <Box className="flex h-4/6 w-3/12 flex-col gap-5 rounded-md bg-slate-400 bg-opacity-70 p-20 text-white">
          <Box className="mb-8 w-2/5 self-center">
            <Avatar size={''} bg="#1e1b4b" />
          </Box>
          <LoginForm onSubmit={onHandleSignIn} />
        </Box>
      </Box>
    </Page>
  );
}
