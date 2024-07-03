export interface ISystemRoute {
  title: string;
  path: string;
}

export const prefix = '';
const systemRoutes = {
  profile: {
    title: 'Meu Perfil',
    path: prefix + '/profile',
  },
  movie: {
    title: 'Filmes',
    path: prefix + '/movies',
  },
  rent: {
    title: 'Aluguéis',
    path: prefix + '/renteds',
  },
  signIn: {
    title: 'login',
    path: '/signIn',
  },
  notFound: {
    title: 'Not found',
    path: prefix + '/404',
  },
};
export default systemRoutes;
