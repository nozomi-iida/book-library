import { Dispatch } from "redux";
import axios from "axios";

export const fetchUser = (token: any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('http://192.168.0.22:8000/user/', {headers: { Authorization: 'Bearer ' + token }})
    axios
      .get('http://192.168.0.22:8000/user/', {
      // .get('http://localhost:8000/user/', {
        headers: { Authorization: 'Bearer ' + token },
      });
      dispatch({type: 'FETCH_USER', user: data});
  } catch (error) {
    console.log(error);
  }
}