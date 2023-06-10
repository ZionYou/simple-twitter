import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { AdminList, AdminUserList } from 'components';

// 後台使用者列表頁面
const AdminUserListPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <AdminList/>
          </Col>
          <Col xs={10}>
            <AdminUserList/>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default AdminUserListPage;