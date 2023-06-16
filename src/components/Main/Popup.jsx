import { CameraIcon, CloseIcon } from "assets/icons";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react'
import {useAuth} from 'contexts/AuthContext'
import {FormInput, FormTextarea} from 'components'
import {getUser, putUserInfo, creatNewTwi, replyTwi} from 'api/userInfo'
import Swal from 'sweetalert2';


// import useUpdateUser from '../../components/hooks/useUpdateUser'

// 新推文元件
// const NewTwiPopUp = ({onClick}) => {
//   const [isError, setIsError] = useState(false)
//   const [inputValue, setInputValue] = useState('')

//   const handleClick = () => {
//     if(inputValue === "" ){
//       setIsError(true)
//       // setIsError("內容不可空白")
//       return
//     } else if (inputValue.length > 140) {
//       // setIsError("字數不可超過140字")
//       return
//     } else {
//       setIsError(false)
//     }
//   }
  
const NewTwiPopUp = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [isError, setIsError] = useState(false)
  const [tweet, setTweet] = useState('')
  const [isPopup, setIsPopup] = useState(false)
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
  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data)
      // console.log(data)
    }
    getUserAsync()
  }, [currentMember])

  return(
    <>
      <button className="orange-btn radius-50 cursor-pointer" onClick={() => setIsPopup(true)}>推文</button>
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
                    maxLength={140} 
                    placeholder="有什麼新鮮事?"
                  />
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
    </>
  )
}


