import {useState} from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { AdminList, AdminTwiList } from 'components';

const AdminTwiListPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <AdminList/>
          </Col>
          <Col xs={10}>
            <AdminTwiList/>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default AdminTwiListPage