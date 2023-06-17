import { FormInput } from 'components'
import { useState, useEffect } from 'react'
import { useAuth } from 'contexts/AuthContext';
import {getUser, putUserSettings} from 'api/userInfo'
import Swal from 'sweetalert2';

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

  const {currentMember} = useAuth()
  const userId = currentMember?.id

  // const email_pattern = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

  const handleSave = async (e) => {
    e.preventDefault();
    
    // 欄位驗證
    if (account === "") {
      setAccountError(true)
      return
    }

    if(name === "") {
      setNameError(true)
      return
    } else if(name.length > 50){
      setNameError(true)
      return
    }

    if(email === ""){
      setEmailError(true)
      return
    }

    if(password === "") {
      setPasswordError(true)
      return
    } 

    if(checkPassword === "") {
      seCheckPasswordError(true)
      return 
    }

    if(password !== checkPassword){
      seCheckPasswordError(true)
      return
    }

    try{
      const postStatus = await putUserSettings({
        name, account, email, password, checkPassword
      }, userId)
      if(postStatus.message === "修改成功") {
        Swal.fire({
          position: 'top',
          title: postStatus.message,
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        })
        setPassword('')
        setCheckPassword('')
      } else if (postStatus.status === "error"){
        Swal.fire({
          position: 'top',
          title: postStatus.message,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        })
      }
    } catch (error){
      console.error(error)
    }
  };

  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setAccount(data.data.account)
      setName(data.data.name)
      setEmail(data.data.email)
      console.log(data)
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
      className="settings middle-container-border"
    >
      <h5 className="sub-title">首頁</h5>
      <div className="settings-group">
        <FormInput
          label="帳號"
          value={account}
          placeholder="請輸入帳號"
          className = {account === "" && accountError ? "action" : ""}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          children={account === "" && accountError && (
            <div className="form-notification action">
              <p className="form-caption">帳號不可為空白</p>
            </div>
          )}
        />
        <FormInput
          label="名稱"
          value={name}
          placeholder="請輸入使用者名稱"
          className = {(name === "" || name.length > 50) && nameError ? "action" : ""}
          onChange={(nameInputValue) => setName(nameInputValue)}
          children={(name === "" || name.length > 50) && nameError && (
            <div className="form-notification action">
              <p className="form-caption">{name === "" ? "名稱不可為空白": "名稱字數已超過上限"}</p>
            </div>
          )}
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          placeholder="請輸入Email"
          className = {email === "" && emailError ? "action" : ""}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
          children={email === "" && emailError && (
            <div className="form-notification action">
              <p className="form-caption">Email不可為空白</p>
            </div>
          )}
        />
        <FormInput
          label="密碼"
          type="password"
          value={password}
          placeholder="請輸入密碼"
          className = {password === "" && passwordError ? "action" : ""}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          children={password === "" && passwordError && (
            <div className="form-notification action">
              <p className="form-caption">密碼不可為空白</p>
            </div>
          )}
        />
        <FormInput
          label="密碼再確認"
          type="password"
          value={checkPassword}
          placeholder="請再次輸入密碼"
          className = {(checkPassword === "" || checkPassword !== password) && checkPasswordError ? "action" : ""}
          onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
          children={(checkPassword === "" || checkPassword !== password) && checkPasswordError && (
            <div className="form-notification action">
              <p className="form-caption">{checkPassword === ""?"密碼再確認不可為空白": "與密碼不符"}</p>
            </div>
          )}
        />
      </div>
      <div className="btn-group">
        <button className="orange-btn radius-50 cursor-pointer" onClick={handleSave}>儲存</button>
      </div>
    </form>
  )
}

export { SettingsArea };


