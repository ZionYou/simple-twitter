// 元件
import { MainHome, NewTwiPopUp, MainList, PopularFollow, ReplyTwiPopUp } from "components";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { getUserTwi, getUser } from 'api/userInfo';
import { useAuth } from '../contexts/AuthContext';

// 首頁
// const MainHomePage = () => {
//   const [tweets, setTweets] = useState([])
//   const [isPopup, setIsPopup] = useState(false)
//   // const { id } = useParams()
//   // const params = useParams()
//   // console.log(params)
  
// =======
// // Hook
// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Container, Row, Col } from "react-bootstrap";
// // API
// import { getUserTwi, getUser } from 'api/userInfo';
// import { useAuth } from 'contexts/AuthContext';

// 首頁
const MainHomePage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([])
  // 彈跳視窗狀態
  const [isPopup, setIsPopup] = useState(false)
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth();

  const userId = currentMember?.id
  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUser(userId)
      setUserInfo(data)
      // console.log(data)
    }
    const getUserTwiAsync = async () => {
      const data = await getUserTwi(userId)
      // console.log(data.data)
      setUserTweets(data.data)
      // setUserTweets(data.map((data) => ({...data})))
    }
    getUserAsync()
    getUserTwiAsync()
  }, [currentMember])


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList onClick={() => setIsPopup(true)}
            />
          </Col>
          <Col xs={7}>
            <MainHome
              // id={currentUser?.id} 
              // avatar={currentUser?.avatar}
              tweetDatas={userTweets}
              onClick={() => setIsPopup(true)}
            />
          </Col>
          <Col xs={3}>
            <PopularFollow/>
          </Col>
        </Row>
      </Container>
      {isPopup && <NewTwiPopUp onClick={() => setIsPopup(false)}/>}
    </>
  )
};

export default MainHomePage;


