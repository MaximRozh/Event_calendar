import { IUser } from "../../../models/UserModel";

export interface AuthState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string;
}

export enum AuthActionEnum {
  SET_AUTH = "SET_AUTH",
  SET_ERROR = "SET_ERROR",
  SET_USER = "SET_USER",
  SET_IS_LOADING = "SET_IS_LOADING",
}

export interface SetAuthAction {
  type: AuthActionEnum.SET_AUTH;
  payload: boolean;
}

export interface SetErrore {
  type: AuthActionEnum.SET_ERROR;
  payload: string;
}

export interface SetUser {
  type: AuthActionEnum.SET_USER;
  payload: IUser;
}

export interface SetIsLoading {
  type: AuthActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export type AuthAction = SetAuthAction | SetErrore | SetUser | SetIsLoading;
