import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/icons';
import { AuthInput } from 'components';

const LoginPage = () => {
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Alphitter</h1>

      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>
      <AuthButton>登入</AuthButton>
      <AuthLinkText>註冊 Alphitter</AuthLinkText>
      <span>.</span>
      <AuthLinkText>後台登入</AuthLinkText>
    </AuthContainer>
  );
};

export default LoginPage;