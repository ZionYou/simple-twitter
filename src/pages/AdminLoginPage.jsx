import { ACLogoIcon } from 'assets/icons';
/* add here edit later */
import { FormInput } from 'components'
/* add here edit later */
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react'
// import { adminLogin } from '../api/admin';
import { useAuth } from '../contexts/AuthContext'
/* havent use yet */
import Swal from 'sweetalert2';

// 後台登入頁面
const AdminLoginPage = () => {
  const [account, setAccount] = useState('')
  const [accountError, setAccountError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const navigate = useNavigate();

  const { adminLogin, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if(account.length === 0){
      // Swal.fire({
      //   position: 'top',
      //   title: '帳號不可為空白',
      //   timer: 1000,
      //   icon: 'error',
      //   showConfirmButton: false,
      // });
      setAccountError(true)
      return;
    }
    if(password.length === 0){
      // Swal.fire({
      //   position: 'top',
      //   title: '密碼不可為空白',
      //   timer: 1000,
      //   icon: 'error',
      //   showConfirmButton: false,
      // });
      setPasswordError(true)
      return;
    }

    const success= await adminLogin({
      account, 
      password
    });
    
    if(success) {
      // add login success message here 
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
      title: '登入失敗！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/adminTwi');
    }
  }, [navigate, isAuthenticated]);

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
            <div className="admin-login-btn-group">
              <button className="orange-btn radius-50 admin-login-btn cursor-pointer" onClick={handleClick}>登入</button>
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

