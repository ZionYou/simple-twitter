import { CameraIcon, CloseIcon } from "assets/icons";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react'
import {useAuth} from 'contexts/AuthContext'
import {FormInput, FormTextarea} from 'components'
import {getUser} from 'api/userInfo'

// 新推文元件
const NewTwiPopUp = ({onClick}) => {
  const [isError, setIsError] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleClick = () => {
    if(inputValue === "" ){
      setIsError(true)
      // setIsError("內容不可空白")
      return
    } else if (inputValue.length > 140) {
      // setIsError("字數不可超過140字")
      return
    } else {
      setIsError(false)
    }
  }
  
const NewTwiPopUp = ({onClick, avatar}) => {
  return(
    <>
      <div className="popup">
        <div className="popup-bg">
          <Container>
            <Row>
              <Col xs={{span: 7, offset: 2}} className="popup-container">
                <div className="close-group">
                  <a href="#" className="close" onClick={onClick}><CloseIcon/></a>
                </div>
                <div className="type-area">
                  <img src="https://picsum.photos/300/300?text=400" alt="" />
                  <textarea 
                    name="new-tweet-type" 
                    className="newtwi-textarea" 
                    id="tweet-textarea" 
                    placeholder="有什麼新鮮事?"
                    value={inputValue}
                    onChange = {(e) => setInputValue(e.target.value)}
                    />
                  <img src={avatar} alt="" />
                  <textarea 
                    id="tweet-textarea" 
                    className="newtwi-textarea" 
                    name="new-tweet-type" 
                    maxLength={140} 
                    placeholder="有什麼新鮮事?"
                  />
                </div>
                <div className="btn-group">
                  {inputValue === "" && isError && <span className="error">內容不可空白</span>}
                  {inputValue.length > 140 && <span className="error">字數不可超過140字</span>}
                  <button className="orange-btn radius-50 cursor-pointer" onClick={handleClick}>推文</button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}
}
const dummyUserInfoData = {
  name: 'John Doe',
  introduction: '123',
  avatar: 'https://picsum.photos/300/300?text=1400',
  coverImg: 'https://picsum.photos/300/300?text=140'
}

// 編輯個人資料元件
const EditProfile = ({onClick}) => {
  // let userName = dummyUserInfoData.name
  // let userIntro = dummyUserInfoData.introduction
  // let userAvatar = dummyUserInfoData.avatar
  // let userCoverImg = dummyUserInfoData.coverImg

  // 抓取當前使用者資料
  // const {currentUser} = useAuth()
  const coverRef = useRef()
  const { currentMember } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  const [name, setName] = useState('')
  const [nameCount, setNameCount] = useState(0)
  const [intro, setIntro] = useState('')
  const [introCount, setIntroCount] = useState(0)
  const [avatar, setAvatar] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const [coverImgUrl, setCoverImgUrl] = useState('')

  const userId = currentMember?.id

  const handleImgChange = (e, type) => {
    const selectedFile = e.target.files[0]
    const objectUrl = URL.createObjectURL(selectedFile);
    if(type === "cover") {
      setCoverImg(selectedFile)
      setCoverImgUrl(objectUrl)
    } else if (type === "avatar"){
      setAvatar(selectedFile)
      setAvatarUrl(objectUrl)
    }
  }

  const handleSave = () => {
    if(name === "" || nameCount > 50) return
    if(intro === '' || introCount > 160) return
  }
  
  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data)
      setName(data.data.name)
      setNameCount(data.data.name.length)
      setIntro(data.data.introduction)
      setIntroCount(data.data.introduction.length)
      setAvatarUrl(data.data.avatar)
      setCoverImgUrl(data.data.cover)
    }
    
    getUserAsync()
    // getUserTwiLikeAsync()
  }, [currentMember])
  
  return(
    <>
      <div className="edit-popup">
        <div className="edit-popup-bg">
          <Container>
            <Row>
              <Col xs={{span: 7, offset: 2}} className="edit-popup-container">
                <div className="close-group">
                  <div>
                    <a href="#" className="close" onClick={onClick}><CloseIcon/></a>
                    <p className="name">編輯個人資料</p>
                  </div>
                  <button type="submit" className="orange-btn radius-50 cursor-pointer" onClick={handleSave}>儲存</button>
                </div>
                <form className="img-group">
                  <div className="bg-img-group">
                    <img src={coverImgUrl} alt="user-bg" className="bg-img user-post-bg" />
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
                          <p className="form-caption count"><span>{name.length}</span>/50</p>
                        </div>
                      ) : (
                        <div className="form-notification">
                          <p className="form-caption count"><span>{name.length}</span>/50</p>
                        </div>
                      )
                    }
                  </FormInput>
                  <FormTextarea
                    label="自我介紹"
                    className = {introCount > 160 ? "action" : ""}
                    value={intro}
                    onChange = {(e) => {
                      setIntro(e)
                      setIntroCount(e.length || 0)
                    }}
                  >
                    {
                      introCount > 160 ? (
                        <div className="form-notification action">
                          <p className="form-caption">名稱不能多於 160 個字</p>
                          <p className="form-caption count"><span>{intro.length}</span>/160</p>
                        </div>
                      ) : (
                        <div className="form-notification">
                          <p className="form-caption count"><span>{intro.length}</span>/160</p>
                        </div>
                      )
                    }
                  </FormTextarea>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

// 回復推文元件
const ReplyTwiPopUp = ({onClick, data}) => {
  const [isError, setIsError] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleClick = () => {
    if(inputValue === "" ){
      setIsError(true)
      // setIsError("內容不可空白")
      return
    } else if (inputValue.length > 140) {
      // setIsError("字數不可超過140字")
      return
    } else {
      setIsError(false)
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
                <div className="tweet-item">
                  {
                    data.map((pop) => {
                      return(
                        <>
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
                        </>
                      )
                    })
                  }
                </div>
                <div className="type-area">
                  <img src="https://picsum.photos/300/300?text=400" alt="" />
                  <textarea 
                    name="new-tweet-type" 
                    className="newtwi-textarea" 
                    id="tweet-textarea" 
                    placeholder="推你的回覆"
                    onchange = {(e) => setInputValue(e.target.value)}
                    />
                </div>
                <div className="btn-group">
                  {inputValue === "" && isError && <span className="error">內容不可空白</span>}
                  {inputValue.length > 140 && <span className="error">字數不可超過140字</span>}
                  <button className="orange-btn radius-50 cursor-pointer" onClick={handleClick}>回覆</button>
                </div>
            </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export { NewTwiPopUp, EditProfile, ReplyTwiPopUp}



