import { BackArrowIcon, CommentIcon, LikeSolidIcon } from "assets/icons";
import { UserProfileTwi, ReplyLikeTwiPopUp } from "components";
import { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from 'contexts/AuthContext';
import {EditProfileModal} from 'components/Main/Popup'
import { TransferTime } from "components/utilities/TransferTime";
import {getUser} from 'api/userInfo'

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
          <p className="reply-to">回覆 <span>@{tweet.Tweet.account}</span></p>
          <p className="content">
            {tweet.comment}
          </p>
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


const UserProfileLike = ({datas}) => {
  const [popupcontent, setpopupcontent] = useState([])
  const [ popupToggle, setPopupToggle ] = useState(false)

  const changecontent = (data) => {
    setpopupcontent([data])
    setPopupToggle(!popupToggle)
  }
  const handleClose = () => {
    setPopupToggle(false)
  }

  const likeTweet = datas.map((tweet) => {
    return (
      <div className="tweet-item" key={tweet.id}>
        <img src={tweet.Tweet.avatar} alt="" />
        <div className="tweet-info">
          <div className="name-group">
            <span className="name">{tweet.Tweet.name}</span>
            <span className="account">@{tweet.Tweet.account}</span>
            <span className="time"> &#183; {TransferTime(tweet.Tweet.updatedAt)}</span>
          </div>
          <p className="content">
            {tweet.Tweet.description}
          </p>
          <div className="icon-group">
            <button className="comment btn-reset cursor-pointer" onClick={() => changecontent(tweet)}><i><CommentIcon/></i>{tweet.Tweet.RepliesCount}</button>
            <div className="like-solid"><i><LikeSolidIcon/></i>{tweet.Tweet.LikesCount}</div>
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

const PersonalPageSwitch = ({value, tweetDatas, replyDatas, likeDatas}) => {
  if(value === 'tweet') return <UserProfileTwi datas={tweetDatas}/>
  if(value === 'reply') return <UserProfileTwiReply datas={replyDatas}/>
  if(value === 'like') return <UserProfileLike datas={likeDatas}/>
}



const Personal = ({onClick, name, account, introduction, cover, avatar, tweetDatas, replyDatas, likeDatas, followerNum, followingNum}) => {
  const [currentValue, setCurrentValue] = useState('tweet')
  // const [editIsOpen, setEditIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState([]);
  
  const {currentMember} = useAuth();
  const userId = currentMember?.id

  const handlePageClick = (e) => {
    setCurrentValue(e.target.value)
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
          <EditProfileModal props={userInfo}/>
        </div>
        <div className="personal-info">
          <div className="personal-info-name-group">
            <h5 className="name">{name}</h5>
            <p className="account">@{account}</p>
          </div>
          <p className="personal-intro">{introduction}</p>
          <div className="personal-follow-group">
            <Link to="/personalDetail" className="follower"><span>{followerNum} 個</span>跟隨中</Link>
            <Link to="/personalDetail" className="following"><span>{followingNum} 個</span>跟隨者</Link>
          </div>
        </div>
      </div>
      <PersonSwitchBar onClick={handlePageClick}/>
      <PersonalPageSwitch value={currentValue} tweetDatas={tweetDatas} likeDatas={likeDatas} replyDatas={replyDatas}/>
    </section>
  )
}

export { Personal, UserProfileTwiReply };


