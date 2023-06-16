import { MainList , SettingsArea, NewTwiPopUp } from "components";
import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";

// 設定頁面
const SettingsPage = () => {
  const [isPopup, setIsPopup] = useState(false)
  return(
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList/>
          </Col>
          <Col xs={7}>
            <SettingsArea/>
          </Col>
          <Col xs={3}>
          </Col>
        </Row>
      </Container>
      {/* {isPopup && <NewTwiPopUp onClick={() => setIsPopup(false)}/>} */}
    </>
  )
};

export default SettingsPage;

// const SettingsPage = () => {
//   const [isPopup, setIsPopup] = useState(false)

  
//   return (
//     <section className="main">
//       <section className="main-container">
//         <MainList/>
//         <SettingsArea/>
//       </section>
//     </section>
//   )
// };