import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/UserModel";
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrore,
  SetIsLoading,
  SetUser,
} from "./types";

export const AuthActionCreator = {
  setUser: (user: IUser): SetUser => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  serIsLoading: (isLoading: boolean): SetIsLoading => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  serError: (error: string): SetErrore => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreator.serIsLoading(true));
        setTimeout(async () => {
          const response = await UserService.getUsers();
          const mockUser = response.data.find(
            (user) => user.username === username && user.password === password
          );

          if (mockUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);
            dispatch(AuthActionCreator.setUser(mockUser));
            dispatch(AuthActionCreator.setIsAuth(true));
          } else {
            dispatch(AuthActionCreator.serError("Check user name or password"));
          }
          dispatch(AuthActionCreator.serIsLoading(false));
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreator.serError("ERRORE!!!!!"));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    dispatch(AuthActionCreator.setUser({} as IUser));
    dispatch(AuthActionCreator.setIsAuth(false));
  },
};
