import { BackArrowIcon, CommentIcon, LikeSolidIcon } from "assets/icons";
import { UserProfileTwi } from "components";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from 'contexts/AuthContext';
import { getUser, getUserTwi } from 'api/userInfo';

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

const TweetListData = [
  {
    id: 1,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 2,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 3,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 4,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 5,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 6,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
]

const ReplyTweetData = [
  {
    id: 1,
    other_user: "apple",
    edit_time: "3 小時",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
  {
    id: 2,
    other_user: "apple",
    edit_time: "3 小時",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
  {
    id: 3,
    other_user: "apple",
    edit_time: "3 小時",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
  {
    id: 4,
    other_user: "apple",
    edit_time: "3 小時",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
  {
    id: 5,
    other_user: "apple",
    edit_time: "3 小時",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
]

const LikeTweetData = [
  {
    id: 1,
    other_user: "apple",
    other_account: "apple",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
  {
    id: 2,
    other_user: "apple",
    other_account: "apple",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
  {
    id: 3,
    other_user: "apple",
    other_account: "apple",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
  {
    id: 4,
    other_user: "apple",
    other_account: "apple",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
  },
  {
    id: 5,
    other_user: "apple",
    other_account: "apple",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla. Donec tortor augue, rutrum rhoncus dui vitae, aliquam molestie elit. Nullam fermentum elementum libero, vel laoreet mi rutrum facilisis. Donec vitae turpis maximus, finibus odio at, facilisis leo. Proin urna velit, efficitur a ornare vel, elementum quis leo."
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
              <label for={tag.id} class="tab-label cursor-pointer">{tag.name}</label>
            </div>
          )
        })
      }
    </div>
  )
}


const TweetReplyListItem = ({tweet}) => {
  return(
    <div className="tweet-item">
      <img src="https://picsum.photos/300/300?text=1200" alt="" />
      <div className="tweet-info">
        <div className="name-group">
          <span className="name">John Doe</span>
          <span className="account">@heyjohn</span>
          <span className="time"> &#183; {tweet.edit_time}</span>
        </div>
        <p className="reply-to">回覆 <span>@{tweet.other_user}</span></p>
        <p className="content">
          {tweet.content}
        </p>
      </div>
    </div>
  )
}

const UserProfileTwiReply = () => {
  return(
    <div className="tweet-list">
      {
        ReplyTweetData.map((tweet) => {
          return <TweetReplyListItem tweet={tweet} key={tweet.id}/>
        })
      }
    </div>
  )
}

const TweetLikeListItem = ({tweet}) => {
  return(
    <div className="tweet-item">
      <img src={`https://picsum.photos/300/300?text=${tweet.id}`} alt="" />
      <div className="tweet-info">
        <div className="name-group">
          <span className="name">{tweet.other_user}</span>
          <span className="account">@{tweet.other_account}</span>
          <span className="time"> &#183; {tweet.edit_time}</span>
        </div>
        <p className="content">
          {tweet.content}
        </p>
        <div className="icon-group">
          <div className="comment"><i><CommentIcon/></i>{tweet.commentNum}</div>
          <div className="like-solid"><i><LikeSolidIcon/></i>{tweet.likeNum}</div>
        </div>
      </div>
    </div>
  )
}

const UserProfileLike = () => {
  return(
    <div className="tweet-list">
      {
        LikeTweetData.map((tweet) => {
          return <TweetLikeListItem tweet={tweet} key={tweet.id}/>
        })
      }
    </div>
  )
}

const PersonalPageSwitch = ({value, tweetDatas}) => {
  if(value === 'tweet') return <UserProfileTwi datas={tweetDatas}/>
  if(value === 'reply') return <UserProfileTwiReply/>
  if(value === 'like') return <UserProfileLike/>
}



const Personal = ({onClick}) => {
  const [currentValue, setCurrentValue] = useState('tweet')
  // const [editIsOpen, setEditIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState([]);
  const [userTweet, setUserTweets] = useState([])
  const {currentMember} = useAuth();
  
  const userId = currentMember.id
  // console.log(currentMember)
  // console.log(currentMember.id)

  const handlePageClick = (e) => {
    setCurrentValue(e.target.value)
  }
  

  useEffect(() => {
    const getUserAsync = async () => {
      const {success, data, message} = await getUser(userId)

      if(success){
        setUserInfo(data)
        // console.log(data)
      } else {
        console.error(message)
      }
      
      // setUserInfo(users);
    }
    const getUserTwiAsync = async () => {
      const {success, data, message} = await getUserTwi(userId)
      if(success){
        setUserTweets(data.map((data) => ({...data})))
        // console.log(data)
      } else {
        console.error(message)
      }
    }
    getUserAsync()
    getUserTwiAsync()
  }, [currentMember])

  // console.log(userInfo)
  // let tweetNum = userInfo.Tweet.length
  // let followerNum = userInfo.follower.length


  return(
    <section className="person middle-container-border">
      {/* {
        userInfo.map((user) => {
          return(
            <> */}
              <div className="back-bar">
                <Link to="/main" className="back-link">
                  <span className="back-icon"><BackArrowIcon/></span>
                  <div className="title-group">
                    <p className="name">{userInfo.name}</p>
                    <p className="tweet-num"><span>10 </span> 推文</p>
                  </div>
                </Link>
              </div>
              <div className="personal-area">
                <img src={userInfo.cover} alt="" className="personal-bg-img"/>
                <img src={userInfo.avatar} alt="" className="personal-img" />
                <div className="btn-group" data-user="other">
                  <button className="orange-border-btn radius-50 cursor-pointer" onClick={onClick}>編輯個人資料</button>
                </div>
                <div className="personal-info">
                  <div className="personal-info-name-group">
                    <h5 className="name">{userInfo.name}</h5>
                    <p className="account">@{userInfo.account}</p>
                  </div>
                  <p className="personal-intro">{userInfo.introduction}</p>
                  <div className="personal-follow-group">
                    <Link to="/personalDetail" className="follower"><span>10 個</span>跟隨中</Link>
                    <Link to="/personalDetail" className="following"><span>10 個</span>跟隨者</Link>
                  </div>
                </div>
              </div>
            {/* </>
          )
        })
      } */}
      
      <PersonSwitchBar onClick={handlePageClick}/>
      <PersonalPageSwitch value={currentValue} tweetDatas={userTweet}/>
    </section>
  )
}

export { Personal, UserProfileTwiReply };