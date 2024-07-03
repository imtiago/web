import axios, { AxiosResponse } from 'axios';
import { IMovie, IProfile, IRent, IUser } from '../utils/interfaces';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((data) => {
  return data;
});

const authenticate = async <T>(path: string, identifier: string, password: string) => {
  const token = btoa(`${identifier}:${password}`);
  api.defaults.headers.common['Authorization'] = `basic ${token}`;
  let responseRequest: AxiosResponse = await api.get<T>(path);
  return responseRequest;
};
const fetchData = async <T>(path: string, method: 'get' | 'post' | 'delete', body?: any): Promise<AxiosResponse> => {
  let responseRequest: AxiosResponse;
  try {
    switch (method) {
      case 'get':
        responseRequest = await api.get<T>(path);
        break;
      case 'delete':
        responseRequest = await api.delete<T>(path);
        break;
      case 'post':
        responseRequest = await api.post<T>(path, body);
        break;
    }
    return responseRequest;
  } catch (error) {
    // console.log(error);
    return Promise.reject(error);

    // return new AxiosError(error);
    // @ts-ignore
    // return [] as T;
  }
};

export const endPoints = {
  authentication: {
    authenticate: (identifier: string, password: string) =>
      authenticate<IUser>('/authentication/authenticate', identifier, password),
    logout: () => fetchData<any>('/authentication/logout', 'get'),
  },
  profile: {
    my: () => fetchData<IProfile>('/users/myAccount', 'get'),
  },
  movie: {
    list: () => fetchData<IMovie[]>('/movies', 'get'),
  },
  rent: {
    create: (data: any) => fetchData<IRent>('/renteds', 'post', data),
    list: () => fetchData<IRent[]>('/renteds', 'get'),
  },
};

export default api;
