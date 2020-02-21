import {Button, StyledApp} from '@passgen/ui-kit';
import React from 'react';
import Helmet from 'react-helmet';

class Demo extends React.PureComponent {
  render() {
    return (
      <StyledApp>
        <Helmet
          meta={[
            {
              content: 'width=device-width, initial-scale=1, user-scalable=no',
              name: 'viewport',
            },
          ]}
        />
        <Button>Button</Button>
      </StyledApp>
    );
  }
}

export default Demo;
