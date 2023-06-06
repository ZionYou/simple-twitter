import { ACLogoIcon } from "assets/icons";
import {ReactComponent as Home} from "assets/icons/home.svg";
import {ReactComponent as HomeChecked} from "assets/icons/home_checked.svg";
import {ReactComponent as Person} from "assets/icons/person.svg";
import {ReactComponent as PersonChecked} from "assets/icons/person_checked.svg"
import {ReactComponent as Settings} from "assets/icons/settings.svg";
import {ReactComponent as SettingsChecked} from "assets/icons/settings_checked.svg";
import {ReactComponent as Logout} from "assets/icons/Logout.svg";

const MainListData = [
  {
    id: "home",
    icon: <Home/>,
    icon_checked: <HomeChecked/>,
    name: "首頁",
  },
  {
    id: "person",
    icon: <Person/>,
    icon_checked: <PersonChecked/>,
    name: "個人資料",
  },
  {
    id: "settings",
    icon: <Settings/>,
    icon_checked: <SettingsChecked/>,
    name: "設定",
  },
]

// url: https://picsum.photos/300/300?text=
const PopularFollowData = [
  {
    id: 1,
    name: "Pizza Hut",
    account: "pizzahut",
    isFollow: true,
  },
  {
    id: 2,
    name: "McDonald",
    account: "McDonald",
    isFollow: true,
  },
  {
    id: 3,
    name: "Bank of Asia",
    account: "BankOfAsia",
    isFollow: false,
  },
  {
    id: 4,
    name: "L'Oreal",
    account: "Loreal",
    isFollow: false,
  },
  {
    id: 5,
    name: "Nintendo",
    account: "Nintendo",
    isFollow: false,
  },
  {
    id: 6,
    name: "MasterCard",
    account: "MasterCard",
    isFollow: false,
  },
  {
    id: 7,
    name: "Nike",
    account: "Nike",
    isFollow: false,
  },
  {
    id: 8,
    name: "Adidas",
    account: "adidas",
    isFollow: false,
  },
]


export const MainList = () => {
  return(
    <div className="main-list">
      <div className="icon">
        <ACLogoIcon/>
      </div>
      <div className="main-list-group">
        {
          MainListData.map((item) => {
            return(
              <div key={item.id}>
                <input type="radio" className="main-list-input" id={item.id} name="main-list" defaultChecked={item.id === "home"} value={item.id}/>
                <label htmlFor={item.id} className="main-list-label cursor-pointer">
                  <span className="default">{item.icon}</span>
                  <span className="checked">{item.icon_checked}</span>
                  <p className="label-name">{item.name}</p>
                </label>
              </div>
            )
          })
        }
        <button className="orange-btn radius-50">推文</button>
      </div>
      <div className="logout-group">
        <span className="logout">
          <Logout/>
        </span>
        <p className="logout-name">登出</p>
      </div>
    </div>
  )
}

export const PopularFollow = () => {
  return(
    <div className="popular-follow">
      <h5 className="sub-title">推薦跟隨</h5>
      <div className="popular-follow-group">
        {
          PopularFollowData.map((item) => {
            return(
              <div className="popular-follow-item" key={item.id}>
                <img src={`https://picsum.photos/300/300?text=${item.id}`} alt={item.name} className="popular-follow-img" />
                <div className="popular-follow-name-group">
                  <a herf="" className="popular-follow-name">{item.name}</a>
                  <p className="popular-follow-account">@<span>{item.name.toLowerCase().replaceAll(' ', '')}</span></p>
                </div>
                <button className={`radius-50 cursor-pointer ${item.isFollow ? "orange-btn" : "orange-border-btn"}`}>{item.isFollow ? "正在跟隨" : "跟隨"}</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}