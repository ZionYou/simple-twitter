import { BackArrowIcon, CommentIcon, LikeIcon, LikeSolidIcon } from "assets/icons";
import { UserProfileTwiReply } from "components";
import { Link, useParams } from 'react-router-dom';
import {getSingleTwi, getSingleTwiReply, likeTweet, unlikeTweet} from 'api/userInfo'
import { useEffect, useState } from "react";
import { useAuth } from 'contexts/AuthContext';
import { ReplyTwiPopUp } from 'components';

import { MakeTime } from "components/utilities/MakeTime";
import { TransferTime } from "components/utilities/TransferTime";
import Swal from 'sweetalert2';

const TwiItemArea = () => {
  const id = useParams()
  // console.log(id.id)
  
  const [singleTwi, setSingleTwi] = useState([])
  const [singleReply, setSingleReply] = useState([])

  const [popupcontent, setpopupcontent] = useState([])
  const [ popupToggle, setPopupToggle ] = useState(false)

  const { currentMember } = useAuth();

  const changecontent = (data) => {
    setpopupcontent([data])
    setPopupToggle(!popupToggle)
  }

  // console.log(singleTwi)
  let isLiked = singleTwi.isLiked
  let tweetId = singleTwi.id
  // console.log(isLiked, tweetId)

  const handleLike = async () => {
    if(isLiked === false){
      try{
      const data = await likeTweet(tweetId)
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
    } else if (isLiked === true){
      try{
        const data = await unlikeTweet(tweetId)
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
    const getSingleTwiAsync = async() => {
      const data = await getSingleTwi(id.id)
      // console.log(data)
      setSingleTwi(data)
    }
    const getSingleTwiReplyAsync = async()=>{
      const data = await getSingleTwiReply(id.id)
      setSingleReply(data)
      // console.log(data)
    }

    getSingleTwiAsync()
    getSingleTwiReplyAsync()
  },[id])

  // console.log(singleTwi)
  // console.log(singleTwi.user)

  const replyList = singleReply.map((tweet) => {
    return(
      <div className="tweet-list" key={tweet.id}>
        <div className="tweet-item">
          <Link to={tweet.User.id !== currentMember?.id ? `/otherUser/${tweet.User.id}`:`/user`}>
          <img src={tweet.User.avatar} alt="" />
          </Link>
          <div className="tweet-info">
            <div className="name-group">
              <span className="name">{tweet.User.name}</span>
              <span className="account">@{tweet.User.account}</span>
              <span className="time"> &#183; {TransferTime(tweet.updatedAt)}</span>
            </div>
            <p className="reply-to">回覆 <span>@{tweet.User.account}</span></p>
            <p className="content">
              {tweet.comment}
            </p>
          </div>
        </div>
      </div>
    )
  })

  return(
    <>
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
            <a herf="" className="twi-item-name">{singleTwi.user?.name}</a>
            <p className="twi-item-account">@<span>{singleTwi.user?.account}</span></p>
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
          <button className="comment btn-reset cursor-pointer" onClick={() => changecontent(singleTwi)}><i><CommentIcon/></i></button>
          <button className={`like btn-reset cursor-pointer`} onClick={handleLike}>
            {singleTwi.isLiked ? (<i className="like-solid"><LikeSolidIcon/></i>) : (<i className="normal"> <LikeIcon/></i>)}</button>
        </div>
      </div>
      {replyList}
      {/* <UserProfileTwiReply/> */}
    </section>
    {popupToggle && <ReplyTwiPopUp data={popupcontent} onClick={changecontent} handleClose={() => setPopupToggle(false)}/>}
    </>
  )
}

export default TwiItemArea;
