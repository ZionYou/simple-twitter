import { MainList, PopularFollow, PersonalDetail} from "components";
import { Container, Row, Col } from "react-bootstrap";

const PersonalDetailPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <MainList/>
          </Col>
          <Col xs={7}>
            <PersonalDetail/>
          </Col>
          <Col xs={3}>
            <PopularFollow/>
          </Col>
        </Row>
      </Container>
    </>
  )
};





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

export default PersonalDetailPage;