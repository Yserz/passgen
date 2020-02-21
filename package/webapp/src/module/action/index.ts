import {AuthAction, authAction} from 'module/action/AuthAction';

export interface ActionRoot {
  authAction: AuthAction;
}

export const actionRoot: ActionRoot = {
  authAction,
};
