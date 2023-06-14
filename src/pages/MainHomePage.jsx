// 元件
import { MainHome, NewTwiPopUp, MainList, PopularFollow, ReplyTwiPopUp } from "components";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { getUserTwi } from 'api/userInfo';
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
  // 彈跳視窗狀態
  const [isPopup, setIsPopup] = useState(false)
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();

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
              id={currentUser?.id} 
              avatar={currentUser?.avatar}
              onClick={() => setIsPopup(true)}
            />
          </Col>
          <Col xs={3}>
            <PopularFollow/>
          </Col>
        </Row>
      </Container>
      {isPopup && <NewTwiPopUp avatar={currentUser?.avatar} onClick={() => setIsPopup(false)}/>}
    </>
  )
};

export default MainHomePage;

// const MainHomePage = () => {
//   const [isPopup, setIsPopup] = useState(false)
//   return (
//     <section className="main">
//       <section className="main-container">
//         <MainList/>
//         <MainHome onClick={() => setIsPopup(true)}/>
//         <PopularFollow/>
//       </section>
//       {isPopup && <NewTwiPopUp onClick={() => setIsPopup(false)}/>}
//       {/* <ReplyTwiPopUp/> */}
//     </section>
//   )
// };

