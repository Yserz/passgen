import * as AuthActionCreator from 'module/creator/AuthActionCreator';
import {ThunkAction} from 'module/reducer';
import * as validator from 'module/Validator';
import {EXTERNAL_ROUTE, ROUTE} from 'route';

export class AuthAction {
  doAuth = (login: any): ThunkAction => {
    return async (dispatch, getState, {actions: {}}) => {
      dispatch(
        AuthActionCreator.startAuthentication({
          clientType: login.clientType,
          code: login.code,
          email: login.email,
          handle: login.handle,
          password: '******',
          phone: login.phone,
        }),
      );
      try {
        validator.validatePasswordLength(String(login.password));
        dispatch(AuthActionCreator.successfulAuthentication());
      } catch (error) {
        dispatch(AuthActionCreator.failedAuthentication(error));
      }
    };
  };

  doLogout = (): ThunkAction => {
    return async dispatch => {
      dispatch(AuthActionCreator.startLogout());
      try {
        dispatch(AuthActionCreator.successfulLogout());
      } catch (error) {
        dispatch(AuthActionCreator.failedLogout(error));
      }
    };
  };

  pushInitialRoute = (route: ROUTE | EXTERNAL_ROUTE): ThunkAction => {
    return async dispatch => {
      dispatch(AuthActionCreator.pushInitialRoute(route));
    };
  };
}
export const authAction = new AuthAction();
