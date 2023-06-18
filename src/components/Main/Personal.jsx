import { BackArrowIcon, CommentIcon, LikeSolidIcon, LikeIcon,MessageIcon, NoticeIcon, NoticeSolidIcon } from "assets/icons";
import { UserProfileTwi, ReplyLikeTwiPopUp } from "components";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from 'contexts/AuthContext';
import {EditProfileModal} from 'components/Main/Popup'
import { TransferTime } from "components/utilities/TransferTime";
import { getUser, followOther, unfollowOther} from "api/userInfo";
import Swal from 'sweetalert2';

import { likeTweet, unlikeTweet } from "api/userInfo";


const PersonalSwitchData = [
  {
    id: "tweet",
    name: "推文",
  },
  {
    id: "reply",
    name: "回復",
  },
  {
    id: "like",
    name: "喜歡的內容",
  },

]

const OtherBtnGroup = ({item}) => {
  const isFollow = item.isFollowed
  const [followState, setFollowState] = useState(isFollow)
  const [showNotice, setShowNotice] = useState(false);
  const { currentMember } = useAuth()
  // 預設為不開啟小鈴鐺
  function handleShowNotice() {
    setShowNotice(!showNotice);
  }

  const handleFollow = async () => {
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
    <>
      <button class="message orange-border-btn radius-50">
        <MessageIcon />
      </button>
      {showNotice ? 
        (
          <button class="notice-icon-solid" onClick={handleShowNotice}>
            <NoticeSolidIcon />
            <i>
            </i>
          </button>
        ) : (
          <button class="notice-icon" onClick={handleShowNotice}>
           <i>
            <NoticeIcon />
           </i>
          </button>
        )
      }
      <button className={`follow  radius-50 cursor-pointer ${followState ? "orange-btn" : "orange-border-btn"}`} onClick={handleFollow}>{followState  ? "正在跟隨" : "跟隨"}</button>
    </>
  )
}

const PersonSwitchBar = ({onClick}) => {
  return(
    <div className="page-tab">
      {
        PersonalSwitchData.map((tag) => {
          return(
            <div key={tag.id}>
              <input type="radio" class="tab-input" id={tag.id} name="main" defaultChecked={tag.id === "tweet"} onClick={onClick} value={tag.id}/>
              <label htmlFor={tag.id} class="tab-label cursor-pointer">{tag.name}</label>
            </div>
          )
        })
      }
    </div>
  )
}

const UserProfileTwiReply = ({datas}) => {
  const replyTweet = datas.map((tweet) => {
    return(
      <div className="tweet-item" key={tweet.id}>
        <img src={tweet.User.avatar} alt="" />
        <div className="tweet-info">
          <div className="name-group">
            <span className="name">{tweet.User.name}</span>
            <span className="account">@{tweet.User.account}</span>
            <span className="time"> &#183; {TransferTime(tweet.updatedAt)}</span>
          </div>
          <Link to={`/twiItem/${tweet.TweetId}`}>
            <p className="reply-to">回覆 <span>@{tweet.Tweet.account}</span></p>
            <p className="content">
              {tweet.comment}
            </p>
          </Link>
        </div>
      </div>
    )
  })
  return(
    <div className="tweet-list">
      {replyTweet}
    </div>
  )
}

const UserProfileLike = ({datas, onLike}) => {
  const [popupcontent, setpopupcontent] = useState([])
  const [ popupToggle, setPopupToggle ] = useState(false)
  const { currentMember } = useAuth();

  const changecontent = (data) => {
    setpopupcontent([data])
    setPopupToggle(!popupToggle)
  }
  const handleClose = () => {
    setPopupToggle(false)
  }
  const likeTweet = datas.map((tweet) => {
    console.log(tweet)
    return (
      <div className="tweet-item" key={tweet.id}>
        <Link to={tweet.UserId!== currentMember?.id ? `/otherUser/${tweet.UserId}`:`/user`}>
          <img src={tweet.Tweet.avatar} alt="" />
        </Link>
        <div className="tweet-info">
          <div className="name-group">
            <span className="name">{tweet.Tweet.name}</span>
            <span className="account">@{tweet.Tweet.account}</span>
            <span className="time"> &#183; {TransferTime(tweet.Tweet.updatedAt)}</span>
          </div>
          <Link to={`/twiItem/${tweet.id}`}>
            <p className="content">
              {tweet.Tweet.description}
            </p>
          </Link>
          <div className="icon-group">
            <button className="comment btn-reset cursor-pointer" onClick={() => changecontent(tweet)}><i><CommentIcon/></i>{tweet.Tweet.RepliesCount}</button>
            <button className={`like btn-reset cursor-pointer`} onClick={() =>{ 
              onLike?.(tweet.id)
            }}>
              {tweet.Tweet.isLiked ? (<i className="like-solid"><LikeSolidIcon/></i>) : (<i className="normal"> <LikeIcon/></i>)}
            {tweet.Tweet.LikesCount}</button>
          </div>
        </div>
      </div>
    )
  })


  return(
    <>
      <div className="tweet-list">
        {likeTweet}
      </div>
      {popupToggle && <ReplyLikeTwiPopUp data={popupcontent} onClick={changecontent} handleClose={handleClose}/>}
    </>
    
  )
}

