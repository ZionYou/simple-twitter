import { ACLogoIcon } from 'assets/icons';
import { Link } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { FormInput } from 'components'
import { useState } from 'react'
import { register } from '../api/auth';
/* havent use yet */
import Swal from 'sweetalert2';

const RegistPage = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = async() => {
    if(account.length === 0 ){
      Swal.fire({
        position: 'top',
        title: '帳號不可為空白',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }
    if(name.length === 0) {
      Swal.fire({
        position: 'top',
        title: '使用者名稱不可為空白',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }
    if(name.length > 50){
      Swal.fire({
        position: 'top',
        title: '使用者名稱過長',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }
    if(email.length === 0){
      Swal.fire({
        position: 'top',
        title: 'Email不可為空白',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }
    /* email test failed need to adjust */
    // if(/\S+@\S+\.\S+/.test(email)){
    //   Swal.fire({
    //     position: 'top',
    //     title: 'Email不符合格式',
    //     timer: 1000,
    //     icon: 'error',
    //     showConfirmButton: false,
    //   });
    //   return
    // }
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
    if(password !== confirmPassword || confirmPassword.length === 0){
      Swal.fire({
        position: 'top',
        title: '密碼驗證失敗',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }

    const {success, token} = await register({
      account, name, email, password, confirmPassword,
    })

    if(success) {
      localStorage.setItem('authToken', token)
      /* add success message here use swal*/ 
      Swal.fire({
        position: 'top',
        title: '註冊成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return
    }
    /* add failed message here use swal */
    Swal.fire({
      position: 'top',
      title: '註冊失敗！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  }


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
              onChange={(accountInputValue) => setAccount(accountInputValue)}
            />
            <FormInput
              label="名稱"
              value={name}
              placeholder="請輸入使用者名稱"
              onChange={(nameInputValue) => setName(nameInputValue)}
            />
            <FormInput
              label="Email"
              type="email"
              value={email}
              placeholder="請輸入Email"
              onChange={(emailInputValue) => setEmail(emailInputValue)}
            />
            <FormInput
              label="密碼"
              type="password"
              value={password}
              placeholder="請輸入密碼"
              onChange={(passwordInputValue) => setPassword(passwordInputValue)}
            />
            <FormInput
              label="密碼再確認"
              type="password"
              value={confirmPassword}
              placeholder="請再次輸入密碼"
              onChange={(confirmPasswordInputValue) => setConfirmPassword(confirmPasswordInputValue)}
            />
          </div>
          <div className="regist-login-btn-group">
            <button className="orange-btn radius-50 regist-login-btn" onClick={handleClick}>註冊</button>
            <div className="other-login">
              <Link to="/" className="link-btn">取消</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default RegistPage;

// import {
//   AuthContainer,
//   AuthInputContainer,
//   AuthButton,
//   AuthLinkText,
// } from 'components/common/auth.styled';
// import {SettingsItem} from '../components/Main/SettingsArea'
// import { AuthInput } from 'components';

// const RegistItemData = [
//   {
//     id: 1,
//     title: "帳號",
//     type: "text",
//     value: "",
//     placeholder: "請輸入帳號"
//   },
//   {
//     id: 2,
//     title: "名稱",
//     type: "text",
//     value: "",
//     placeholder: "請輸入使用者名稱"
//   },
//   {
//     id: 3,
//     title: "Email",
//     type: "email",
//     value: "",
//     placeholder: "請輸入Email"
//   },
//   {
//     id: 4,
//     title: "密碼",
//     type: "text",
//     value: "",
//     placeholder: "請設定密碼"
//   },
//   {
//     id: 5,
//     title: "密碼再確認",
//     type: "text",
//     value: "",
//     placeholder: "請再次輸入密碼"
//   },
// ]

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