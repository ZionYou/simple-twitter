import { EditProfile, MainList, PopularFollow, Personal, NewTwiPopUp  } from "components";
import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from 'contexts/AuthContext';

// 個人資料頁面
const UserProfilePage = () => {
  const [isPopup, setIsPopup] = useState(false)
  const [isNewTwiPopup, setIsNewTwiPopup] = useState(false)
  const { currentUser } = useAuth();

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList onClick={() => setIsNewTwiPopup(true)}/>
          </Col>
          <Col xs={7}>
            <Personal
              id={currentUser?.id} 
              name={currentUser?.name}
              introduction={currentUser?.introduction}
              account={currentUser?.account}
              cover={currentUser?.cover}
              avatar={currentUser?.avatar}
              onClick={() => setIsPopup(true)}/>
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