const PersonalPageSwitch = ({value, tweetDatas, replyDatas, likeDatas, onTweetLike, onLikeLike}) => {
  
  if(value === 'tweet') return <UserProfileTwi datas={tweetDatas}  onLike={(id) =>{onTweetLike?.(id)}}/>
  if(value === 'reply') return <UserProfileTwiReply datas={replyDatas}/>
  if(value === 'like') return <UserProfileLike datas={likeDatas} onLike={(id) =>{onLikeLike?.(id)}}/>
}

const Personal = ({onClick, id, name, account, introduction, cover, avatar, tweetDatas, replyDatas, likeDatas, followerNum, followingNum, onLike}) => {
  const [currentValue, setCurrentValue] = useState('tweet')
  // const [editIsOpen, setEditIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState([]);
  const {currentMember} = useAuth();
  const userId = currentMember?.id

  const handlePageClick = (e) => {
    setCurrentValue(e.target.value)
  }
  
  const handleTweetLike = async(id) => {
    // console.log(id)
    const currentTweet =  tweetDatas.find((tweet) => tweet.id === id)

    if(currentTweet.isLiked === false){
      try{
      const data = await likeTweet(id, {
        isLiked: true
      })
      console.log(data.message)
      if(data.status === 'error'){
        Swal.fire({
          position: 'top',
          title: data.message,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        })
        return
      }
      // if(data.message === '')
      } catch (error) {
        console.error(error)
      }
    } else if (currentTweet.isLiked === true){
      try{
        const data = await unlikeTweet(id, {isLiked: false})
        if(data.status === 'error'){
          Swal.fire({
            position: 'top',
            title: data.message,
            timer: 1000,
            icon: 'error',
            showConfirmButton: false,
          })
          return
        }
      } catch(error){
        console.error(error)
      }
    }
  }

  const handleLikeLike = async(id) => {
    // console.log(id)
    const currentTweet =  likeDatas.find((tweet) => tweet.id === id)
    console.log(currentTweet.Tweet)
    if(currentTweet.Tweet.isLiked === false){
      try{
      const data = await likeTweet(id)
      console.log(data.message)
      if(data.status === 'error'){
        Swal.fire({
          position: 'top',
          title: data.message,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        })
        return
      }
      // if(data.message === '')
      } catch (error) {
        console.error(error)
      }
    } else if (currentTweet.Tweet.isLiked === true){
      try{
        const data = await unlikeTweet(id)
        console.log(data)
        if(data.status === 'error'){
          Swal.fire({
            position: 'top',
            title: data.message,
            timer: 1000,
            icon: 'error',
            showConfirmButton: false,
          })
          return
        }
      } catch(error){
        console.error(error)
      }
    }
  }
  
  
  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data.data)
      // console.log(data.data)
    }
    
    getUserAsync()
    // getUserTwiLikeAsync()
  }, [currentMember])

  return(
    <section className="person middle-container-border">
      <div className="back-bar">
        <Link to="/main" className="back-link">
          <span className="back-icon"><BackArrowIcon/></span>
          <div className="title-group">
            <p className="name">{name}</p>
            <p className="tweet-num"><span>{tweetDatas.length}</span> 推文</p>
          </div>
        </Link>
      </div>
      <div className="personal-area">
        <img src={cover} alt="" className="personal-bg-img"/>
        <img src={avatar} alt="" className="personal-img" />
        <div className="btn-group" data-user="other">
          {/* {currentMember.id ? <EditProfileModal props={userInfo}/>: <button>
              you
            </button>} */}
            <EditProfileModal props={userInfo}/> 
        </div>
        <div className="personal-info">
          <div className="personal-info-name-group">
            <h5 className="name">{name}</h5>
            <p className="account">@{account}</p>
          </div>
          <p className="personal-intro">{introduction}</p>
          <div className="personal-follow-group">
            <Link 
              to={`/personalDetail/${userId}`} 
              className="follower"
            ><span>{followerNum} 個</span>跟隨中
            </Link>
            <Link 
              to={`/personalDetail/${userId}`}  
              className="following"
            ><span>{followingNum}個</span>跟隨者
            </Link>
          </div>
        </div>
      </div>
      <PersonSwitchBar onClick={handlePageClick}/>
      <PersonalPageSwitch value={currentValue} tweetDatas={tweetDatas} likeDatas={likeDatas} replyDatas={replyDatas} onTweetLike={handleTweetLike} onLikeLike={handleLikeLike}/>
    </section>
  )
}

