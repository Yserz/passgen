import {StyledApp} from '@passgen/ui-kit';
import {createBrowserHistory} from 'history';
import Index from 'page/Index';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router';
import {Router} from 'react-router-dom';
import {RootState} from './module/reducer';
import {ROUTE} from './route';

const history = createBrowserHistory();

interface ConnectedProps {}
interface DispatchProps {}

const Root: React.FC<ConnectedProps & DispatchProps> = ({}) => {
  return (
    <StyledApp>
      <Router history={history}>
        <Switch>
          <Route exact path={ROUTE.HOME} component={Index} />
          <Redirect to={ROUTE.HOME} />
        </Switch>
      </Router>
    </StyledApp>
  );
};

export default connect((state: RootState) => ({}), {})(Root);
