import { EditProfile, MainList, PopularFollow, Personal, NewTwiPopUp  } from "components";
import {getUser, getUserTwi, getUserTwiReply, getUserTwiLike} from 'api/userInfo'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

// 個人資料頁面
const OtherProfilePage = () => {
  const [isPopup, setIsPopup] = useState(false)
  const [isNewTwiPopup, setIsNewTwiPopup] = useState(false)
  const [userInfo, setUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([])
  const [replyTweets, setReplyTweets] = useState([])
  const [likeTweets, setLikeTweets] = useState([])
  const { currentMember } = useAuth();
  const navigate = useNavigate();
  const tweetCount = userTweets.length
  const userId = localStorage.getItem('User');

   useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data)
      // console.log(data)
    }
    const getUserTwiAsync = async () => {
      const {data} = await getUserTwi(userId)
      setUserTweets(data)
    }
    const getUserTwiReplyAsync = async () => {
      const {data} = await getUserTwiReply(userId)
      setReplyTweets(data)
    }

    getUserAsync()
    getUserTwiAsync()
    getUserTwiReplyAsync()
    // getUserTwiLikeAsync()
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
              count={tweetCount}
              introduction={userInfo.data?.introduction}
              account={userInfo.data?.account}
              cover={userInfo.data?.cover}
              avatar={userInfo.data?.avatar}
              followerNum={userInfo.data?.Followers.length}
              followingNum={userInfo.data?.Followings.length}
              tweetDatas={userTweets} 
              likeDatas={likeTweets} 
              replyDatas={replyTweets}
              onClick={() => setIsPopup(true)}
            />
          </Col>
          <Col xs={3}>
            <PopularFollow/>
          </Col>
        </Row>
      </Container>
      {/* {isPopup && <EditProfile onClick={() => setIsPopup(false)}/>} */}
      {isNewTwiPopup && <NewTwiPopUp onClick={() => setIsNewTwiPopup(false)}/>}
    </>
  )
};

export default OtherProfilePage;