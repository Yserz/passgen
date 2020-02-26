import {
  COLOR,
  Container,
  ContainerSM,
  ContainerXS,
  Content,
  FlexBox,
  Footer,
  Header,
  Input,
  Link,
  Slider,
  Small,
  Text,
  TextLink,
} from '@passgen/ui-kit';
import {RootState, bindActionCreators} from 'module/reducer';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from 'redux';

interface Props extends React.HTMLProps<Document> {}

const Index: React.FC<Props & ConnectedProps & DispatchProps> = ({}) => {
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 1024;
  const GITHUB_URL = 'https://github.com/Yserz/passgen';

  const [passwordLength, setPasswordLength] = useState<number | ''>(MIN_PASSWORD_LENGTH);
  const [showClipboardToast, setShowClipboardToast] = useState(false);
  const [password, setPassword] = useState();

  const limitedPasswordLength = Math.max(MIN_PASSWORD_LENGTH, passwordLength || 0);
  useEffect(() => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const array = [];
    for (let i = 0, n = charset.length; i < limitedPasswordLength; ++i) {
      array.push(charset.charAt(Math.floor(Math.random() * n)));
    }

    setPassword(array.join(''));
  }, [passwordLength]);

  const showToast = () => {
    setTimeout(() => {
      setShowClipboardToast(false);
    }, 3000);
    setShowClipboardToast(true);
  };

  return (
    <>
      <Header
        data-uie-name="element-header"
        style={{
          backgroundColor: COLOR.GRAY_DARKEN_40,
          height: '60px',
          position: 'fixed',
          top: 0,
          zIndex: 99,
        }}
      >
        <ContainerSM centerText verticalCenter>
          {showClipboardToast ? (
            <Text center color={COLOR.WHITE}>
              {'Password copied!'}
            </Text>
          ) : (
            <Link href={GITHUB_URL} target="_blank">
              <img src={'logo_192.png'} width={50} alt={'Logo'} style={{display: 'block', margin: 'auto'}} />
            </Link>
          )}
        </ContainerSM>
      </Header>
      <Container centerText>
        <Content>
          <ContainerSM verticalCenter>
            <FlexBox align="center" style={{marginTop: '80px'}}>
              <FlexBox
                column={true}
                justify="center"
                style={{minWidth: 0, flexGrow: 1, flexBasis: 0, marginRight: '24px'}}
              >
                <Small block bold style={{marginBottom: '8px'}}>
                  <label htmlFor="pwLengthInput">{'Password length'}</label>
                </Small>
                <Slider
                  id="pwLengthInput"
                  min={MIN_PASSWORD_LENGTH}
                  max={MAX_PASSWORD_LENGTH}
                  value={limitedPasswordLength}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordLength(parseInt(event.target.value, 10));
                  }}
                />
              </FlexBox>
              <Input
                id="pwLengthInput"
                value={passwordLength}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const parsedNumber = parseInt(event.target.value, 10);
                  if (parsedNumber) {
                    const limitedNumber = Math.min(parsedNumber, MAX_PASSWORD_LENGTH);
                    setPasswordLength(limitedNumber);
                  } else {
                    setPasswordLength('');
                  }
                }}
                style={{minWidth: '70px', flexBasis: 0, marginBottom: 0}}
              />
            </FlexBox>
          </ContainerSM>
        </Content>
        <Container
          centerText
          onClick={async (event: React.MouseEvent<HTMLDivElement>) => {
            showToast();
            await navigator.clipboard.writeText((event.target as any).innerText);
          }}
          style={{
            cursor: 'pointer',
            fontFamily: 'monospace',
            letterSpacing: '.15em',
            margin: '48px 0',
            maxWidth: 1024,
            overflowWrap: 'break-word',
          }}
        >
          {password}
        </Container>
      </Container>
      <Footer style={{position: 'fixed', bottom: 0, backgroundColor: COLOR.GRAY_DARKEN_40}}>
        <ContainerXS centerText>
          <TextLink color={COLOR.WHITE} fontSize="11px" href={GITHUB_URL} target="_blank">
            {'PassGen'}
          </TextLink>
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
