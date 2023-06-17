/* add here edit later */
import { FormInput, FormTextarea } from 'components';
/* add here edit later */
import { ACLogoIcon } from 'assets/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';
// import { login } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
/* havent use yet */
import Swal from 'sweetalert2';

// 登入頁面
const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [accountError, setAccountError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if(account.length === 0) {
      setAccountError(true)
      return
    }
    if(password.length === 0){
      setPasswordError(true)
      return
    }

    const success = await login({
      account,
      password,
    });

    if(success) {
      console.log("success") 
      
      Swal.fire({
        position: 'top',
        title: '登入成功',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      })
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main');
    } 
  }, [navigate, isAuthenticated]);

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
                className = {account.length === 0 && accountError ? "action" : ""}
                onChange={(accountInputValue) => setAccount(accountInputValue)}
              >
                {account.length === 0 && accountError && (
                  <div className="form-notification action">
                    <p className="form-caption">帳號不能為空白</p>
                  </div>
                )}
              </FormInput>
  
              <FormInput
                label="密碼"
                type="password"
                value={password}
                placeholder="請輸入密碼"
                className = {password.length === 0 && passwordError ? "action" : ""}
                onChange={(passwordInputValue) => setPassword(passwordInputValue)}
              >
                {password.length === 0 && passwordError && (
                  <div className="form-notification action">
                    <p className="form-caption">密碼不能為空白</p>
                  </div>
                )}
              </FormInput>
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
