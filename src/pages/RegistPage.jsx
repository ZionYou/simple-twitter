import { ACLogoIcon } from 'assets/icons';
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { FormInput } from 'components'
import { useState, useEffect } from 'react'
// import { register } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
/* havent use yet */
import Swal from 'sweetalert2';

const RegistPage = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');


  const [accountError, setAccountError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [checkPasswordError, setCheckPasswordError] = useState(false)

  const navigate = useNavigate();
  
  // const { register } = useAuth();

  const { register, isAuthenticated } = useAuth();

  const handleClick = async() => {
    if(account.length === 0 ){
      setAccountError('帳號不可為空白')
      return
    }
    if(name.length === 0) {
      setNameError('使用者名稱不可為空白')
      return
    }
  
    if(email.length === 0){
      setEmailError("Email不可為空白")
      return
    }
    if(password.length === 0){
      setPasswordError("密碼不能為空白")
      return
    }
    if(checkPassword.length === 0 || password !== checkPassword){
      setCheckPasswordError("密碼驗證失敗")
      return
    }

    const message = await register({
      account, name, email, password, checkPassword,
    })
    // const success = await register({
    //   account, name, email, password, checkPassword,
    // })

    if(message === "註冊成功") {
      Swal.fire({
        position: 'top',
        title: '註冊成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      navigate('/login');
      return
    }
    /* add failed message here use swal */
    Swal.fire({
      position: 'top',
      title: message,
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    })
  }
  /* 跳轉失敗 */
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('login');
  //   }
  // }, [navigate, isAuthenticated]);

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
            <FormInput
              label="帳號"
              value={account}
              placeholder="請輸入帳號"
              className = {account.length === 0 && accountError ? "action" : ""}
              onChange={(accountInputValue) => setAccount(accountInputValue)}
            >
              {account.length === 0 && (
                <div className="form-notification action">
                  <p className="form-caption">{accountError}</p>
                </div>
              )}
            </FormInput>
            <FormInput
              label="名稱"
              value={name}
              placeholder="請輸入使用者名稱"
              className = {name.length === 0 && nameError ? "action" : ""}
              onChange={(nameInputValue) => setName(nameInputValue)}
            >
              {name.length === 0 && (
                <div className="form-notification action">
                  <p className="form-caption">{nameError}</p>
                </div>
              )}
            </FormInput>
            <FormInput
              label="Email"
              type="email"
              value={email}
              placeholder="請輸入Email"
              className = {email.length === 0 && emailError ? "action" : ""}
              onChange={(emailInputValue) => setEmail(emailInputValue)}
            >
              {email.length === 0 && (
                <div className="form-notification action">
                  <p className="form-caption">{emailError}</p>
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
            {password.length === 0 && (
                <div className="form-notification action">
                  <p className="form-caption">{passwordError}</p>
                </div>
              )}
            </FormInput>
            <FormInput
              label="密碼再確認"
              type="password"
              value={checkPassword}
              placeholder="請再次輸入密碼"
              className = {checkPassword.length === 0 && checkPasswordError ? "action": ""}
              
              onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
            >
            {checkPassword.length === 0 && (
                <div className="form-notification action">
                  <p className="form-caption">{checkPasswordError}</p>
                </div>
              )}
            </FormInput>
          </div>
          <div className="regist-login-btn-group">
            <button className="orange-btn radius-50 regist-login-btn cursor-pointer" onClick={handleClick}>註冊</button>
            <div className="other-login">
              <Link to="/login" className="link-btn">取消</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default RegistPage;

