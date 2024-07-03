import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import api, { endPoints } from '../services/api';
import { IProfile } from '../utils/interfaces';
import { TDataLogin } from '../components/forms/LoginForm';
import { alertError } from '../components/Toast';

interface AuthContextState {
  isLogeed: boolean;
  signIn({ identifier, password }: TDataLogin): Promise<void>;
  signOut(): Promise<void>;
  getUser(): Promise<void>;
  user: any;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IProfile | null>();
  const [isLogeed, setIsLogeed] = useState(() => {
    const accessToken = localStorage.getItem('@Application:accessToken');
    return accessToken ? true : false;
  });

  const getUser = useCallback(async () => {
    const responseRequest = await endPoints.profile.my();
    setUser(responseRequest.data);
  }, []);

  const signIn = useCallback(async ({ identifier, password }: TDataLogin) => {
    try {
      const { status } = await endPoints.authentication.authenticate(identifier, password);
      switch (status) {
        case 200:
          localStorage.setItem('@Application:accessToken', 'logado');
          setIsLogeed(true);
          break;

        default:
          alertError({ message: 'Email ou senha incorreta!' });
          break;
      }
    } catch ({ response }: any) {
      alertError({ message: 'Email ou senha incorreta!', isToast: false });
    }
  }, []);

  const signOut = useCallback(async () => {
    const { status } = await endPoints.authentication.logout();
    switch (status) {
      case 200:
        localStorage.removeItem('@Application:accessToken');
        setIsLogeed(false);
        break;

      default:
        // alertError('Contate o Administrador', 'Error Inesperado!');
        break;
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('@Application:accessToken');
    accessToken
      ? (api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`)
      : delete api.defaults.headers.common['Authorization'];
    isLogeed ? getUser() : setUser(null);
  }, [isLogeed]);

  return <AuthContext.Provider value={{ isLogeed, signIn, user, signOut, getUser }}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
