import { CameraIcon, CloseIcon } from "assets/icons";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from 'react'

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

// 編輯個人資料元件
const EditProfile = ({onClick}) => {
  
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
                    <p className="name">John Doe</p>
                  </div>
                  <button type="submit" className="orange-btn radius-50 cursor-pointer">儲存</button>
                </div>
                <form className="img-group">
                  <div className="bg-img-group">
                    <img src="https://picsum.photos/300/300?text=1400" alt="user-bg" className="bg-img user-post-bg" />
                    <div className="bg-input-group">
                      <label htmlFor="bg-img-selection" className="bg-img-selection-label cursor-pointer"><CameraIcon/></label>
                      <input type="file" accept="image/*" id="bg-img-selection" className="bg-img-selection-input edit-img-input"/>
                      <button className="bg-delete-btn cursor-pointer"><CloseIcon/></button>
                    </div>
                  </div>
                  <div className="user-img-group">
                    <div>
                      <img src="https://picsum.photos/300/300?text=2100" alt="user-img" className="user-img user-post-img" />
                      <div className="img-input-group">
                        <label htmlFor="user-img-selection" className="user-img-selection-label cursor-pointer">
                          <div>
                            <CameraIcon/>
                          </div>
                        </label>
                        <input type="file" accept="image/*" id="user-img-selection" className="user-img-selection-input edit-img-input"/>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="type-area">
                  <div className="form-group">
                    <div className="form-bar">
                      <label for="" className="form-label">名稱</label>
                      <input type="text" className="form-input" value="John Doe"/>
                      <div className="form-notification">
                        <p className="form-caption count"><span>0</span>/50</p>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-bar-textarea">
                      <label for="" class="form-label">自我介紹</label>
                      <textarea name="form-textarea" className="form-textarea" id="form-textarea" maxLength={160}>John Doe</textarea>
                      <div className="form-notification">
                        <p className="form-caption count"><span>0</span>/50</p>
                      </div>
                    </div>
                  </div>
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