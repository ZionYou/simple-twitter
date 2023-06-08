import { ACLogoIcon } from 'assets/icons';
import {Link} from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { SettingsItem } from 'components'

const AdminLoginItemData = [
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

const AdminLoginPage = () => {
  return(
    <section className="admin-login">
      <Container>
        <Row>
          <Col xs={{span: 4, offset: 4}} className="admin-login-container">
            <div className="logo">
              <ACLogoIcon />
            </div>
            <h1 className="title">後台登入</h1>
            <div className="admin-login-group">
              {
                AdminLoginItemData.map((setting) => {return <SettingsItem setting={setting} key={setting.id} className="admin-login-form-group"/>})
              }
            </div>
            <div className="admin-login-btn-group">
              <button className="orange-btn radius-50 admin-login-btn">登入</button>
              <div className="other-login">
                <Link to="/login" className="link-btn">前台登入</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AdminLoginPage;

// import {
//   AuthContainer,
//   AuthInputContainer,
//   AuthButton,
//   AuthLinkText,
// } from 'components/common/auth.styled';
// import { AuthInput } from 'components';

// const AdminLoginPage = () => {
//   return (
//     <AuthContainer>
//       <div>
//         <ACLogoIcon />
//       </div>
//       <h1>後台登入</h1>

//       <AuthInputContainer>
//         <AuthInput />
//       </AuthInputContainer>

//       <AuthInputContainer>
//         <AuthInput />
//       </AuthInputContainer>
//       <AuthButton>登入</AuthButton>
//       <AuthLinkText><Link to="/login">前台登入</Link></AuthLinkText>
//     </AuthContainer>
//   );
// };
