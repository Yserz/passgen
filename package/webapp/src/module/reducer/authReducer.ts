import * as AuthActionCreator from 'module/creator/AuthActionCreator';

export type AuthState = {
  readonly error: any;
  readonly fetched: boolean;
  readonly fetching: boolean;
  readonly isAuthenticated: boolean;
  readonly initialRoute?: string;
};

export const initialAuthState: AuthState = {
  error: null,
  fetched: false,
  fetching: false,
  initialRoute: undefined,
  isAuthenticated: false,
};

export default function reducer(state = initialAuthState, action: any) {
  switch (action.type) {
    case AuthActionCreator.AUTH_START: {
      return {
        ...state,
        error: null,
        fetching: true,
        isAuthenticated: false,
      };
    }
    case AuthActionCreator.AUTH_FAILED: {
      return {
        ...state,
        error: action.payload,
        fetching: false,
        isAuthenticated: false,
      };
    }
    case AuthActionCreator.AUTH_SUCCESS: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        isAuthenticated: true,
      };
    }
    case AuthActionCreator.PUSH_INITIAL_ROUTE: {
      return {...state, initialRoute: action.payload};
    }
    case AuthActionCreator.AUTH_RESET_ERROR: {
      return {...state, error: null};
    }
    default: {
      return state;
    }
  }
}
