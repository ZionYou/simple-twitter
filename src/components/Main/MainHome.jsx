import { CommentIcon, LikeIcon, LikeSolidIcon, CloseIcon } from "assets/icons";
import { useEffect, useState, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
import { creatNewTwi, getUser } from 'api/userInfo';
import { useAuth } from 'contexts/AuthContext';
import { ReplyTwiPopUp, NewTwiPopUp } from 'components';
import { Container, Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import { TransferTime } from "components/utilities/TransferTime";
import {Link} from 'react-router-dom';


import { likeTweet, unlikeTweet, getUserTwi } from "api/userInfo";

const UserProfileTwi = ({datas, onLike}) => {
  const [popupcontent, setpopupcontent] = useState([])
  const [ popupToggle, setPopupToggle ] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const { currentMember } = useAuth();
  const changecontent = (data) => {
    setpopupcontent([data])
    setPopupToggle(!popupToggle)
  }

  const handleClose = () => {
    setPopupToggle(false)
  }

  // const handleLike = (id) => {
  //   // alert(id)
  //   const getData = datas.filter((data) => data.id === id)
  //   console.log(getData)
  //   if(getData){
  //     setIsLike((prevState) => !prevState)
  //   }
  // }

  // console.log(datas)

  const userTweets = datas.map((data) => {
    return(
      <div className="tweet-item" key={data.id}>
        <Link to={data.UserId !== currentMember?.id ? `/otherUser/${data.id}`:`/user`}>
          <img src={data.User.avatar} alt="" />
        </Link>
        
        <div className="tweet-info">
          <div className="name-group">
            <span className="name">{data.User.name}</span>
            <span className="account">@{data.User.account}</span>
            <span className="time"> &#183; {TransferTime(data.updatedAt)}</span>
          </div>
          <Link to={`/twiItem/${data.id}`}>
            <p className="content">
              {data.description}
            </p>
          </Link>
          <div className="icon-group">
            <button className="comment btn-reset cursor-pointer" onClick={() => changecontent(data)}><i><CommentIcon/></i>{data.RepliesCount}</button>
            <button className={`like btn-reset cursor-pointer`} onClick={() =>{ 
              onLike?.(data.id)
            }}>
              {data.isLiked ? (<i className="like-solid"><LikeSolidIcon/></i>) : (<i className="normal"> <LikeIcon/></i>)}
            {data.LikesCount}</button>
          </div>
        </div>
      </div>
    )
  })
  return(
    <>
      <div className="tweet-list">
        {userTweets}
      </div>
      {popupToggle && <ReplyTwiPopUp data={popupcontent} onClick={changecontent} handleClose={handleClose}/>}
    </>
  )
}

const MainHome = () => {
  // const [userTweets, setUserTweets] = useState([])
  const [isPopup, setIsPopup] = useState(false)
  const [isError, setIsError] = useState(false)
  const [tweet, setTweet] = useState('')
  const [isLiked, setIsLiked] = useState('')
  const [userTweets, setUserTweets] = useState([])
  const { currentMember } = useAuth();
  const userId = currentMember?.id
  
  const handleClick = async() => {
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

  const handleLike = async (id) => {
    // console.log(id)
    const currentTweet = userTweets.find((tweet) => tweet.id === id)
    console.log(currentTweet)
    console.log(currentTweet.isLiked)
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
        setIsLiked(!currentTweet.isLiked)
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
    const getUserTwiAsync = async () => {
      const data = await getUserTwi(userId)
      // const userTweets = data.data
      setUserTweets(data.data)
    }
    getUserTwiAsync()
  }, [currentMember])
  
  // console.log(userTweets)

  return(
    <section className="home middle-container-border" data-page="main-home">
      <div className="title-section">
        <h5 className="sub-title">首頁</h5>
        <div className="input-group cursor-pointer" onClick={() => setIsPopup(true)}>
          <input type="checkbox" className="title-input cursor-pointer" id="new-tweet"/>
          <label htmlFor="new-tweet" className="title-label cursor-pointer">
            <img src={currentMember?.avatar} alt="" />
            <p className="label-word">有什麼新鮮事?</p>
          </label>
          <button className="orange-btn radius-50 cursor-pointer">推文</button>
        </div>
      </div>
      <hr/>
      <UserProfileTwi datas={userTweets} onLike={handleLike}/>
      {isPopup && 
      <div className="popup">
        <div className="popup-bg">
          <Container>
            <Row>
              <Col xs={{span: 7, offset: 2}} className="popup-container">
                <div className="close-group">
                  <a href="#" className="close" onClick={() => setIsPopup(false)}><CloseIcon/></a>
                </div>
                <div className="type-area">
                  <img src={currentMember?.avatar} alt="" />
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
                  <button className="orange-btn radius-50 cursor-pointer" onClick={handleClick}>推文</button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>}
    </section>
  )
}

export { MainHome, UserProfileTwi};



