import { BackArrowIcon, CommentIcon, LikeIcon, LikeSolidIcon } from "assets/icons";
import { UserProfileTwiReply } from "components";
import { Link, useParams } from 'react-router-dom';
import {getSingleTwi, getSingleTwiReply} from 'api/userInfo'
import { useEffect, useState } from "react";

import { MakeTime } from "components/utilities/MakeTime";
import { TransferTime } from "components/utilities/TransferTime";


const TwiItemArea = () => {
  const id = useParams()
  // console.log(id.id)

  const [singleTwi, setSingleTwi] = useState([])
  const [singleReply, setSingleReply] = useState([])

  useEffect(() => {
    const getSingleTwiAsync = async() => {
      const data = await getSingleTwi(id.id)
      // console.log(data)
      setSingleTwi(data)
    }
    const getSingleTwiReplyAsync = async()=>{
      const data = await getSingleTwiReply(id.id)
      setSingleReply(data)
      console.log(data)
    }

    getSingleTwiAsync()
    getSingleTwiReplyAsync()
  },[id])

  const replyList = singleReply.map((tweet) => {
    return(
      <div className="tweet-list" key={tweet.id}>
        <div className="tweet-item">
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
      </div>
    )
  })


  return(
    <section className="twi-item middle-container-border">
      <div className="back-bar">
        <Link to="/main" className="back-link">
          <span className="back-icon"><BackArrowIcon/></span>
          <div className="title-group">
            <p className="name">推文</p>
          </div>
        </Link>
      </div>
      <div className="twi-item-body">
        <div className="twi-item-user">
          <img src="" alt="" className="twi-item-img" />
          <div className="twi-item-name-group">
            <a herf="" className="twi-item-name">{singleTwi.User?.name}</a>
            <p className="twi-item-account">@<span>{singleTwi.User?.account}</span></p>
          </div>
        </div>
        <div className="twi-item-content-group">
          <p className="twi-item-content">
            {singleTwi.description}
          </p>
          <p className="twi-item-time">{MakeTime(singleTwi.updatedAt)}</p>
        </div>
        <div className="twi-item-interac-group">
          <span className="reply"><span>{singleTwi.RepliesCount}</span> 回復</span>
          <span className="like"><span>{singleTwi.LikesCount}</span> 喜歡次數</span>
        </div>
        <div className="twi-item-icon-group">
          <a className="rpely"><CommentIcon/></a>
          <button className={`like btn-reset cursor-pointer`}>
            {singleTwi.isLiked ? (<i className="like-solid"><LikeSolidIcon/></i>) : (<i className="normal"> <LikeIcon/></i>)}</button>
        </div>
      </div>
      {replyList}
      {/* <UserProfileTwiReply/> */}
    </section>
  )
}

export default TwiItemArea;