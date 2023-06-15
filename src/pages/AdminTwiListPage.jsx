import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { AdminList, AdminTwiList } from 'components';
import { useAuth } from '../contexts/AuthContext';


// 後臺推文清單頁面
const AdminTwiListPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/adminLogin');
    }
  }, [navigate, isAuthenticated]);
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

export default AdminTwiListPage;