// 編輯個人資料元件
const EditProfileModal = ({props, onClick, onSave}) => {

  // let currentAvatarUrl = props.avatar
  // let currentCoverUrl = props.cover
  // let currentIntro = props.introduction
  // console.log(currentIntro)
  
  const coverRef = useRef()
  const { currentMember } = useAuth();

  // console.log(currentMember)
  
  const [name, setName] = useState(currentMember?.name)
  const [nameCount, setNameCount] = useState(name?.length)
  const [introduction, setIntro] = useState(currentMember?.intro)
  const [introCount, setIntroCount] = useState(introduction?.length)
  const [avatar, setAvatar] = useState(currentMember?.avatar)
  const [avatarUrl, setAvatarUrl] = useState(avatar)
  const [cover, setCover] = useState(currentMember?.cover)
  const [coverUrl, setCoverUrl] = useState(cover)
  const [toggleModal, setToggleModal] = useState(false)

  const userId = currentMember?.id


  const handleSave = async () => {
    try{
      const data = await putUserInfo({
        name, avatarUrl, coverUrl, introduction
      }, userId)
      console.log(data)
      // console.log(data.message)
      // console.log(postInfo.data.avatar)
      if(data.message === "修改成功"){
        handleToggleClose()
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  const handleImgChange = (e, type) => {
    const selectedFile = e.target.files[0]
    const objectUrl = URL.createObjectURL(selectedFile);
    // console.log(selectedFile)
    // console.log(objectUrl)
    if(type === "cover") {
      setCover(selectedFile)
      setCoverUrl(objectUrl)
    } else if (type === "avatar"){
      setAvatar(selectedFile)
      setAvatarUrl(objectUrl)
    }
  }

  const handleToggleClose = () => {
    setToggleModal(false)
  }

  return(
    <>
    <button className="orange-border-btn radius-50 cursor-pointer" onClick={() => setToggleModal(true)}>編輯個人資料</button>
      {toggleModal && <div className="edit-popup">
        <div className="edit-popup-bg">
          <Container>
            <Row>
              <Col xs={{span: 7, offset: 2}} className="edit-popup-container">
                <div className="close-group">
                  <div>
                    <a href="#" className="close" onClick={handleToggleClose}><CloseIcon/></a>
                    <p className="name">編輯個人資料</p>
                  </div>
                  <button type="submit" className="orange-btn radius-50 cursor-pointer" onClick={() => {handleSave()}}>儲存</button>
                </div>
                <form className="img-group">
                  <div className="bg-img-group">
                    <img src={coverUrl} alt="user-bg" className="bg-img user-post-bg" />
                    <div className="bg-input-group">
                      <label htmlFor="bg-img-selection" className="bg-img-selection-label cursor-pointer"><CameraIcon/></label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="bg-img-selection" 
                        className="bg-img-selection-input edit-img-input"
                        ref={coverRef}
                        onChange={(e) => handleImgChange(e, "cover")}
                        />
                      <button className="bg-delete-btn cursor-pointer"><CloseIcon/></button>
                    </div>
                  </div>
                  <div className="user-img-group">
                    <div>
                      <img src={avatarUrl} alt="user-img" className="user-img user-post-img" />
                      <div className="img-input-group">
                        <label htmlFor="user-img-selection" className="user-img-selection-label cursor-pointer">
                          <div>
                            <CameraIcon/>
                          </div>
                        </label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          id="user-img-selection" 
                          className="user-img-selection-input edit-img-input"
                          ref={coverRef}
                          onChange={(e) => handleImgChange(e, "avatar")}
                          />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="type-area">
                  <FormInput
                    label="名稱"
                    value= {name}
                    // maxLength={50}
                    className = {nameCount > 50 ? "action" : ""}
                    onChange = {(e) => {
                      setName(e)
                      setNameCount(e.length || 0)
                    }}
                  >
                    {
                      nameCount > 50 ? (
                        <div className="form-notification action">
                          <p className="form-caption">名稱不能多於 50 個字</p>
                          <p className="form-caption count"><span>{nameCount}</span>/50</p>
                        </div>
                      ) : (
                        <div className="form-notification">
                          <p className="form-caption count"><span>{nameCount}</span>/50</p>
                        </div>
                      )
                    }
                  </FormInput>
                  <FormTextarea
                    label="自我介紹"
                    className = {introCount > 160 ? "action" : ""}
                    value={introduction}
                    onChange = {(e) => {
                      setIntro(e)
                      setIntroCount(e.length || 0)
                    }}
                  >
                    {
                      introCount > 160 ? (
                        <div className="form-notification action">
                          <p className="form-caption">名稱不能多於 160 個字</p>
                          <p className="form-caption count"><span>{introCount}</span>/160</p>
                        </div>
                      ) : (
                        <div className="form-notification">
                          <p className="form-caption count"><span>{introCount}</span>/160</p>
                        </div>
                      )
                    }
                  </FormTextarea>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>}
    </>
  )
}

// 回復推文元件
const ReplyTwiPopUp = ({onClick, data, handleClose}) => {
  const [isError, setIsError] = useState(false)
  const [replyTweet, setReplyTweet] = useState('')

  const {currentMember} = useAuth()

  const handleClick = async(id) => {
    // console.log(id)
    try{
      const data = await replyTwi(id, replyTweet)
      // console.log(replyTweet)
      console.log(data)
      if(data.message === "Reply posted successfully!"){
        handleClose()
      }
    } catch (error){
      console.error(error)
    }

  

    
  }
  return(
    <>
      <div className="reply-popup">
        <div className="reply-popup-bg">
          <Container>
            <Row>
              <Col xs={{span: 7, offset: 2}} className="reply-popup-container">
                <div className="close-group">
                  <a href="#" className="close" onClick={onClick}><CloseIcon/></a>
                </div>
                
                  {
                    data.map((pop) => {
                      return(
                        <>
                        <div className="tweet-item" key={data.id}>
                          <img src={pop.User.avatar} alt="" />
                          <span className="link-line"></span>
                          <div className="tweet-info">
                            <div className="name-group">
                              <span className="name">{pop.User.name}</span>
                              <span className="account">@{pop.User.account}</span>
                              <span className="time"> &#183; {pop.updatedAt} 小時</span>
                            </div>
                            <p className="content">
                              {pop.description}
                            </p>
                            <p className="reply-to">回覆 <span>@apple</span></p>
                          </div>
                        </div>
                        <div className="type-area">
                          <img src={currentMember?.avatar} alt="" />
                          <textarea 
                            name="new-tweet-type" 
                            className="newtwi-textarea" 
                            id="tweet-textarea" 
                            placeholder="推你的回覆"
                            onChange = {(e) => setReplyTweet(e.target.value)}
                            >{replyTweet}</textarea>
                        </div>
                        <div className="btn-group">
                          {replyTweet === "" && isError && <span className="error">內容不可空白</span>}
                          {replyTweet.length > 140 && <span className="error">字數不可超過140字</span>}
                          <button className="orange-btn radius-50 cursor-pointer" onClick={() => handleClick(pop.id)}>回覆</button>
                        </div>
                        </>
                      )
                    })
                  }
            </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}


const ReplyLikeTwiPopUp = ({onClick, data, handleClose}) => {
  const [isError, setIsError] = useState(false)
  const [replyTweet, setReplyTweet] = useState('')

  const {currentMember} = useAuth()

  const handleClick = async(id) => {
    // console.log(id)
    try{
      const data = await replyTwi(id, replyTweet)
      // console.log(replyTweet)
      console.log(data)
      if(data.message === "Reply posted successfully!"){
        handleClose()
      }
    } catch (error){
      console.error(error)
    }

  

    
  }
  return(
    <>
      <div className="reply-popup">
        <div className="reply-popup-bg">
          <Container>
            <Row>
              <Col xs={{span: 7, offset: 2}} className="reply-popup-container">
                <div className="close-group">
                  <a href="#" className="close" onClick={onClick}><CloseIcon/></a>
                </div>
                
                  {
                    data.map((pop) => {
                      return(
                        <>
                        <div className="tweet-item" key={data.id}>
                          <img src={pop.Tweet.avatar} alt="" />
                          <span className="link-line"></span>
                          <div className="tweet-info">
                            <div className="name-group">
                              <span className="name">{pop.Tweet.name}</span>
                              <span className="account">@{pop.Tweet.account}</span>
                              <span className="time"> &#183; {pop.updatedAt} 小時</span>
                            </div>
                            <p className="content">
                              {pop.description}
                            </p>
                            <p className="reply-to">回覆 <span>@apple</span></p>
                          </div>
                        </div>
                        <div className="type-area">
                          <img src={currentMember?.avatar} alt="" />
                          <textarea 
                            name="new-tweet-type" 
                            className="newtwi-textarea" 
                            id="tweet-textarea" 
                            placeholder="推你的回覆"
                            onChange = {(e) => setReplyTweet(e.target.value)}
                            >{replyTweet}</textarea>
                        </div>
                        <div className="btn-group">
                          {replyTweet === "" && isError && <span className="error">內容不可空白</span>}
                          {replyTweet.length > 140 && <span className="error">字數不可超過140字</span>}
                          <button className="orange-btn radius-50 cursor-pointer" onClick={() => handleClick(pop.id)}>回覆</button>
                        </div>
                        </>
                      )
                    })
                  }
            </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export { NewTwiPopUp, EditProfileModal, ReplyTwiPopUp, ReplyLikeTwiPopUp}



