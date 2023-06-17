import { ACLogoIcon, HomeIcon, HomeCheckedIcon, PersonIcon, PersonCheckedIcon, SettingsIcon, SettingsCheckedIcon, LogoutIcon, BackArrowIcon } from "assets/icons";
import { useEffect, useState } from "react";
import {Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { getUser, getUserTwi, getTopTenFollowList } from 'api/userInfo'
// import {logout} from 'api/admin'

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

const UserTitle = ()=>{
  const [userInfo, setUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([])
  const [userId, setUserId] = useState([])
  const { currentMember } = useAuth();
  const tweetCount = userTweets.length
  const userID= localStorage.getItem('User');

  useEffect(() => {
    const user = () =>{
      if (userID === currentMember?.id){
        setUserId(currentMember?.id)
      } else {
        setUserId(userID)
      }
    }
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data)
    }
    const getUserTwiAsync = async () => {
      const {data} = await getUserTwi(userId)
      setUserTweets(data)
    }
    getUserAsync()
    getUserTwiAsync()
    user()
    // getUserTwiLikeAsync()
  }, [currentMember])

  // const handleClick = () => {
  //   localStorage.removeItem('User');
  //   onClick={handleClick}
  // };

  return(
    <>
      <span 
        className="back-icon" 
      ><BackArrowIcon/></span>
      <div className="title-group">
        <p className="name">{userInfo.data?.name}</p>
        <p className="tweet-num"><span>{tweetCount}</span> 推文</p>
      </div>
    </>
  )
}



// 主要列表元件
const MainList = ({onClick}) => {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split("/");
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth();
  // const navigate = useNavigate()
  // const { logout } = useAuth();

  const handleClick = () => {
    logout();
    // localStorage.removeItem('authToken');
    // localStorage.removeItem('success');
    // navigate('login')
  }
  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [navigate, isAuthenticated])

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
        <button className="orange-btn radius-50 cursor-pointer" onClick={onClick}>推文</button>
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
  const [topFollow, setTopFollow] = useState([])
  const { currentMember } = useAuth();
  useEffect(() => {
    const getTopTenFollowListAsync = async () => {
      try{
        const {success, data, message} = await getTopTenFollowList();
        if(success){
          setTopFollow(data.map((data) => ({...data})))
        } else {
          console.log(message)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getTopTenFollowListAsync()
  }, [])

  const handleClick= (e) => {
    const id = e.target.id;
    localStorage.setItem('User', id)
  }

  // const top10 = topFollow.filter((item) => item.id <= 104)
  const topFollowList = topFollow.map((item) => {
    return(
      <div className="popular-follow-item" key={item.id}>
        <Link to={item.id === currentMember?.id ? '/user' : '/otherUser'}>
          <img src={item.avatar === null ? "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png" : item.avatar} alt={item.name} className="popular-follow-img"
          id={item.id} 
          onClick={handleClick}/>
        </Link>
        <div className="popular-follow-name-group">
          <a herf="" className="popular-follow-name">{item.name}</a>
          <p className="popular-follow-account">@<span>{item.account}</span></p>
        </div>
        <button className={`radius-50 cursor-pointer ${item.isFollowed ? "orange-btn" : "orange-border-btn"}`}>{item.isFollowed ? "正在跟隨" : "跟隨"}</button>
      </div>
    )
  })

  return(
    <div className="popular-follow">
      <h5 className="sub-title">推薦跟隨</h5>
      <div className="popular-follow-group">
        {topFollowList}
      </div>
    </div>
  )
}

// 後台列表元件
const AdminList = () => {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split("/");
  // const navigate = useNavigate()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth();
  // const { logout } = useAuth();

  const handleClick = () => {
    logout();
    // localStorage.removeItem('authToken');
    // navigate('/adminLogin')
  }
  
  useEffect(() => {
    if(!isAuthenticated){
      navigate('/adminLogin')
    }
  }, [navigate, isAuthenticated])

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

export { MainList, PopularFollow, AdminList, UserTitle};

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