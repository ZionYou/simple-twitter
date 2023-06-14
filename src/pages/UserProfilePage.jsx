import { EditProfile, MainList, PopularFollow, Personal, NewTwiPopUp  } from "components";
import {getUser, getUserTwi, getUserTwiReply, getUserTwiLike} from 'api/userInfo'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from 'contexts/AuthContext';

// 個人資料頁面
const UserProfilePage = () => {
  const [isPopup, setIsPopup] = useState(false)
  const [isNewTwiPopup, setIsNewTwiPopup] = useState(false)
  const [userInfo, setUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([])
  const [replyTweets, setReplyTweets] = useState([])
  const [likeTweets, setLikeTweets] = useState([])
  const { currentMember } = useAuth();

   useEffect(() => {
    const getUserAsync = async () => {
      const {success, data, message} = await getUser()

      if(success){
        setUserInfo(data)
        // console.log(data)
      } else {
        console.error(message)
      }
      
      // setUserInfo(users);
    }
    const getUserTwiAsync = async () => {
      const {success, data, message} = await getUserTwi()
      if(success){
        setUserTweets(data.map((data) => ({...data})))
        // console.log(data)
      } else {
        console.error(message)
      }
    }
    const getUserTwiReplyAsync = async () => {
      const {success, data, message} = await getUserTwiReply()
      if(success){
        setReplyTweets(data.map((data) => ({...data})))
        // console.log(data)
      } else {
        console.error(message)
      }
    }
    const getUserTwiLikeAsync = async () => {
      const {success, data, message} = await getUserTwiLike()
      if(success){
        setLikeTweets(data.map((data) => ({...data})))
        // console.log(data)
      } else {
        console.error(message)
      } 
    }
    getUserAsync()
    getUserTwiAsync()
    getUserTwiReplyAsync()
    getUserTwiLikeAsync()
  }, [currentMember])

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList onClick={() => setIsNewTwiPopup(true)}/>
          </Col>
          <Col xs={7}>
            <Personal
              id={currentMember?.id} 
              name={currentMember?.name}
              introduction={currentMember?.introduction}
              account={currentMember?.account}
              cover={currentMember?.cover}
              avatar={currentMember?.avatar}
              tweetDatas={userTweets} 
              likeDatas={likeTweets} 
              replyDatas={replyTweets}
              onClick={() => setIsPopup(true)}/>
          </Col>
          <Col xs={3}>
            <PopularFollow/>
          </Col>
        </Row>
      </Container>
      {isPopup && <EditProfile onClick={() => setIsPopup(false)}/>}
      {isNewTwiPopup && <NewTwiPopUp onClick={() => setIsNewTwiPopup(false)}/>}
    </>
  )
};

export default UserProfilePage;

// const UserProfilePage = () => {
//   const [isPopup, setIsPopup] = useState(false)

//   return (
//     <section className="main">
//       <section className="main-container">
//         <MainList/>
//         <Personal onClick={() => setIsPopup(true)}/>
//         <PopularFollow/>
//       </section>
//       {isPopup && <EditProfile onClick={() => setIsPopup(false)}/>}
//     </section>
//   )
// };