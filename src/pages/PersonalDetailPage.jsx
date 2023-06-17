import { MainList, PopularFollow, PersonalDetail, NewTwiPopUp } from "components";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from 'contexts/AuthContext';
import { getUserFollowings, getUserFollowers} from 'api/userInfo'

//個人追隨動態頁面
const PersonalDetailPage = () => {
  const [isPopup, setIsPopup] = useState(false)
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const { currentMember } = useAuth();
  const userId = currentMember?.id

  useEffect(() => {
    const getUserFollowingsAsync = async () => {
      const data = await getUserFollowings(userId)
      setFollowings(data.data)
    }
    const getUserFollowersAsync = async () => {
      const data = await getUserFollowers(userId)
      setFollowers(data.data)
    }
    getUserFollowingsAsync()
    getUserFollowersAsync()
  }, [ currentMember ]);

  console.log(followings)
  console.log(followers)

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList onClick={() => setIsPopup(true)}/>
          </Col>
          <Col xs={7}>
            <PersonalDetail 
              followers={followers} 
              followings={followings}
            />
          </Col>
          <Col xs={3}>
            <PopularFollow />
          </Col>
        </Row>
      </Container>
      {isPopup && <NewTwiPopUp onClick={() => setIsPopup(false)}/>}
    </>
  )
};

export default PersonalDetailPage;

// const PersonalDetailPage = () => {

//   return (
//     <section className="main">
//       <section className="main-container">
//         <MainList/>
//         <PersonalDetail/>
//         <PopularFollow/>
//       </section>
//     </section>
//   )
// };

