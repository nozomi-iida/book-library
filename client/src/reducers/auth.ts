interface IRetrieveToken {
  type: 'RETRIEVE_TOKEN';
  token: string;
}

interface ISignIn {
  type: 'SIGNIN';
  id: string;
  token: string;
}

interface ISignOut {
  type: 'SIGNOUT';
}

interface IRegister {
  type: 'REGISTER';
  token: string;
}

interface IFetchUser {
  type: 'FETCH_USER';
  data: any
}

type IAction = IRetrieveToken | ISignIn | ISignOut | IRegister | IFetchUser;

const initialLoginState = {
  isLoading: true,
  email: '',
  username: '',
  userToken: '',
}

export default (prevState=initialLoginState, action: IAction) => {
  switch(action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      }
    case 'SIGNIN':
      return {
        ...prevState,
        email: action.id,
        userToken: action.token,
        isLoading: false,
      } 
    case 'SIGNOUT':
      return {
        ...prevState,
        userToken: '',
        email: '',
        image: '',
        username: '',
        isLoading: false,
      } 
    case 'REGISTER':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      } 
    case 'FETCH_USER':
      return {
        ...prevState,
        email: action.data.email,
        image: action.data.image,
        username: action.data.username,
        isLoading: false,
      }
  }
}