const OtherPersonal = ({onClick, id, name, account, introduction, cover, avatar, tweetDatas, replyDatas, likeDatas, followerNum, followingNum, onLike}) => {
  const [currentValue, setCurrentValue] = useState('tweet')
  // const [editIsOpen, setEditIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState([]);
  const {currentMember} = useAuth();
  const userId = currentMember?.id

  const handlePageClick = (e) => {
    setCurrentValue(e.target.value)
  }
  
  const handleTweetLike = async(id) => {
    // console.log(id)
    const currentTweet =  tweetDatas.find((tweet) => tweet.id === id)

    if(currentTweet.isLiked === false){
      try{
      const data = await likeTweet(id, {
        isLiked: true
      })
      console.log(data.message)
      if(data.status === 'error'){
        Swal.fire({
          position: 'top',
          title: data.message,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        })
        return
      }
      // if(data.message === '')
      } catch (error) {
        console.error(error)
      }
    } else if (currentTweet.isLiked === true){
      try{
        const data = await unlikeTweet(id, {isLiked: false})
        if(data.status === 'error'){
          Swal.fire({
            position: 'top',
            title: data.message,
            timer: 1000,
            icon: 'error',
            showConfirmButton: false,
          })
          return
        }
      } catch(error){
        console.error(error)
      }
    }
  }

  const handleLikeLike = async(id) => {
    // console.log(id)
    const currentTweet =  likeDatas.find((tweet) => tweet.id === id)
    console.log(currentTweet.Tweet)
    if(currentTweet.Tweet.isLiked === false){
      try{
      const data = await likeTweet(id)
      console.log(data.message)
      if(data.status === 'error'){
        Swal.fire({
          position: 'top',
          title: data.message,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        })
        return
      }
      // if(data.message === '')
      } catch (error) {
        console.error(error)
      }
    } else if (currentTweet.Tweet.isLiked === true){
      try{
        const data = await unlikeTweet(id)
        console.log(data)
        if(data.status === 'error'){
          Swal.fire({
            position: 'top',
            title: data.message,
            timer: 1000,
            icon: 'error',
            showConfirmButton: false,
          })
          return
        }
      } catch(error){
        console.error(error)
      }
    }
  }
  
  
  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data.data)
      // console.log(data.data)
    }
    getUserAsync()
    // getUserTwiLikeAsync()
  }, [currentMember])

  return(
    <section className="person middle-container-border">
      <div className="back-bar">
        <Link to="/main" className="back-link">
          <span className="back-icon"><BackArrowIcon/></span>
          <div className="title-group">
            <p className="name">{name}</p>
            <p className="tweet-num"><span>{tweetDatas.length}</span> 推文</p>
          </div>
        </Link>
      </div>
      <div className="personal-area">
        <img src={cover} alt="" className="personal-bg-img"/>
        <img src={avatar} alt="" className="personal-img" />
        <div className="btn-group" data-user="other">
          {/* {currentMember.id ? <EditProfileModal props={userInfo}/>: <button>
              you
            </button>} */}
          <OtherBtnGroup item={userInfo} /> 
        </div>
        <div className="personal-info">
          <div className="personal-info-name-group">
            <h5 className="name">{name}</h5>
            <p className="account">@{account}</p>
          </div>
          <p className="personal-intro">{introduction}</p>
          <div className="personal-follow-group">
            <Link 
              to={`/personalDetail/${id}`} 
              className="follower"
            ><span>{followerNum} 個</span>跟隨中
            </Link>
            <Link 
              to={`/personalDetail/${id}`}  
              className="following"
            ><span>{followingNum}個</span>跟隨者
            </Link>
          </div>
        </div>
      </div>
      <PersonSwitchBar onClick={handlePageClick}/>
      <PersonalPageSwitch 
        value={currentValue} 
        tweetDatas={tweetDatas} 
        likeDatas={likeDatas} 
        replyDatas={replyDatas} 
        onTweetLike={handleTweetLike} 
        onLikeLike={handleLikeLike}
      />
    </section>
  )
}

export { Personal, OtherPersonal, UserProfileTwiReply };


