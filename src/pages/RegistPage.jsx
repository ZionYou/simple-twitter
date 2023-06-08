import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/icons';
import { AuthInput } from 'components';
import {Link} from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import {SettingsItem} from '../components/Main/SettingsArea'

const RegistItemData = [
  {
    id: 1,
    title: "帳號",
    type: "text",
    value: "",
    placeholder: "請輸入帳號"
  },
  {
    id: 2,
    title: "名稱",
    type: "text",
    value: "",
    placeholder: "請輸入使用者名稱"
  },
  {
    id: 3,
    title: "Email",
    type: "email",
    value: "",
    placeholder: "請輸入Email"
  },
  {
    id: 4,
    title: "密碼",
    type: "text",
    value: "",
    placeholder: "請設定密碼"
  },
  {
    id: 5,
    title: "密碼再確認",
    type: "text",
    value: "",
    placeholder: "請再次輸入密碼"
  },
]

const RegistPage = () => {
  return(
  <section className="regist-login">
    <Container>
      <Row>
        <Col xs={{span: 4, offset: 4}} className="regist-login-container">
          <div className="logo">
            <ACLogoIcon />
          </div>
          <h1 className="title">建立你的帳號</h1>
          <div className="regist-login-group">
            {
              RegistItemData.map((setting) => {return <SettingsItem setting={setting} key={setting.id} className="regist-login-form-group"/>})
            }
          </div>
          <div className="regist-login-btn-group">
            <button className="orange-btn radius-50 regist-login-btn">註冊</button>
            <div className="other-login">
              <Link to="/adminLogin" className="link-btn">取消</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}


// const RegistPage = () => {
//   return (
//     <>
//       <Container>
//         <Row>
//           <Col xs={{span: 4, offset: 4}}>
//             <AuthContainer>
//             <div>
//               <ACLogoIcon />
//             </div>
//             <h1>建立您的帳號</h1>

//             <AuthInputContainer>
//               <AuthInput />
//             </AuthInputContainer>

//             <AuthInputContainer>
//               <AuthInput />
//             </AuthInputContainer>

//             <AuthInputContainer>
//               <AuthInput />
//             </AuthInputContainer>

//             <AuthInputContainer>
//               <AuthInput />
//             </AuthInputContainer>

//             <AuthInputContainer>
//               <AuthInput />
//             </AuthInputContainer>
//             <AuthButton>註冊</AuthButton>
//             <AuthLinkText><Link to="/login">取消</Link></AuthLinkText>
//           </AuthContainer>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

export default RegistPage;