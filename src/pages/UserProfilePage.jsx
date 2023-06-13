import { EditProfile, MainList, PopularFollow, Personal, NewTwiPopUp  } from "components";
import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";

// 個人資料頁面
const UserProfilePage = () => {
  const [isPopup, setIsPopup] = useState(false)
  const [isNewTwiPopup, setIsNewTwiPopup] = useState(false)

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList onClick={() => setIsNewTwiPopup(true)}/>
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
      {isNewTwiPopup && <NewTwiPopUp onClick={() => setIsNewTwiPopup(false)}/>}
    </>
  )
};

export default UserProfilePage;

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