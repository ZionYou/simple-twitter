import { MainHome, NewTwiPopUp, MainList, PopularFollow, ReplyTwiPopUp } from "components";
import {useState} from 'react';

import { Container, Row, Col } from "react-bootstrap";


const MainHomePage = () => {
  const [isPopup, setIsPopup] = useState(false)
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList/>
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

export default MainHomePage;