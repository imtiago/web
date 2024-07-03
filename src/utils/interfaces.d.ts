export interface IRent {
  id: string;
  initialDate: Date;
  endDate: Date;
  qnt: number;
  status: string;
  movie: IMovie;
}

export interface IMovie {
  id: string;
  description: string;
  title: string;
  available: number;
  renteds: number;
  numberOfCopies: number;
  category: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  active: boolean;
}

export interface IProfile extends IUser {}
