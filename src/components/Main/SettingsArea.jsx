import {FormInput} from './formValue/FormInput'
const SettingsItemData = [
  {
    id: 1,
    title: "帳號",
    type: "text",
    name: "userAccount",
    placeholder: "請設定帳號"
  },
  {
    id: 2,
    title: "名稱",
    type: "text",
    name: "userName",
    placeholder: "請設定名稱"
  },
  {
    id: 3,
    title: "Email",
    type: "email",
    name: "userEmail",
    placeholder: "請設定Email"
  },
  {
    id: 4,
    title: "密碼",
    type: "text",
    name: "userPassword",
    placeholder: "請設定密碼"
  },
  {
    id: 5,
    title: "密碼再確認",
    type: "password",
    name: "userPasswordConfirm",
    placeholder: "請再次輸入密碼"
  },
]

export const SettingsItem = ({setting, className}) => {
  return(
     <div className={`form-group ${className}`}>
        <div className="form-bar">
          <label for="" className="form-label">{setting.title}</label>
          <input type={setting.type} className="form-input" value={setting.value} placeholder={setting.placeholder}/>
        </div>
      </div>
  )
}


const SettingsArea = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return(
    <form className="settings middle-container-border" onSubmit={handleSubmit}>
        <h5 className="sub-title">首頁</h5>
        <div className="settings-group">
          {
            SettingsItemData.map((setting) => {return <SettingsItem prop={setting} key={setting.id} className="setting-form-group"/>} )
          }
        </div>
        <div className="btn-group">
          <button className="orange-btn radius-50 cursor-pointer">儲存</button>
        </div>
    </form>
  )
}

export default SettingsArea;