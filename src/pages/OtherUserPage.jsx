import { EditProfile, MainList, PopularFollow, OtherPersonal  } from "components";
import {getUser, getUserTwi, getUserTwiReply, getUserTwiLike} from 'api/userInfo'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useParams} from "react-router";
import { useAuth } from 'contexts/AuthContext';

// 個人資料頁面
const OtherUserPage = () => {
  // const [isPopup, setIsPopup] = useState(false)
  // const [isNewTwiPopup, setIsNewTwiPopup] = useState(false)
  const [userInfo, setUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([])
  const [replyTweets, setReplyTweets] = useState([])
  const [likeTweets, setLikeTweets] = useState([])
  const { currentMember } = useAuth();
  const id  = useParams();

  // const userId = currentMember?.id
   useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(id.id)
      setUserInfo(data)
      // console.log(data)
    }
    const getUserTwiAsync = async () => {
      const {data} = await getUserTwi(id.id)
      // setUserTweets(data.map((data) => ({...data})))
      setUserTweets(data)
      // console.log(data)
    }
    const getUserTwiReplyAsync = async () => {
      const {data} = await getUserTwiReply(id.id)
      // setReplyTweets(data.map((data) => ({...data})))
      setReplyTweets(data)
      // console.log(data)
    }
    const getUserTwiLikeAsync = async () => {
      const {data} = await getUserTwiLike(id.id)
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
            <MainList/>
          </Col>
          <Col xs={7}>
            <OtherPersonal
              id={id.id} 
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
    </>
  )
};

export default OtherUserPage;