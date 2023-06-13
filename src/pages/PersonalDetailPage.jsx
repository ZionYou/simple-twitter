import { MainList, PopularFollow, PersonalDetail, NewTwiPopUp } from "components";
import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";

//個人追隨動態頁面
const PersonalDetailPage = () => {
  const [isPopup, setIsPopup] = useState(false)
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList onClick={() => setIsPopup(true)}/>
          </Col>
          <Col xs={7}>
            <PersonalDetail/>
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

