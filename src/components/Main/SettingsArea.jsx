import { FormInput } from 'components'
import { useState } from 'react'


// const SettingsItem = ({setting, className}) => {

//   return(
//      <div className={`form-group ${className}`}>
//         <div className="form-bar">
//           <label for="" className="form-label">   
//             {setting.title}
//           </label>
//           <input 
//             className="form-input" 
//             type={setting.type} 
//             value={setting.value} 
//             placeholder={setting.placeholder}/>
//         </div>
//       </div>
//   )
// }

const SettingsArea = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [accountError, setAccountError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [checkPasswordError, seCheckPasswordError] = useState(false)

  // const {currentUser} = useAuth()

  // const email_pattern = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

  const handleSave = (e) => {
    e.preventDefault();

    // 欄位驗證
    if (account.length === 0) {
      setAccountError(true)
      return
    }
    if(name.length === 0 || name.length > 50) {
      setNameError(true)
      return
    }
    if(email.length === 0){
      setEmailError(true)
      return
    }
  };
  
  return(
    <form 
      className="settings middle-container-border" onSubmit={handleSave}
    >
      <h5 className="sub-title">首頁</h5>
      <div className="settings-group">
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
          onChange={(passwordInputValue) => setCheckPassword(passwordInputValue)}
        />
        <FormInput
          label="密碼再確認"
          type="password"
          value={checkPassword}
          placeholder="請再次輸入密碼"
          onChange={(checkPasswordInputValue) => setPassword(checkPasswordInputValue)}
        />
      </div>
      <div className="btn-group">
        <button className="orange-btn radius-50 cursor-pointer">儲存</button>
      </div>
    </form>
  )
}

export { SettingsArea };


// const SettingsItemData = [
//   {
//     id: 1,
//     title: "帳號",
//     type: "text",
//     name: "userAccount",
//     placeholder: "請設定帳號"
//   },
//   {
//     id: 2,
//     title: "名稱",
//     type: "text",
//     name: "userName",
//     placeholder: "請設定名稱"
//   },
//   {
//     id: 3,
//     title: "Email",
//     type: "email",
//     name: "userEmail",
//     placeholder: "請設定Email"
//   },
//   {
//     id: 4,
//     title: "密碼",
//     type: "text",
//     name: "userPassword",
//     placeholder: "請設定密碼"
//   },
//   {
//     id: 5,
//     title: "密碼再確認",
//     type: "password",
//     name: "userPasswordConfirm",
//     placeholder: "請再次輸入密碼"
//   },
// ]