import { TwiItemArea, MainList, PopularFollow } from "components";
import { Container, Row, Col } from "react-bootstrap";

// const TwiItemPage = () => {
//   return(
//     <section className="main">
//       <section className="main-container">
//         <MainList/>
//         <TwiItemArea/>
//         <PopularFollow/>
//       </section>
//     </section>
//   )
// }

const TwiItemPage = () => {
  return(
    <Container>
        <Row>
          <Col xs={2}>
            <MainList/>
          </Col>
          <Col xs={7}>
            <TwiItemArea/>
          </Col>
          <Col xs={3}>
            <PopularFollow/>
          </Col>
        </Row>
      </Container>
  )
}

export default TwiItemPage