import { MainList , SettingsArea} from "components";
import {useState} from 'react';
import { Container, Row, Col } from "react-bootstrap";

const SettingsPage = () => {
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
    </>
  )
};


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

export default SettingsPage;