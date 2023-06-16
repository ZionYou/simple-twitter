import { MainList, PopularFollow, PersonalDetail, NewTwiPopUp } from "components";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
import {getUserFollowings, getUserFollowers} from 'api/userInfo'

//個人追隨動態頁面
const PersonalDetailPage = () => {
  const [isPopup, setIsPopup] = useState(false)
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const {currentMember} = useAuth()

  useEffect(() => {
    const getUserFollowingsAsync = async () => {
      const {success, data, message} = await getUserFollowings()
      if(success){
        setFollowings(data.map((data) => ({...data})))
        // console.log(data)
      } else {
        console.error(message)
      }
    }
    const getUserFollowersAsync = async () => {
      const {success, data, message} = await getUserFollowers()
      if(success){
        setFollowers(data.map((data) => ({...data})))
        // console.log(data)
      } else {
        console.error(message)
      }
    }

    getUserFollowingsAsync()
    getUserFollowersAsync()
  }, [currentMember])
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList/>
          </Col>
          <Col xs={7}>
            <PersonalDetail/>
          </Col>
          <Col xs={3}>
            <PopularFollow ollowerDatas={followers} followingDatas={followings}/>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default PersonalDetailPage;

