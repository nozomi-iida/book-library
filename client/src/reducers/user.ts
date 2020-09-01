import { IUser } from "../types/user";

interface IFetchUser {
  type: 'FETCH_USER',
  user: IUser,
}

type IAction = IFetchUser;

const inisitalState: IUser = {username: '', email: ''};

export default (state = inisitalState, action: IAction)  => {
  switch(action.type) {
    case 'FETCH_USER':
      return {...action.user}
    default:
      return state;
  }
}