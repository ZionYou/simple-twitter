import { ACLogoIcon, HomeIcon, HomeCheckedIcon, PersonIcon, PersonCheckedIcon, SettingsIcon, SettingsCheckedIcon, LogoutIcon, CloseIcon } from "assets/icons";
import { useEffect, useState } from "react";
import {Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { getTopTenFollowList, followOther, unfollowOther} from "api/userInfo";
// import { NewTwiPopUp } from "./Popup";
import { Container, Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import { creatNewTwi, getUser } from "api/userInfo";
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

// 主要列表元件
const MainList = () => {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split("/");
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState([]);
  const [isError, setIsError] = useState(false)
  const [tweet, setTweet] = useState('')
  const [isPopup, setIsPopup] = useState(false)
  const { isAuthenticated, logout, currentMember } = useAuth();
  // const navigate = useNavigate()
  // const { logout } = useAuth();
   const userId = currentMember?.id
   const handlePopupClick = async() => {
    if(tweet === "" ){
      setIsError(true)
      return
    }  
    if (tweet.length > 140) {
      setIsError(true)
      return
    } 

     try{
      const data = await creatNewTwi(tweet)
      console.log(data.message)
      if(data.message === "發送成功"){
        Swal.fire({
          position: 'top',
          title: data.message,
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        })
        setTweet('')
        setIsPopup(false)
      } else {
        Swal.fire({
          position: 'top',
          title: data.message,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        })
        setTweet('')
      }
    } catch (error){
      setTweet('')
      console.error(error)
    }
  }
  const handleClick = () => {
    logout();
    // localStorage.removeItem('authToken');
    // localStorage.removeItem('success');
    // navigate('login')
  }
  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data)
      // console.log(data)
    }
    getUserAsync()
  }, [ currentMember ])
  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [navigate, isAuthenticated])

  return(
    <>
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
          <button className="orange-btn radius-50 cursor-pointer" onClick={() => setIsPopup(true)}>推文</button>
          {/* <NewTwiPopUp/> */}
        </div>
        <a className="logout-group" onClick={handleClick}>
          <span className="logout">
            <LogoutIcon/>
          </span>
          <a herf="" className="logout-name">登出</a>
        </a>
      </div>
      {isPopup && <div className="popup-main">
        <div className="popup-bg">
          <Container>
            <Row>
              <Col xs={{span: 7, offset: 2}} className="popup-container">
                <div className="close-group">
                  <a href="#" className="close" onClick={() => setIsPopup(false)}><CloseIcon/></a>
                </div>
                <div className="type-area">
                  <img src={userInfo.data?.avatar} alt="" />
                  <textarea 
                    id="tweet-textarea" 
                    className="newtwi-textarea" 
                    name="new-tweet-type" 
                    placeholder="有什麼新鮮事?"
                    onChange={(e) => setTweet(e.target.value)}
                  >{tweet}</textarea>
                </div>
                <div className="btn-group">
                  {(tweet === "" || tweet.length > 140) && isError && (<span className="error">{tweet === "" ? "內容不可空白" : "字數不可超過140字"}</span>)}
                  <button className="orange-btn radius-50 cursor-pointer" onClick={handlePopupClick}>推文</button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>}
    </>
  )
}

const PopularFollowItem = ({item}) => {
  let isFollow = item.isFollowed
  const [followState, setFollowState] = useState(isFollow)
  // console.log(isFollow)
  const {currentMember} = useAuth()

  const handleFollow = async () => {
    // console.log(isFollow)
    // console.log(followState)
    if(followState === true) {
      setFollowState(false)
      try{
        const data = await unfollowOther(item.id)
        
        // console.log(data.message)
        console.log(data)
        
      } catch (error){
        console.error(error)
      }
    } else if (followState === false){
      if(item.id === currentMember.id) return
      setFollowState(true)
      try{
        const data = await followOther(item.id)
        console.log(data)
      } catch(error){
        console.error(error)
      }
    }
  }
  return(
      <div className="popular-follow-item" key={item.id}>
        <Link to={item.id !== currentMember?.id ? `/otherUser/${item.id}`:`/user`}>
          <img src={item.avatar === null ? "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png" : item.avatar} alt={item.name} className="popular-follow-img" />
        </Link>
        <div className="popular-follow-name-group">
          <a herf="" className="popular-follow-name">{item.name}</a>
          <p className="popular-follow-account">@<span>{item.account}</span></p>
        </div>
        <button className={`radius-50 cursor-pointer ${followState ? "orange-btn" : "orange-border-btn"}`} onClick={handleFollow}>{followState ? "正在跟隨" : "跟隨"}</button>
      </div>
    )
}

// 推薦跟隨元件
const PopularFollow = () => {
  const [topFollow, setTopFollow] = useState([])
  
  useEffect(() => {
    const getTopTenFollowListAsync = async () => {
      try{
        const {success, data, message} = await getTopTenFollowList();
        if(success){
          // setTopFollow({...data})
          setTopFollow(data.map((data) => ({...data})))
          // console.log(data)
        } else {
          console.log(message)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getTopTenFollowListAsync()
  }, [])

  // const top10 = topFollow.filter((item) => item.id <= 104)
  const topFollowList = topFollow.map((item) => {
    return <PopularFollowItem item={item} key={item.id}/>
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

export { MainList, PopularFollow, AdminList };
