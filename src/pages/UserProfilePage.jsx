import { EditProfile, MainList, PopularFollow, Personal, NewTwiPopUp  } from "components";
import {getUser, getUserTwi, getUserTwiReply, getUserTwiLike} from 'api/userInfo'
import { useState, useEffect, useContext } from 'react';
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

  const userId = currentMember?.id

   useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data)
      // console.log(data)
    }
    const getUserTwiAsync = async () => {
      const {data} = await getUserTwi(userId)
      // setUserTweets(data.map((data) => ({...data})))
      setUserTweets(data)
      // console.log(data)
    }
    const getUserTwiReplyAsync = async () => {
      const {data} = await getUserTwiReply(userId)
      // setReplyTweets(data.map((data) => ({...data})))
      setReplyTweets(data)
      // console.log(data)
    }
    const getUserTwiLikeAsync = async () => {
      const {data} = await getUserTwiLike(userId)
      setLikeTweets(data)
      // setLikeTweets(data.map((data) => ({...data})))
      // console.log(data)
    }
    getUserAsync()
    getUserTwiAsync()
    getUserTwiReplyAsync()
    getUserTwiLikeAsync()
  }, [currentMember])

  // console.log(userTweets)
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList onClick={() => setIsNewTwiPopup(true)}/>
          </Col>
          <Col xs={7}>
            <Personal
              id={userInfo?.id} 
              name={userInfo.data?.name}
              introduction={userInfo.data?.introduction}
              account={userInfo.data?.account}
              cover={userInfo.data?.cover}
              avatar={userInfo.data?.avatar}
              followerNum={userInfo.data?.Followers.length}
              followingNum={userInfo.data?.Followings.length}
              tweetDatas={userTweets} 
              likeDatas={likeTweets} 
              replyDatas={replyTweets}
              // onClick={() => setIsPopup(true)}
            />
          </Col>
          <Col xs={3}>
            <PopularFollow/>
          </Col>
        </Row>
      </Container>

      {/* {isNewTwiPopup && <NewTwiPopUp onClick={() => setIsNewTwiPopup(false)}/>} */}
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