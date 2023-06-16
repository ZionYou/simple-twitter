import { MainList , SettingsArea } from "components";
import { Container, Row, Col } from "react-bootstrap";

// 設定頁面
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

export default SettingsPage;

