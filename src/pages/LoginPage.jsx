/* add here edit later */
import { FormInput } from 'components';
/* add here edit later */
import { ACLogoIcon } from 'assets/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { login } from '../api/auth';
/* havent use yet */
import Swal from 'sweetalert2';

// 登入頁面
const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate();

  const handleClick = async () => {
    if(account.length === 0) {
      Swal.fire({
        position: 'top',
        title: '帳號不可為空白',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }
    if(password.length === 0){
      Swal.fire({
        position: 'top',
        title: '密碼不可為空白',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }

    const {success, token} = await login({
      account, 
      password
    });

    if(success) {
      localStorage.setItem('authToken', token)

      // add login success message here
      console.log("success") 
      Swal.fire({
        position: 'top',
        title: '登入成功',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      })
      navigate('/main')
      return;
    } 
    // add login failed message here
    Swal.fire({
      position: 'top',
      title: '登入失敗',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
    console.log('failed')
    
  }

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
                placeholder="請輸入密碼"
                onChange={(passwordInputValue) => setPassword(passwordInputValue)}
              />
            </div>
            <div className="login-btn-group">
              <button className="orange-btn radius-50 login-btn cursor-pointer" onClick={handleClick}>登入</button>
              <div className="other-login">
                <Link to="/regist" className="link-btn">註冊 Alphitter</Link>
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

export default LoginPage;

// import {
//   AuthContainer,
//   AuthInputContainer,
//   AuthButton,
//   AuthLinkText,
// } from 'components/common/auth.styled';
// import { AuthInput } from 'components';

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

