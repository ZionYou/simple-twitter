import { CommentIcon, LikeIcon, CloseIcon } from "assets/icons";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { creatNewTwi, getUser } from 'api/userInfo';
import { useAuth } from 'contexts/AuthContext';
import { ReplyTwiPopUp, NewTwiPopUp } from 'components';
import { Container, Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2';



const TweetListItem = ({tweet}) => {
  return(
    <div className="tweet-item">
      <img src={`https://picsum.photos/300/300?text=${tweet.id}`} alt="" />
      <div className="tweet-info">
        <div className="name-group">
          <span className="name">{tweet.name}</span>
          <span className="account">@{tweet.account}</span>
          <span className="time"> &#183; {tweet.edit_time}</span>
        </div>
        <p className="content">
          {tweet.content}
        </p>
        <div className="icon-group">
          <div className="comment"><i><CommentIcon/></i>{tweet.commentNum}</div>
          <div className="like"><i><LikeIcon/></i>{tweet.likeNum}</div>
        </div>
      </div>
    </div>
  )
}

const UserProfileTwi = ({datas}) => {
  
  const [popupcontent, setpopupcontent] = useState([])
  const [ popupToggle, setPopupToggle ] = useState(false)
  const changecontent = (data) => {
    setpopupcontent([data])
    setPopupToggle(!popupToggle)
  }

  const userTweets = datas.map((data) => {
    return(
      <div className="tweet-item" key={data.id}>
        <img src={data.User.avatar} alt="" />
        <div className="tweet-info">
          <div className="name-group">
            <span className="name">{data.User.name}</span>
            <span className="account">@{data.User.account}</span>
            <span className="time"> &#183; {data.updatedAt}</span>
          </div>
          <p className="content">
            {data.description}
          </p>
          <div className="icon-group">
            <button className="comment btn-reset cursor-pointer" onClick={() => changecontent(data)}><i><CommentIcon/></i>{data.RepliesCount}</button>
            <button className="like btn-reset cursor-pointer"><i><LikeIcon/></i>{data.LikesCount}</button>
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
      {popupToggle && <ReplyTwiPopUp data={popupcontent} onClick={changecontent}/>}
    </>
  )
}

const MainHome = ({tweetDatas}) => {
  // const [userTweets, setUserTweets] = useState([])
  const [isPopup, setIsPopup] = useState(false)
  const [userInfo, setUserInfo] = useState([]);
  const [isError, setIsError] = useState(false)
  const [tweet, setTweet] = useState('')
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
    <section className="home middle-container-border" data-page="main-home">
      <div className="title-section">
        <h5 className="sub-title">首頁</h5>
        <div className="input-group cursor-pointer" onClick={() => setIsPopup(true)}>
          <input type="checkbox" className="title-input cursor-pointer" id="new-tweet"/>
          <label htmlFor="new-tweet" className="title-label cursor-pointer">
            <img src={userInfo.data?.avatar} alt="" />
            <p className="label-word">有什麼新鮮事?</p>
          </label>
          <button className="orange-btn radius-50 cursor-pointer">推文</button>
        </div>
      </div>
      <hr/>
      <UserProfileTwi datas={tweetDatas}/>
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
                  <img src={userInfo.data?.avatar} alt="" />
                  <textarea 
                    id="tweet-textarea" 
                    className="newtwi-textarea" 
                    name="new-tweet-type" 
                    // maxLength={140} 
                    placeholder="有什麼新鮮事?"
                    
                    // onChange={(tweetInputValue) => setTweet(tweetInputValue)}
                    onChange={(e) => setTweet(e.target.value)}
                  >{tweet}</textarea>
                </div>
                <div className="btn-group">
                  {(tweet === "" || tweet.length > 140) && isError && (<span className="error">{tweet === "" ? "內容不可空白" : "字數不可超過140字"}</span>)}
                  {/* {inputValue.length > 140 && <span className="error">字數不可超過140字</span>} */}
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



export { TweetListItem, MainHome, UserProfileTwi};



// const NewTwiPopUp = ({onClick}) => {
//   const [userInfo, setUserInfo] = useState([]);
//   const [isError, setIsError] = useState(false)
//   const [inputValue, setInputValue] = useState('')
//    const { currentMember } = useAuth();

//   const userId = currentMember?.id

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
//   useEffect(() => {
//     const getUserAsync = async () => {
//       const data = await getUser(userId)
//       setUserInfo(data)
//       // console.log(data)
//     }
//     getUserAsync()
//   }, [currentMember])

//   return(
//     <>
//       <div className="popup">
//         <div className="popup-bg">
//           <Container>
//             <Row>
//               <Col xs={{span: 7, offset: 2}} className="popup-container">
//                 <div className="close-group">
//                   <a href="#" className="close" onClick={onClick}><CloseIcon/></a>
//                 </div>
//                 <div className="type-area">
//                   <img src={userInfo.data?.avatar} alt="" />
//                   <textarea 
//                     id="tweet-textarea" 
//                     className="newtwi-textarea" 
//                     name="new-tweet-type" 
//                     maxLength={140} 
//                     placeholder="有什麼新鮮事?"
//                   />
//                 </div>
//                 <div className="btn-group">
//                   {inputValue === "" && isError && <span className="error">內容不可空白</span>}
//                   {inputValue.length > 140 && <span className="error">字數不可超過140字</span>}
//                   <button className="orange-btn radius-50 cursor-pointer" onClick={handleClick}>推文</button>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//     </>
//   )
// }

// const TweetListData = [
//   {
//     id: 1,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 2,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 3,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 4,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 5,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 6,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
// ]


// const MainHome = ({onClick, id, avatar}) => {
//   return(
//     <section className="home middle-container-border" data-page="main-home">
//       <div className="title-section">
//         <h5 className="sub-title">首頁</h5>
//         <div className="input-group cursor-pointer" onClick={onClick}>
//           <input type="checkbox" className="title-input cursor-pointer" id="new-tweet"/>
//           <label htmlFor="new-tweet" className="title-label cursor-pointer">
//             <img src={avatar}alt="" />
//             <p className="label-word">有什麼新鮮事?</p>
//           </label>
//           <button className="orange-btn radius-50 cursor-pointer">推文</button>
//         </div>
//       </div>
//       <hr/>
//       <UserProfileTwi datas={userTweet}/>
// =======
//       <UserProfileTwi id={id}/>
// >>>>>>> c690e8de94f022d62fad334026f59f1b74d002cb
//     </section>
//   )
// }
