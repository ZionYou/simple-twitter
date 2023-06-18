import { BackArrowIcon } from "assets/icons";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
// import { useParams} from "react-router";
import { useAuth } from 'contexts/AuthContext';
import { followOther, unfollowOther} from "api/userInfo";

const PersonalDetailSwitchData = [
  {
    id: "follower",
    name: "追隨者",
  },
  {
    id: "following",
    name: "正在追隨",
  },
]

// const PersonalFollowerData = [
//   {
//     id: 1,
//     user_name: "user1",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: true,
//   },
//   {
//     id: 2,
//     user_name: "user2",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: true,
//   },
//   {
//     id: 3,
//     user_name: "user3",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: false,
//   },
//   {
//     id: 4,
//     user_name: "user3",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: false,
//   },
//   {
//     id: 5,
//     user_name: "user3",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: false,
//   },
//   {
//     id: 6,
//     user_name: "user3",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: false,
//   },
// ]

// const PersonalFollowingData = [
//   {
//     id: 1,
//     user_name: "user1",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: true,
//   },
//   {
//     id: 2,
//     user_name: "user2",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: true,
//   },
//   {
//     id: 3,
//     user_name: "user3",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: true,
//   },
//   {
//     id: 4,
//     user_name: "user3",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: true,
//   },
//   {
//     id: 5,
//     user_name: "user3",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: true,
//   },
//   {
//     id: 6,
//     user_name: "user3",
//     user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
//     isFollowed: true,
//   },
// ]

const PersonDetailSwitchBar = ({onClick}) => {
  return(
    <div className="page-tab">
      {
        PersonalDetailSwitchData.map((tag) => {
          return(
            <div key={tag.id}>
              <input type="radio" className="tab-input" id={tag.id} name="main" defaultChecked={tag.id === "follower"} onClick={onClick} value={tag.id}/>
              <label for={tag.id} class="tab-label">{tag.name}</label>
            </div>
          )
        })
      }
    </div>
  )
}

const PersonalFollowItem = ({follow}) => {
  let isFollow = follow.isFollowed
  const [followState, setFollowState] = useState(isFollow)
  // console.log(isFollow)
  const {currentMember} = useAuth()

  const handleFollow = async () => {
    console.log(isFollow)
    console.log(followState)
    if(followState === true) {
      setFollowState(false)
      try{
        const data = await unfollowOther(follow.id)
        // console.log(data.message)
        console.log(data)
      } catch (error){
        console.error(error)
      }
    } else if (followState === false){
      if(follow.id === currentMember.id) return
      setFollowState(true)
      try{
        const data = await followOther(follow.id)
        console.log(data)
      } catch(error){
        console.error(error)
      }
    }
  }

  return(
    <div className="personal-follow-item">
      <Link to={follow.id !== currentMember?.id ? `/otherUser/${follow.id}`:`/user`}>
        <img src={`${follow.avatar}`} alt="" />
      </Link>
      <div className="personal-follow-info">
        <div className="personal-title">
          <span className="name">{follow.name}</span>
          <button className={`radius-50 cursor-pointer ${followState ? "orange-btn" : "orange-border-btn"}`} onClick={handleFollow}>{followState ? "正在跟隨" : "跟隨"}</button>
        </div>
        <p className="content">
          {follow.introduction}
        </p>
      </div>
    </div>
  )
}

const PersonalFollowerList = ({ datas}) => {
  
  const userFollowers = datas.map((data) => {
    return(
      <>
        <PersonalFollowItem follow={data} key={data.followingId}/>
      </>
    )
  })

  return(
    <div className="personal-follower-list">
      { userFollowers }
    </div>
  )
}

const PersonalFollowingList = ({ datas }) => {

  const userFollowings = datas.map((data) => {
    return(
      <>
        <PersonalFollowItem follow={data} key={data.id}/>
      </>
    )
  })

  return(
    <div className="personal-following-list">
      { userFollowings  }
    </div>
  )
}

const PersonalFollowPageSwitch = ({value, followers, followings}) => {
  if(value === 'follower') return <PersonalFollowerList datas={followers}/>
  if(value === 'following') return <PersonalFollowingList datas={followings}/>
}

// 追隨動態元件
const PersonalDetail = ({ name, tweetDatas ,followers, followings }) => {
  const [currentFollowValue, setCurrentFollowValue] = useState('follower')
  const {currentMember} = useAuth()
  const id = useParams ()

  const handleFollowPageClick = (e) => {
    setCurrentFollowValue(e.target.value)
  }
  return(
    <section className="personal-detail middle-container-border">
      <div className="back-bar">
        <Link to={id.id !== currentMember?.id ? `/otherUser/${id.id}`:`/user`} className="back-link">
          <span className="back-icon"><BackArrowIcon/></span>
          <div className="title-group">
            <p className="name">{name}</p>
            <p className="tweet-num"><span>{tweetDatas.length}</span> 推文</p>
          </div>
        </Link>
      </div>
      <PersonDetailSwitchBar onClick={handleFollowPageClick}/>
      <PersonalFollowPageSwitch 
        value={currentFollowValue}
        followers={followers} 
        followings={followings}
      />
    </section>
  )
}
export default PersonalDetail;