import {
  Box,
  COLOR,
  ContainerSM,
  ContainerXS,
  Content,
  FlexBox,
  Footer,
  Header,
  Input,
  Slider,
  Small,
  Text,
} from '@passgen/ui-kit';
import {RootState, bindActionCreators} from 'module/reducer';
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from 'redux';

interface Props extends React.HTMLProps<Document> {}

const Index: React.FC<Props & ConnectedProps & DispatchProps> = ({}) => {
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 1024;

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
      <Header data-uie-name="element-header" style={{backgroundColor: COLOR.GRAY_LIGHTEN_64}}>
        <ContainerXS centerText>
          <h2>{'PassGen'}</h2>
        </ContainerXS>
      </Header>
      <Content style={{marginBottom: '48px'}}>
        {showClipboardToast && (
          <Box
            style={{
              backgroundColor: COLOR.GRAY,
              borderRadius: '4px',
              left: 0,
              position: 'absolute',
              right: 0,
              textAlign: 'center',
            }}
          >
            <Text color={COLOR.WHITE}>{'Password copied!'}</Text>
          </Box>
        )}
        <ContainerSM>
          <FlexBox align="center" justify="center" style={{marginTop: '72px'}}>
            <FlexBox column={true} justify="center" style={{flexGrow: 9, flexBasis: 0, marginRight: '24px'}}>
              <Small block bold style={{marginBottom: '16px'}}>
                {'Password length'}
              </Small>
              <Slider
                min={MIN_PASSWORD_LENGTH}
                max={MAX_PASSWORD_LENGTH}
                value={limitedPasswordLength}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordLength(parseInt(event.target.value, 10));
                }}
              />
            </FlexBox>
            <Input
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
              style={{flexGrow: 1, flexBasis: 0, marginBottom: 0}}
            />
          </FlexBox>
          <Box
            onClick={async (event: React.MouseEvent<HTMLDivElement>) => {
              showToast();
              await navigator.clipboard.writeText((event.target as any).innerText);
            }}
            style={{overflowWrap: 'break-word', marginTop: '56px'}}
          >
            {password}
          </Box>
        </ContainerSM>
      </Content>
      <Footer style={{position: 'fixed', bottom: 0, width: '100%', backgroundColor: COLOR.GRAY_LIGHTEN_64}}>
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
