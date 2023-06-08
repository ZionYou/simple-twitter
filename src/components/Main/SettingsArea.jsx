const SettingsItemData = [
  {
    id: 1,
    title: "帳號",
    type: "text",
    value: "wonderwomen",
    placeholder: "請設定帳號"
  },
  {
    id: 2,
    title: "名稱",
    type: "text",
    value: "Diana",
    placeholder: "請設定名稱"
  },
  {
    id: 3,
    title: "Email",
    type: "email",
    value: "diana@gmail.com",
    placeholder: "請設定Email"
  },
  {
    id: 4,
    title: "密碼",
    type: "text",
    value: "",
    placeholder: "請設定密碼"
  },
  {
    id: 5,
    title: "密碼再確認",
    type: "text",
    value: "",
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
  return(
    <section className="settings middle-container-border">
        <h5 className="sub-title">首頁</h5>
        <div className="settings-group">
          {
            SettingsItemData.map((setting) => {return <SettingsItem setting={setting} key={setting.id} className="setting-form-group"/>})
          }
        </div>
        <div className="btn-group">
          <button className="orange-btn radius-50">儲存</button>
        </div>
    </section>
  )
}

export default SettingsArea;