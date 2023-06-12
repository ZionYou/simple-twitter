import { MainHome, NewTwiPopUp, MainList, PopularFollow, ReplyTwiPopUp } from "components";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';

// 首頁
const MainHomePage = () => {
  const [isPopup, setIsPopup] = useState(false)
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
            <MainList onClick={() => setIsPopup(true)}/>
          </Col>
          <Col xs={7}>
            <MainHome onClick={() => setIsPopup(true)}/>
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

