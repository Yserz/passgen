import {ContainerSM, ContainerXS, Content, Footer, Header, Slider, Small, Text, TextArea} from '@passgen/ui-kit';
import {RootState, bindActionCreators} from 'module/reducer';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from 'redux';

interface Props extends React.HTMLProps<Document> {}

const Index: React.FC<Props & ConnectedProps & DispatchProps> = ({}) => {
  const MIN_PASSWORD_LENGTH = 8;
  const [passwordLength, setPasswordLength] = useState(MIN_PASSWORD_LENGTH);
  const generatePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const array = [];
    for (let i = 0, n = charset.length; i < passwordLength; ++i) {
      array.push(charset.charAt(Math.floor(Math.random() * n)));
    }

    return array.join('');
  };
  return (
    <>
      <Header data-uie-name="element-header">
        <ContainerXS centerText>
          <h2>{'PassGen'}</h2>
        </ContainerXS>
      </Header>
      <Content>
        <ContainerSM>
          <Slider
            min={MIN_PASSWORD_LENGTH}
            max={1024}
            value={passwordLength}
            onInput={event => {
              setPasswordLength((event as any).target.value);
            }}
            style={{marginTop: '56px'}}
          />
          <Text block center bold style={{margin: 'auto 0 32px'}}>
            {'Password length: '}
            {passwordLength}
          </Text>
          <TextArea style={{height: '300px'}} value={generatePassword()} />
        </ContainerSM>
      </Content>
      <Footer style={{position: 'fixed', bottom: 0, width: '100%'}}>
        <ContainerXS centerText>
          <Small>{'PassGen'}</Small>
        </ContainerXS>
      </Footer>
    </>
  );
};

type ConnectedProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: RootState) => ({});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
