// 元件
import { MainHome, NewTwiPopUp, MainList, PopularFollow, ReplyTwiPopUp } from "components";
import { useState, useEffect, useRef, createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { getUserTwi, getUser, likeTweet, unlikeTweet } from 'api/userInfo';
import { useAuth } from '../contexts/AuthContext';


// 首頁

export const LikeContext = createContext()

const MainHomePage = () => {
  // const [userInfo, setUserInfo] = useState([]);
  // const [userTweets, setUserTweets] = useState([])
  // const [isLike, setIsLike] = useState(false)
  // 彈跳視窗狀態
  const [isPopup, setIsPopup] = useState(false)
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth();
  // const userId = currentMember?.id
  

  
  // useEffect(() => {
  //   const getUserAsync = async () => {
  //     const data = await getUser(userId)
  //     setUserInfo(userInfo)
  //   }
  //   getUserAsync()
  // }, [currentMember])

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
            <MainList />
          </Col>
          <Col xs={7}>
            <MainHome
              onClick={() => setIsPopup(true)}
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

export default MainHomePage;


