import { FormInput } from 'components'
import { useState, useEffect } from 'react'
import { useAuth } from 'contexts/AuthContext';
import {getUser} from 'api/userInfo'

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

  const [accountError, setAccountError] = useState('')
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [checkPasswordError, seCheckPasswordError] = useState(false)

  const {currentMember} = useAuth()
  const userId = currentMember?.id

  // const email_pattern = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

  const handleSave = (e) => {
    e.preventDefault();

    // 欄位驗證
    if (account.length === 0) {
      setAccountError('帳號不可為空白')
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

  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setAccount(data.data.account)
      setName(data.data.name)
      setEmail(data.data.email)
      // console.log(data)
    }
    // const getUserTwiLikeAsync = async () => {
    //   const {success, data, message} = await getUserTwiLike(userId)
    //   if(success){
    //     setLikeTweets(data.map((data) => ({...data})))
    //     // console.log(data)
    //   } else {
    //     console.error(message)
    //   } 
    // }
    getUserAsync()
  }, [currentMember])
  
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
          className = {account.length === 0 && accountError ? "action" : ""}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          children={account.length === 0 && accountError && (
            <div className="form-notification action">
              <p className="form-caption">帳號不能為空白</p>
            </div>
          )}
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
          value={checkPassword}
          placeholder="請再次輸入密碼"
          onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
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