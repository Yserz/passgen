import {EXTERNAL_ROUTE, ROUTE} from '../../route';

export const PUSH_INITIAL_ROUTE = 'PUSH_INITIAL_ROUTE';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const AUTH_RESET_ERROR = 'AUTH_RESET_ERROR';

export function startAuthentication(params?: any) {
  return {params, type: AUTH_START};
}

export function successfulAuthentication() {
  return {type: AUTH_SUCCESS};
}

export function failedAuthentication(error: any) {
  return {
    payload: error,
    type: AUTH_FAILED,
  };
}

export function startLogout() {
  return {type: LOGOUT_START};
}

export function successfulLogout() {
  return {type: LOGOUT_SUCCESS};
}

export function failedLogout(error: Error) {
  return {
    payload: error,
    type: LOGOUT_FAILED,
  };
}

export function resetError() {
  return {type: AUTH_RESET_ERROR};
}

export const pushInitialRoute = (route: ROUTE | EXTERNAL_ROUTE) => ({
  payload: route,
  type: PUSH_INITIAL_ROUTE,
});
