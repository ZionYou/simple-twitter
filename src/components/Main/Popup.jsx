import { CameraIcon, CloseIcon } from "assets/icons";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react'

import {FormInput, FormTextarea} from 'components'

// 新推文元件
const NewTwiPopUp = ({onClick}) => {
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
                  <textarea name="new-tweet-type" className="newtwi-textarea" id="tweet-textarea" maxLength={140} placeholder="有什麼新鮮事?"/>
                </div>
                <div className="btn-group">
                  <button className="orange-btn radius-50 cursor-pointer">推文</button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

const dummyUserInfoData = {
  name: 'John Doe',
  introduction: '123',
  avatar: 'https://picsum.photos/300/300?text=1400',
  coverImg: 'https://picsum.photos/300/300?text=140'
}

// 編輯個人資料元件
const EditProfile = ({onClick}) => {
  let userName = dummyUserInfoData.name
  let userIntro = dummyUserInfoData.introduction
  let userAvatar = dummyUserInfoData.avatar
  let userCoverImg = dummyUserInfoData.coverImg

  // 抓取當前使用者資料
  // const {currentUser} = useAuth()
  const coverRef = useRef()

  const [name, setName] = useState(userName)
  const [nameCount, setNameCount] = useState(userName.length)
  const [intro, setIntro] = useState(userIntro)
  const [introCount, setIntroCount] = useState(userIntro.length)
  const [avatar, setAvatar] = useState(userAvatar)
  const [avatarUrl, setAvatarUrl] = useState(avatar)
  const [coverImg, setCoverImg] = useState(userCoverImg)
  const [coverImgUrl, setCoverImgUrl] = useState(coverImg)

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

  //匯入User資料
  // useEffect(() => {
  //   if (!currentUser) return;
  //   setId(currentUser?.user.id);
  //   setName(currentUser?.user.name);
  //   setIntro(currentUser?.user.introduction);
  //   setNameCount(!currentUser.user.name ? 0 :  currentUser.user.name.length);
  //   setIntroCount(!currentUser.user.introduction ? 0 : currentUser.user.introduction.length);
  // }, [currentUser, show]);

  
  
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
                  <button type="submit" className="orange-btn radius-50 cursor-pointer">儲存</button>
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
                    // maxLength={160}
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
const ReplyTwiPopUp = ({onClick}) => {
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
                  <img src="https://picsum.photos/300/300?text=1200" alt="" />
                  <span className="link-line"></span>
                  <div className="tweet-info">
                    <div className="name-group">
                      <span className="name">John Doe</span>
                      <span className="account">@heyjohn</span>
                      <span className="time"> &#183; 3 小時</span>
                    </div>
                    <p className="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique purus quam, ac dapibus orci aliquet ac. Aenean non augue sit amet elit feugiat aliquet non eget felis. Etiam erat diam, rutrum id nulla sed, bibendum tincidunt nulla.
                    </p>
                    <p className="reply-to">回覆 <span>@apple</span></p>
                  </div>
                </div>
                <div className="type-area">
                  <img src="https://picsum.photos/300/300?text=400" alt="" />
                  <textarea name="new-tweet-type" className="newtwi-textarea" id="tweet-textarea" maxLength={140} placeholder="有什麼新鮮事?"/>
                </div>
                <div className="btn-group">
                  <button className="orange-btn radius-50 cursor-pointer">推文</button>
                </div>
            </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export { NewTwiPopUp, EditProfile, ReplyTwiPopUp};


// const NewTwiPopUp = ({onClick}) => {
//   return(
//     <>
//       <div className="popup">
//         <div className="popup-bg">
//           <div className="popup-container">
//              <div className="close-group">
//                 <a href="#" className="close" onClick={onClick}><CloseIcon/></a>
//               </div>
//             <div className="type-area">
//               <img src="https://picsum.photos/300/300?text=400" alt="" />
//               <textarea name="new-tweet-type" className="newtwi-textarea" id="tweet-textarea" maxLength={140} placeholder="有什麼新鮮事?"/>
//             </div>
//             <div className="btn-group">
//               <button className="orange-btn radius-50 cursor-pointer">推文</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }



  // return(
  //     <div className="edit-popup">
  //       <div className="edit-popup-bg">
  //         <Container>
  //           <Row>
  //             <Col xs={{span: 7, offset: 2}} className="edit-popup-container">
  //               <div className="close-group">
  //                 <div>
  //                   <a href="#" className="close" onClick={onClick}><CloseIcon/></a>
  //                   <p className="name">編輯個人資料</p>
  //                 </div>
  //                 <button type="submit" className="orange-btn radius-50 cursor-pointer">儲存</button>
  //               </div>
  //               <form className="img-group">
  //                 <div className="bg-img-group">
  //                   <img src="https://picsum.photos/300/300?text=1400" alt="user-bg" className="bg-img user-post-bg" />
  //                   <div className="bg-input-group">
  //                     <label htmlFor="bg-img-selection" className="bg-img-selection-label cursor-pointer"><CameraIcon/></label>
  //                     <input type="file" accept="image/*" id="bg-img-selection" className="bg-img-selection-input edit-img-input"/>
  //                     <button className="bg-delete-btn cursor-pointer"><CloseIcon/></button>
  //                   </div>
  //                 </div>
  //                 <div className="user-img-group">
  //                   <div>
  //                     <img src="https://picsum.photos/300/300?text=2100" alt="user-img" className="user-img user-post-img" />
  //                     <div className="img-input-group">
  //                       <label htmlFor="user-img-selection" className="user-img-selection-label cursor-pointer">
  //                         <div>
  //                           <CameraIcon/>
  //                         </div>
  //                       </label>
  //                       <input type="file" accept="image/*" id="user-img-selection" className="user-img-selection-input edit-img-input"/>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </form>
  //               <div className="type-area">
  //                   {
  //                     nameCount > 50 ?
  //                     <FormInput
  //                       label="名稱"
  //                       value={name || ""}
  //                       onChange={(e) => {
  //                         setName(e)
  //                         setNameCount(e.length || 0)
  //                       }}
  //                     >
  //                       <p className="form-caption">名稱不能多於 50 個字</p>
  //                       <p className="form-caption count"><span>{name.length}</span>/50</p>
  //                     <FormInput/> : 
  //                     <FormInput
  //                       label="名稱"
  //                       value={name || ""}
  //                       onChange={(e) => {
  //                         setName(e)
  //                         setNameCount(e.length || 0)
  //                       }}
  //                     >
  //                       <p className="form-caption count"><span>{name.length}</span>/160</p>
  //                     <FormInput/>
  //                   }
  //                   {
  //                     introCount > 160 ?
  //                     <FormTextarea
  //                       label="自我介紹"
  //                       value={intro || ""}
  //                       onChange={(e) => {
  //                         setIntro(e)
  //                         setIntroCount(e.length || 0)
  //                       }}>
  //                         <p className="form-caption">名稱不能多於 160 個字</p>
  //                         <p className="form-caption count"><span>{intro.length}</span>/160</p>
  //                       </FormTextarea> :
  //                       <FormTextarea
  //                       label="自我介紹"
  //                       value={intro || ""}
  //                       onChange={(e) => {
  //                         setIntro(e)
  //                         setIntroCount(e.length || 0)
  //                       }}>
  //                         <p className="form-caption count"><span>{intro.length}</span>/160</p> 
  //                   }
  //               </div>
  //             </Col>
  //           </Row>
  //         </Container>
  //       </div>
  //     </div>
  // )