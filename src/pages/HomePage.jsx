import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(currentMember?.name === "admin" ){
      navigate('/adminTwi');
    }else if (isAuthenticated) {
      navigate('/main');
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);
};

export default HomePage;