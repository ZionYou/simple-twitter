import { MainList, PopularFollow, PersonalDetail, NewTwiPopUp } from "components";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from 'contexts/AuthContext';
import { getUser, getUserTwi, getUserFollowings, getUserFollowers} from 'api/userInfo';
import { useParams} from "react-router";

//個人追隨動態頁面
const PersonalDetailPage = () => {
  const [isPopup, setIsPopup] = useState(false)
  const [userInfo, setUserInfo] = useState([])
  const [userTweets, setUserTweets] = useState([])
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const { currentMember } = useAuth();
  const id  = useParams();
  console.log(id.id)
  const userId = currentMember?.id

  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(id.id)
      setUserInfo(data.data)
      // setUserFollowers(userInfo?.Followers)
      // setUserFollowings(userInfo?.Followings)
    }
    const getUserTwiAsync = async () => {
      const {data} = await getUserTwi(id.id)
      // setUserTweets(data.map((data) => ({...data})))
      setUserTweets(data)
      // console.log(data)
    }
    const getUserFollowingsAsync = async () => {
      const data = await getUserFollowings(id.id )
      setFollowings(data.data)
      // console.log(data.data)
    }
    const getUserFollowersAsync = async () => {
      const data = await getUserFollowers(id.id)
      setFollowers(data.data)
      console.log(data.data)
    }
    getUserAsync()
    getUserTwiAsync()
    getUserFollowingsAsync()
    getUserFollowersAsync()
  }, [ currentMember ]);

  // console.log(followings)
  // console.log(followers)
  
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList/>
          </Col>
          <Col xs={7}>
            <PersonalDetail
              name={userInfo?.name}
              tweetDatas={userTweets}
              followers={followers} 
              followings={followings}
            />
          </Col>
          <Col xs={3}>
            <PopularFollow />
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default PersonalDetailPage;

