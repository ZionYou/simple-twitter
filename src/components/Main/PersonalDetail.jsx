import { BackArrowIcon } from "assets/icons";
import { useState } from 'react';
import { Link } from 'react-router-dom'


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

const PersonalFollowerData = [
  {
    id: 1,
    user_name: "user1",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: true,
  },
  {
    id: 2,
    user_name: "user2",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: true,
  },
  {
    id: 3,
    user_name: "user3",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: false,
  },
  {
    id: 4,
    user_name: "user3",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: false,
  },
  {
    id: 5,
    user_name: "user3",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: false,
  },
  {
    id: 6,
    user_name: "user3",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: false,
  },
]

const PersonalFollowingData = [
  {
    id: 1,
    user_name: "user1",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: true,
  },
  {
    id: 2,
    user_name: "user2",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: true,
  },
  {
    id: 3,
    user_name: "user3",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: true,
  },
  {
    id: 4,
    user_name: "user3",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: true,
  },
  {
    id: 5,
    user_name: "user3",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: true,
  },
  {
    id: 6,
    user_name: "user3",
    user_intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh est, finibus ac dolor et, volutpat ullamcorper nibh. Etiam vitae viverra neque. Nulla consectetur eleifend hendrerit. Sed congue turpis porta velit dignissim sodales. Morbi ultrices venenatis finibus. Pellentesque sit amet lectus vestibulum lectus volutpat suscipit ac ac tortor. Proin ac.",
    isFollowed: true,
  },
]

const PersonDetailSwitchBar = ({onClick}) => {
  return(
    <div className="page-tab">
      {
        PersonalDetailSwitchData.map((tag) => {
          return(
            <div key={tag.id}>
              <input type="radio" class="tab-input" id={tag.id} name="main" defaultChecked={tag.id === "follower"} onClick={onClick} value={tag.id}/>
              <label for={tag.id} class="tab-label">{tag.name}</label>
            </div>
          )
        })
      }
    </div>
  )
}

const PersonalFollowItem = ({follow}) => {
  return(
    <div className="personal-follow-item">
      <img src={`https://picsum.photos/300/300?text=${follow.id}`} alt="" />
      <div className="personal-follow-info">
        <div className="personal-title">
          <span className="name">{follow.user_name}</span>
          <button className={`radius-50 ${follow.isFollowed ? "orange-btn" : "orange-border-btn"}`}>{follow.isFollowed ? "正在跟隨" : "跟隨"}</button>
        </div>
        <p className="content">
          {follow.user_intro}
        </p>
      </div>
    </div>
  )
}

const PersonalFollowerList = () => {
  return(
    <div className="personal-follower-list">
      {
        PersonalFollowerData.map((follow) => {
          return <PersonalFollowItem follow={follow} key={follow.id}/>
        })
      }
    </div>
  )
}

const PersonalFollowingList = () => {
  return(
    <div className="personal-following-list">
      {
        PersonalFollowingData.map((follow) => {
          return <PersonalFollowItem follow={follow} key={follow.id}/>
        })
      }
    </div>
  )
}

const PersonalFollowPageSwitch = ({value}) => {
  if(value === 'follower') return <PersonalFollowerList/>
  if(value === 'following') return <PersonalFollowingList/>
}

// 追隨動態元件
const PersonalDetail = () => {
  const [currentFollowValue, setCurrentFollowValue] = useState('follower')

  const handleFollowPageClick = (e) => {
    setCurrentFollowValue(e.target.value)
  }
  return(
    <section className="personal-detail middle-container-border">
      <div className="back-bar">
        <Link to="/user" className="back-link">
          <span className="back-icon"><BackArrowIcon/></span>
          <div className="title-group">
            <p className="name">John Doe</p>
            <p className="tweet-num"><span>25</span> 推文</p>
          </div>
        </Link>
      </div>
      <PersonDetailSwitchBar onClick={handleFollowPageClick}/>
      <PersonalFollowPageSwitch value={currentFollowValue}/>
    </section>
  )
}
export default PersonalDetail;