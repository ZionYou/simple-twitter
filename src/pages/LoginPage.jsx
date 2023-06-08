// import {
//   AuthContainer,
//   AuthInputContainer,
//   AuthButton,
//   AuthLinkText,
// } from 'components/common/auth.styled';
// import { AuthInput } from 'components';
import { ACLogoIcon } from 'assets/icons';
import {Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { SettingsItem } from 'components';

const LoginItemData = [
  {
    id: 1,
    title: "帳號",
    type: "text",
    value: "",
    placeholder: "請輸入帳號"
  },
  {
    id: 2,
    title: "密碼",
    type: "text",
    value: "",
    placeholder: "請輸入密碼"
  },
]

const LoginPage = () => {
  return(
    <section className="login">
      <Container>
        <Row>
          <Col xs={{span: 4, offset: 4}} className="login-container">
            <div className="logo">
              <ACLogoIcon />
            </div>
            <h1 className="title">登入 Alphitter</h1>
            <div className="login-group">
              {
                LoginItemData.map((setting) => {return <SettingsItem setting={setting} key={setting.id} className="login-form-group"/>})
              }
            </div>
            <div className="login-btn-group">
              <button className="orange-btn radius-50 login-btn">登入</button>
              <div className="other-login">
                <Link to="/regist" className="link-btn">註冊</Link>
                <p className="dot">・</p>
                <Link to="/adminLogin" className="link-btn">後台登入</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}



// const LoginPage = () => {
//   return (
//     <AuthContainer>
//       <div>
//         <ACLogoIcon />
//       </div>
//       <h1>登入 Alphitter</h1>

//       <AuthInputContainer>
//         <AuthInput />
//       </AuthInputContainer>

//       <AuthInputContainer>
//         <AuthInput />
//       </AuthInputContainer>
//       <AuthButton>登入</AuthButton>
//       <AuthLinkText><Link to="/regist">註冊 Alphitter</Link></AuthLinkText>
//       <span>.</span>
//       <AuthLinkText><Link to="/adminLogin">後台登入</Link></AuthLinkText>
//     </AuthContainer>
//   );
// };

export default LoginPage;