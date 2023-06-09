// import {
//   AuthContainer,
//   AuthInputContainer,
//   AuthButton,
//   AuthLinkText,
// } from 'components/common/auth.styled';
// import { AuthInput } from 'components';

import { ACLogoIcon } from 'assets/icons';
/* add here edit later */
import {FormInput} from '../components/Main/formValue/FormInput'
/* add here edit later */
import {Link} from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import {useState} from 'react'

import {adminLogin} from '../api/auth';
/* havent use yet */
import Swal from 'sweetalert2';

// import {SettingsItem} from '../components/Main/SettingsArea'

// const AdminLoginItemData = [
//   {
//     id: 1,
//     title: "帳號",
//     type: "text",
//     value: "",
//     placeholder: "請輸入帳號"
//   },
//   {
//     id: 2,
//     title: "密碼",
//     type: "text",
//     value: "",
//     placeholder: "請輸入密碼"
//   },
// ]

const AdminLoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    if(account.length === 0){
      return;
    }
    if(password.length === 0){
      return;
    }

    const {success, authToken} = await adminLogin({
      account, 
      password
    });
    if(success) {
      localStorage.setItem('authToken', authToken)

      // add login success message here 
      // return
    }

    // add login failed message here
  }

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
              <FormInput
                label="帳號"
                value={account}
                placeholder="請輸入帳號"
                onChange={(accountInputValue) => setAccount(accountInputValue)}
              />
              <FormInput
                label="密碼"
                type="password"
                value={password}
                placeholder="請輸入帳號"
                onChange={(passwordInputValue) => setPassword(passwordInputValue)}
              />
            </div>
            <div className="admin-login-btn-group">
              <button className="orange-btn radius-50 admin-login-btn" onClick={handleClick}>登入</button>
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

export default AdminLoginPage;