import { IUser } from "../types/user";

interface IFetchUser {
  type: 'FETCH_USER',
  user: IUser,
}

interface ISignOutUser {
  type: 'SIGNOUT_USER',
}

type IAction = IFetchUser | ISignOutUser;

const inisitalState: IUser = {username: '', email: ''};

export default (state = inisitalState, action: IAction)  => {
  switch(action.type) {
    case 'FETCH_USER':
      return {...action.user}
    case 'SIGNOUT_USER':
      return {
        username: '',
        email: '',
      }
    default:
      return state;
  }
}