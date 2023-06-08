import { EditProfile, MainList, PopularFollow, Personal  } from "components";
import {useState} from 'react';

import { Container, Row, Col } from "react-bootstrap";

const UserProfilePage = () => {
  const [isPopup, setIsPopup] = useState(false)

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList/>
          </Col>
          <Col xs={7}>
            <Personal onClick={() => setIsPopup(true)}/>
          </Col>
          <Col xs={3}>
            <PopularFollow/>
          </Col>
        </Row>
      </Container>
      {isPopup && <EditProfile onClick={() => setIsPopup(false)}/>}
    </>
  )
};


// const UserProfilePage = () => {
//   const [isPopup, setIsPopup] = useState(false)

//   return (
//     <section className="main">
//       <section className="main-container">
//         <MainList/>
//         <Personal onClick={() => setIsPopup(true)}/>
//         <PopularFollow/>
//       </section>
//       {isPopup && <EditProfile onClick={() => setIsPopup(false)}/>}
//     </section>
//   )
// };

export default UserProfilePage;