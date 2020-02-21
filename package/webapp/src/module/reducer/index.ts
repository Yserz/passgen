import {ActionRoot} from 'module/action';
import authReducer, {AuthState, initialAuthState} from 'module/reducer/authReducer';
import {
  ActionCreatorsMapObject,
  AnyAction,
  Dispatch,
  bindActionCreators as bindActionCreatorsRedux,
  combineReducers,
} from 'redux';
import {ThunkAction as ReduxThunkAction, ThunkDispatch as ReduxThunkDispatch} from 'redux-thunk';

export type Api = {
  config: any;
  actions: ActionRoot;
};
export type ThunkAction<T = Promise<void>> = ReduxThunkAction<T, RootState, Api, AnyAction>;
export type ThunkDispatch = ReduxThunkDispatch<RootState, Api, AnyAction>;

export type BindActionCreators = <M extends ActionCreatorsMapObject<any>>(
  actionCreators: M,
  dispatch: Dispatch
) => {
  [N in keyof M]: ReturnType<M[N]> extends ReduxThunkAction<any, any, any, any>
    ? (...args: Parameters<M[N]>) => ReturnType<ReturnType<M[N]>>
    : M[N]
};

export const bindActionCreators: BindActionCreators = bindActionCreatorsRedux;

export interface RootState {
  authState: AuthState;
}

export const initialRootState: RootState = {
  authState: initialAuthState,
};

const reducers = combineReducers<RootState>({
  authState: authReducer,
});

export default reducers;
