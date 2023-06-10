import { ACLogoIcon, HomeIcon, HomeCheckedIcon, PersonIcon, PersonCheckedIcon, SettingsIcon, SettingsCheckedIcon, LogoutIcon } from "assets/icons";
import {Link, useLocation, useNavigate } from 'react-router-dom';

const MainListData = [
  {
    id: "main",
    icon: <HomeIcon/>,
    icon_action: <HomeCheckedIcon/>,
    name: "首頁",
    link: "/main",
  },
  {
    id: "user",
    icon: <PersonIcon/>,
    icon_action: <PersonCheckedIcon/>,
    name: "個人資料",
    link: "/user", 

  },
  {
    id: "setting",
    icon: <SettingsIcon/>,
    icon_action: <SettingsCheckedIcon/>,
    name: "設定",
    link: "/setting"
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

const AdminListData = [
  {
    id: "adminTwi",
    icon: <HomeIcon/>,
    icon_action: <HomeCheckedIcon/>,
    name: "推文清單",
    link: "/adminTwi",
  },
  {
    id: "adminUser",
    icon: <PersonIcon/>,
    icon_action: <PersonCheckedIcon/>,
    name: "使用者列表",
    link: "/adminUser", 

  },
]

const MainListLink = ({data, className}) =>{
  return(
    <Link to={data.link} exact className={`main-list-link ${className}`}>
      <span className="default">{data.icon}</span>
      <span className="checked">{data.icon_action}</span>
      <p className="main-list-name">{data.name}</p>
    </Link>
  )
}

// 主要列表元件
const MainList = () => {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split("/");
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
  }

  return(
    <div className="main-list">
      <Link to="/main" className="icon">
        <ACLogoIcon/>
      </Link>
      <div className="main-list-group">
        {
          MainListData.map((data) => {
            return <MainListLink data={data} key={data.id} className = {splitLocation[1] === data.id? "action" : ""}/>
          })
        }
        <button className="orange-btn radius-50">推文</button>
      </div>
      <a className="logout-group" onClick={handleClick}>
        <span className="logout">
          <LogoutIcon/>
        </span>
        <a herf="" className="logout-name">登出</a>
      </a>
    </div>
  )
}

// 推薦跟隨元件
const PopularFollow = () => {
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

// 後台列表元件
const AdminList = () => {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split("/");
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem('authToken');
    navigate('/adminLogin')
  }

  return(
    <div className="main-list">
      <Link to="/adminTwi" className="icon">
        <ACLogoIcon/>
      </Link>
      <div className="main-list-group">
        {
          AdminListData.map((data) => {
            return <MainListLink data={data} key={data.id} className = {splitLocation[1] === data.id? "action" : ""}/>
          })
        }
      </div>
      <a className="logout-group" onClick={handleClick}>
        <span className="logout">
          <LogoutIcon/>
        </span>
        <a herf="" className="logout-name">登出</a>
      </a>
    </div>
  )
}

export { MainList, PopularFollow, AdminList };

// const MainList = () => {
//   return(
//     <div className="main-list">
//       <div className="icon">
//         <ACLogoIcon/>
//       </div>
//       <div className="main-list-group">
//         {
//           MainListData.map((item) => {
//             return(
//               <div key={item.id}>
//                 <input type="radio" className="main-list-input" id={item.id} name="main-list" defaultChecked={item.id === "home"} value={item.id}/>
//                 <label htmlFor={item.id} className="main-list-label cursor-pointer">
//                   <span className="default">{item.icon}</span>
//                   <span className="checked">{item.icon_checked}</span>
//                   <p className="label-name">{item.name}</p>
//                 </label>
//               </div>
//             )
//           })
//         }
//         <button className="orange-btn radius-50">推文</button>
//       </div>
//       <div className="logout-group">
//         <span className="logout">
//           <LogoutIcon/>
//         </span>
//         <p className="logout-name">登出</p>
//       </div>
//     </div>
//   )
// }