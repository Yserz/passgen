import {Button, Content, Footer, Header, Text} from '@passgen/ui-kit';
import {RootState, bindActionCreators} from 'module/reducer';
import React from 'react';
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from 'redux';

interface Props extends React.HTMLProps<Document> {}

const Index: React.FC<Props & ConnectedProps & DispatchProps> = ({}) => (
  <>
    <Header data-uie-name="element-header">{'Header'}</Header>
    <Content>
      <Text bold style={{margin: 'auto 0'}}>
        <Button>{'PassGen'}</Button>
      </Text>
    </Content>
    <Footer>{'Footer'}</Footer>
  </>
);

type ConnectedProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: RootState) => ({});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
